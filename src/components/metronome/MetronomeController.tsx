"use client";
import { type FC, useEffect, useRef, useState, useCallback } from "react";
import { useMetronome } from "@/hooks/useMetronome";
import { METRONOME_SOUNDS } from "@/resources/metronome";
import { useMetronomeStore } from "@/hooks/useMetronomeStore";
import { twJoin } from "tailwind-merge";
import { PlayCircle, StopCircle } from "lucide-react";

const MetronomeController: FC = () => {
  const [isAccent, setIsAccent] = useState<boolean>(false);
  const timeout = useRef<number>(0);

  const isPlaying = useMetronomeStore((s) => s.isPlaying);
  const setIsPlaying = useMetronomeStore((s) => s.setIsPlaying);
  const audioOn = useMetronomeStore((s) => s.audioOn);
  const sound = useMetronomeStore((s) => s.sound);

  const audioContext = useRef<AudioContext | null>(null);
  const bufferAccent = useRef<AudioBuffer>(null);
  const bufferRegular = useRef<AudioBuffer>(null);

  // Load audio buffers
  useEffect(() => {
    const ctx = audioContext.current ?? new AudioContext();
    audioContext.current = ctx;

    (async () => {
      try {
        const { file, fileAccent } = METRONOME_SOUNDS[sound];

        const [accentBuffer, regularBuffer] = await Promise.all([
          fetch(fileAccent ?? file)
            .then((res) => res.arrayBuffer())
            .then((buffer) => ctx.decodeAudioData(buffer)),
          fetch(file)
            .then((res) => res.arrayBuffer())
            .then((buffer) => ctx.decodeAudioData(buffer)),
        ]);

        bufferAccent.current = accentBuffer;
        bufferRegular.current = regularBuffer;
      } catch (error) {
        console.error("Error loading metronome sound:", error);
      }
    })();
  }, [sound]);

  // Memoize the callback to prevent constant useEffect re-runs
  const handleBeat = useCallback(
    (beatIndex: number, when: number) => {
      // Handle visual
      if (beatIndex === 0) {
        clearTimeout(timeout.current);
        setIsAccent(true);
        timeout.current = window.setTimeout(() => {
          setIsAccent(false);
        }, 90);
      }

      // Handle audio
      if (audioOn && bufferAccent.current && bufferRegular.current) {
        const src = audioContext.current!.createBufferSource();
        src.buffer =
          beatIndex === 0 ? bufferAccent.current! : bufferRegular.current!;
        src.connect(audioContext.current!.destination);
        src.start(when);
      }
    },
    [audioOn]
  ); // Only depend on audioOn, not the audio buffers

  // Single useMetronome call with memoized callback
  useMetronome(handleBeat);

  useEffect(() => () => clearTimeout(timeout.current), []);

  return (
    <section className="flex items-center gap-1 mt-1">
      <div
        className={twJoin(
          "size-6 rounded-full transition-colors duration-75",
          isAccent ? "bg-(--tonic-colour)" : "bg-(--note-colour)"
        )}
      />
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="cursor-pointer hover:text-white/70 p-1"
        aria-label={isPlaying ? "Stop metronome" : "Start metronome"}
      >
        {isPlaying ? (
          <StopCircle className="size-5 xl:size-7" strokeWidth={1.25} />
        ) : (
          <PlayCircle className="size-5 xl:size-7" strokeWidth={1.25} />
        )}
      </button>
    </section>
  );
};

export default MetronomeController;
