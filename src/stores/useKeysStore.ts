import { SoundWave, FilterType } from "@/resources/soundwave";
import { create } from "zustand";

type KeysStore = {
  volume: number;
  pressedKeys: Set<string>;
  pressedPads: Set<string>;
  setVolume: (value: number) => void;
  pressKey: (code: string) => void;
  releaseKey: (code: string) => void;
  pressPad: (code: string) => void;
  releasePad: (code: string) => void;

  // Oscillator
  soundwave: SoundWave;
  setSoundwave: (wave: SoundWave) => void;

  // Filter
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
  filterCutoff: number; // 20-10000 Hz
  setFilterCutoff: (value: number) => void;
  filterResonance: number; // 0-10 (Q value)
  setFilterResonance: (value: number) => void;

  // ADSR Envelope
  attack: number; // 0.001-2 seconds
  setAttack: (value: number) => void;
  decay: number; // 0.001-2 seconds
  setDecay: (value: number) => void;
  sustain: number; // 0-1 (percentage)
  setSustain: (value: number) => void;
  release: number; // 0.01-5 seconds
  setRelease: (value: number) => void;

  // LFO (Vibrato)
  lfoRate: number; // 0-20 Hz
  setLfoRate: (value: number) => void;
  lfoDepth: number; // 0-50
  setLfoDepth: (value: number) => void;

  // Detune (Chorus)
  detune: number; // 0-20 cents
  setDetune: (value: number) => void;

  // Octave Shift
  octaveShift: number; // -2 to +2
  setOctaveShift: (value: number) => void;
  shiftOctaveUp: () => void;
  shiftOctaveDown: () => void;

  // Reset
  resetSynth: () => void;
};

const useKeysStore = create<KeysStore>((set) => ({
  volume: 0.5,
  pressedKeys: new Set<string>(),
  pressedPads: new Set<string>(),
  setVolume: (value) => set({ volume: value }),

  pressKey: (code) =>
    set((s) => ({
      pressedKeys: new Set(s.pressedKeys).add(code),
    })),

  releaseKey: (code) =>
    set((s) => {
      const next = new Set(s.pressedKeys);
      next.delete(code);
      return { pressedKeys: next };
    }),

  pressPad: (code) =>
    set((s) => ({
      pressedPads: new Set(s.pressedPads).add(code),
    })),

  releasePad: (code) =>
    set((s) => {
      const next = new Set(s.pressedPads);
      next.delete(code);
      return { pressedPads: next };
    }),

  // Oscillator defaults
  soundwave: SoundWave.Sawtooth,
  setSoundwave: (wave) => set({ soundwave: wave }),

  // Filter defaults
  filterType: FilterType.Lowpass,
  setFilterType: (type) => set({ filterType: type }),
  filterCutoff: 1200, // Hz
  setFilterCutoff: (value) => set({ filterCutoff: value }),
  filterResonance: 0.9, // Q
  setFilterResonance: (value) => set({ filterResonance: value }),

  // ADSR defaults (piano-like)
  attack: 0.01,
  setAttack: (value) => set({ attack: value }),
  decay: 0.2,
  setDecay: (value) => set({ decay: value }),
  sustain: 0.35,
  setSustain: (value) => set({ sustain: value }),
  release: 0.28,
  setRelease: (value) => set({ release: value }),

  // LFO defaults
  lfoRate: 5, // Hz
  setLfoRate: (value) => set({ lfoRate: value }),
  lfoDepth: 2,
  setLfoDepth: (value) => set({ lfoDepth: value }),

  // Detune default
  detune: 6, // cents
  setDetune: (value) => set({ detune: value }),

  // Octave Shift defaults
  octaveShift: 0,
  setOctaveShift: (value) => set({ octaveShift: Math.max(-2, Math.min(2, value)) }),
  shiftOctaveUp: () => set((s) => ({ octaveShift: Math.min(2, s.octaveShift + 1) })),
  shiftOctaveDown: () => set((s) => ({ octaveShift: Math.max(-2, s.octaveShift - 1) })),

  // Reset all synth parameters to defaults
  resetSynth: () =>
    set({
      soundwave: SoundWave.Sawtooth,
      filterType: FilterType.Lowpass,
      filterCutoff: 1200,
      filterResonance: 0.9,
      attack: 0.01,
      decay: 0.2,
      sustain: 0.35,
      release: 0.28,
      lfoRate: 5,
      lfoDepth: 2,
      detune: 6,
      octaveShift: 0,
    }),
}));

export default useKeysStore;
