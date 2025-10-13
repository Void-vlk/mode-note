"use client";
import { useEffect } from "react";
import { useMetronomeStore } from "@/hooks/useMetronomeStore";
import { TIME_SIGNATURES } from "@/resources/metronome";

export const lookAhead = 25; // 25 ms
const scheduleAhead = 0.1; // 100 ms

// Global scheduler state to prevent multiple instances
let globalTimerId: number = 0;
let globalNextNoteTime: number = 0;
let globalBeatCounter: number = 0;
let globalIsRunning: boolean = false;

export type BeatCallback = (index: number, when: number) => void;

// Single AudioContext instance
let audioContext: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (typeof window === "undefined") {
    throw new Error("getAudioContext() must be called in the browser");
  }
  if (!audioContext) {
    const AC =
      window.AudioContext ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).webkitAudioContext;
    audioContext = new AC({ latencyHint: "interactive" });
  }
  return audioContext;
}

export const useMetronome = (onBeat: BeatCallback) => {
  const bpm = useMetronomeStore((s) => s.bpm);
  const isPlaying = useMetronomeStore((s) => s.isPlaying);
  const timeSignature = useMetronomeStore((s) => s.timeSignature);
  const { beat, bar } = TIME_SIGNATURES[timeSignature];

  useEffect(() => {
    const globalAudioContext = getAudioContext();

    // Always clear any existing global interval first
    if (globalTimerId) {
      clearInterval(globalTimerId);
      globalTimerId = 0;
    }

    if (!isPlaying) {
      if (globalAudioContext.state === "running")
        void globalAudioContext.suspend();
      globalIsRunning = false;
      // reset when stopped
      globalNextNoteTime = 0;
      globalBeatCounter = 0;
      return;
    }
    if (globalIsRunning) return;

    if (globalAudioContext.state === "suspended")
      void globalAudioContext.resume();
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
    };
  }, [bpm, isPlaying, beat, bar, onBeat]);
};
