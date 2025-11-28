"use client";
import { type FC, useEffect, useRef, useState, useCallback } from "react";
import { useMetronome, getAudioContext } from "@/hooks/useMetronome";
import { METRONOME_SOUNDS } from "@/resources/metronome";
import { useMetronomeStore } from "@/hooks/useMetronomeStore";
import { twJoin } from "tailwind-merge";
import { PlayCircle, StopCircle } from "lucide-react";
import { EventName, trackEvent } from "@/resources/analytics";

const MetronomeController: FC = () => {
  const [isAccent, setIsAccent] = useState<boolean>(false);
  const timeout = useRef<number>(0);

  const isPlaying = useMetronomeStore((s) => s.isPlaying);
  const setIsPlaying = useMetronomeStore((s) => s.setIsPlaying);
  const audioOn = useMetronomeStore((s) => s.audioOn);
  const sound = useMetronomeStore((s) => s.sound);

  const bufferAccent = useRef<AudioBuffer>(null);
  const bufferRegular = useRef<AudioBuffer>(null);

  // Load audio buffers
  useEffect(() => {
    const ctx = getAudioContext();

    (async () => {
      try {
        const { file, fileAccent } = METRONOME_SOUNDS[sound];

        const [accentBuffer, regularBuffer] = await Promise.all([
          fetch(fileAccent ?? file).then((res) => res.arrayBuffer()),
          fetch(file).then((res) => res.arrayBuffer()),
        ]);

        bufferAccent.current = await ctx.decodeAudioData(accentBuffer.slice(0));
        bufferRegular.current = await ctx.decodeAudioData(
          regularBuffer.slice(0)
        );
      } catch (error) {
        console.error("Error loading metronome sound:", error);
      }
    })();
  }, [sound]);

  // Memoise the callback to prevent constant useEffect re-runs
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
      if (!audioOn) return;
      const ctx = getAudioContext();
      const accent = bufferAccent.current;
      const regular = bufferRegular.current;
      if (!accent || !regular) return;

      const src = ctx.createBufferSource();
      src.buffer = beatIndex === 0 ? accent : regular;
      src.connect(ctx.destination);
      try {
        src.start(when); // same timeline as scheduler
      } catch {
        src.start(); // fallback if 'when' slipped into the past
      }
    },
    [audioOn]
  ); // Only depend on audioOn, not the audio buffers

  useMetronome(handleBeat);

  useEffect(() => () => clearTimeout(timeout.current), []);

  return (
    <section className="flex items-center gap-1 md:flex-row flex-row-reverse">
      <div
        className={twJoin(
          "size-5 min-w-5 xl:size-6 rounded-full transition-colors duration-75 md:mr-2",
          isAccent ? "bg-(--tonic-colour)" : "bg-(--note-colour)"
        )}
      />
      <h3 className="text-sm xl:text-base hidden md:block text-grey-mid font-bold tracking-wide">
        Metronome
      </h3>
      <button
        onClick={async () => {
          const ctx = getAudioContext();
          if (ctx.state === "suspended") {
            // gesture-safe resume on iOS
            await ctx.resume();
          }
          setIsPlaying(!isPlaying);
          if (!isPlaying) {
            trackEvent(EventName.PlayMetronome);
          }
        }}
        className="cursor-pointer hover:text-white text-white/80 md:p-2"
        aria-label={isPlaying ? "Stop metronome" : "Start metronome"}
      >
        {isPlaying ? (
          <StopCircle className="size-6 xl:size-7" strokeWidth={1.25} />
        ) : (
          <PlayCircle className="size-6 xl:size-7" strokeWidth={1.25} />
        )}
      </button>
    </section>
  );
};

export default MetronomeController;
