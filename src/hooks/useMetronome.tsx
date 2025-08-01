"use client";
import { useEffect } from "react";
import { useMetronomeStore } from "@/hooks/useMetronomeStore";
import { TIME_SIGNATURES } from "@/resources/metronome";

export const lookAhead = 25; // 25 ms
const scheduleAhead = 0.1; // 100 ms

// Global scheduler state to prevent multiple instances
let globalTimerId: number = 0;
let globalAudioContext: AudioContext | null = null;
let globalNextNoteTime: number = 0;
let globalBeatCounter: number = 0;
let globalIsRunning: boolean = false;

export type BeatCallback = (index: number, when: number) => void;

export function useMetronome(onBeat: BeatCallback) {
  const bpm = useMetronomeStore((s) => s.bpm);
  const isPlaying = useMetronomeStore((s) => s.isPlaying);
  const timeSignature = useMetronomeStore((s) => s.timeSignature);
  const { beat, bar } = TIME_SIGNATURES[timeSignature];

  // ensure AudioContext exists exactly once globally
  if (!globalAudioContext) globalAudioContext = new AudioContext();

  useEffect(() => {
    // Only create AudioContext on client side
    if (!globalAudioContext && typeof window !== "undefined") {
      globalAudioContext = new (window.AudioContext ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).webkitAudioContext)();
    }

    // Always clear any existing global interval first
    if (globalTimerId) {
      clearInterval(globalTimerId);
      globalTimerId = 0;
    }

    if (!isPlaying) {
      globalAudioContext!.suspend();
      globalIsRunning = false;
      // reset when stopped
      globalNextNoteTime = 0;
      globalBeatCounter = 0;
      return;
    }
    if (globalIsRunning) return;

    globalAudioContext!.resume();
    globalIsRunning = true;

    // quarter-note beat for /4 signatures, eighth-note beat for /8
    const secondsPerBeat = (60 / bpm) * (4 / bar);

    const scheduler = () => {
      while (
        globalNextNoteTime <
        globalAudioContext!.currentTime + scheduleAhead
      ) {
        onBeat(globalBeatCounter, globalNextNoteTime);
        globalNextNoteTime += secondsPerBeat;
        globalBeatCounter = (globalBeatCounter + 1) % beat;
      }
    };

    globalNextNoteTime = globalAudioContext!.currentTime;
    globalBeatCounter = 0;
    globalTimerId = window.setInterval(scheduler, lookAhead);

    return () => {
      if (globalTimerId) {
        clearInterval(globalTimerId);
        globalTimerId = 0;
      }
      globalIsRunning = false;
      globalNextNoteTime = 0;
      globalBeatCounter = 0;
      if (globalAudioContext) {
        globalAudioContext.suspend();
      }
    };
  }, [bpm, isPlaying, beat, bar, onBeat]);
}
