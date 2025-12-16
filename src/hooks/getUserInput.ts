import { useCallback, useEffect, useRef } from "react";
import {
  frequencyFromOctaveIndex,
  splitSemitone,
} from "@/resources/note-pitches";
import { KEYBOARD_KEYS, PADS } from "@/resources/keyboard-controls";
import {
  createPianoVoice,
  stopPianoVoice,
  createPadVoice,
  stopPadVoice,
  type PianoVoice,
  type PadVoice,
} from "@/hooks/useAudioSynthesis";
import useKeysStore from "@/stores/useKeysStore";

const BASE_C3_SEMITONE = 3 * 12 + 0;

export const useKeyboardInput = () => {
  const volume = useKeysStore((s) => s.volume);
  const soundwave = useKeysStore((s) => s.soundwave);
  const filterType = useKeysStore((s) => s.filterType);
  const filterCutoff = useKeysStore((s) => s.filterCutoff);
  const filterResonance = useKeysStore((s) => s.filterResonance);
  const attack = useKeysStore((s) => s.attack);
  const decay = useKeysStore((s) => s.decay);
  const sustain = useKeysStore((s) => s.sustain);
  const release = useKeysStore((s) => s.release);
  const lfoRate = useKeysStore((s) => s.lfoRate);
  const lfoDepth = useKeysStore((s) => s.lfoDepth);
  const detune = useKeysStore((s) => s.detune);
  const octaveShift = useKeysStore((s) => s.octaveShift);
  const shiftOctaveUp = useKeysStore((s) => s.shiftOctaveUp);
  const shiftOctaveDown = useKeysStore((s) => s.shiftOctaveDown);
  const resetSynth = useKeysStore((s) => s.resetSynth);
  const pressKey = useKeysStore((s) => s.pressKey);
  const releaseKey = useKeysStore((s) => s.releaseKey);
  const pressPad = useKeysStore((s) => s.pressPad);
  const releasePad = useKeysStore((s) => s.releasePad);

  const audioContext = useRef<AudioContext | null>(null);
  const masterGain = useRef<GainNode | null>(null);
  const activePianoVoices = useRef<Map<string, PianoVoice>>(new Map());
  const activePadVoices = useRef<Map<string, PadVoice>>(new Map());

  const initialiseAudio = useCallback(() => {
    if (audioContext.current) return audioContext.current;

    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AudioContextClass();
    const gain = ctx.createGain();
    gain.gain.value = volume;
    gain.connect(ctx.destination);

    audioContext.current = ctx;
    masterGain.current = gain;
    return ctx;
  }, [volume]);

  useEffect(() => {
    if (masterGain.current) {
      masterGain.current.gain.value = volume;
    }
  }, [volume]);

  const onPianoPointerDown = useCallback(
    (code: string) => {
      const key = KEYBOARD_KEYS.find((key) => key.code === code);
      if (!key || activePianoVoices.current.has(code)) return;

      const ctx = initialiseAudio();
      const gain = masterGain.current;
      if (!ctx || !gain) return;

      const shiftedOctave = key.octave + octaveShift;
      const frequencyHz = frequencyFromOctaveIndex(
        shiftedOctave,
        key.pitchIndex
      );
      const voice = createPianoVoice({
        audioContext: ctx,
        masterGain: gain,
        frequencyHz,
        waveType: soundwave as OscillatorType,
        filterType: filterType as BiquadFilterType,
        filterCutoff,
        filterResonance,
        attack,
        decay,
        sustain,
        lfoRate,
        lfoDepth,
        detune,
      });

      activePianoVoices.current.set(code, voice);
      pressKey(code);
    },
    [
      initialiseAudio,
      pressKey,
      soundwave,
      filterType,
      filterCutoff,
      filterResonance,
      attack,
      decay,
      sustain,
      lfoRate,
      lfoDepth,
      detune,
      octaveShift,
    ]
  );

  const onPianoPointerUp = useCallback(
    (code: string) => {
      const voice = activePianoVoices.current.get(code);
      if (!voice || !audioContext.current) return;

      stopPianoVoice(voice, audioContext.current, release);
      activePianoVoices.current.delete(code);
      releaseKey(code);
    },
    [releaseKey, release]
  );

  const onPadKeyDown = useCallback(
    (code: string) => {
      const pad = PADS.find((pad) => pad.code === code);
      if (!pad || activePadVoices.current.has(code)) return;

      const ctx = initialiseAudio();
      const gain = masterGain.current;
      if (!ctx || !gain) return;

      const absoluteSemitone = BASE_C3_SEMITONE + pad.semitone;
      const [octave, pitchIndex] = splitSemitone(absoluteSemitone);
      const frequencyHz = frequencyFromOctaveIndex(octave, pitchIndex);
      const voice = createPadVoice({
        audioContext: ctx,
        masterGain: gain,
        frequencyHz,
        waveType: soundwave,
      });

      activePadVoices.current.set(code, voice);
      pressPad(code);
    },
    [initialiseAudio, pressPad, soundwave]
  );

  const onPadPointerUp = useCallback(
    (code: string) => {
      const voice = activePadVoices.current.get(code);
      if (!voice || !audioContext.current) return;

      stopPadVoice(voice, audioContext.current);
      activePadVoices.current.delete(code);
      releasePad(code);
    },
    [releasePad]
  );

  // Mouse/touch
  const onPadPointerDown = useCallback(
    (code: string) => {
      const ctx = initialiseAudio();
      ctx.resume().catch(() => {});
      onPadKeyDown(code);
    },
    [initialiseAudio, onPadKeyDown]
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.repeat) return;

      // Arrow keys used for shifting octave range
      if (event.code === "ArrowRight") {
        shiftOctaveUp();
        return;
      }
      if (event.code === "ArrowLeft") {
        shiftOctaveDown();
        return;
      }
      // Delete key resets all
      if (event.code === "Delete") {
        resetSynth();
        return;
      }

      const ctx = initialiseAudio();
      ctx.resume().catch(() => {});

      const isPad = PADS.some((pad) => pad.code === event.code);
      if (isPad) {
        onPadKeyDown(event.code);
      } else {
        onPianoPointerDown(event.code);
      }
    },
    [
      initialiseAudio,
      onPadKeyDown,
      onPianoPointerDown,
      shiftOctaveUp,
      shiftOctaveDown,
      resetSynth,
    ]
  );

  const onKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const isPad = PADS.some((pad) => pad.code === event.code);
      if (isPad) {
        onPadPointerUp(event.code);
      } else {
        onPianoPointerUp(event.code);
      }
    },
    [onPadPointerUp, onPianoPointerUp]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [onKeyDown, onKeyUp]);

  return {
    onPianoPointerDown,
    onPianoPointerUp,
    onPadPointerDown,
    onPadPointerUp,
  };
};
