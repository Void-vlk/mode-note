"use client";
import { TimeSig, Sound } from "@/resources/metronome";
import { create } from "zustand";

const clamp = (v: number, mn: number, mx: number) =>
  Math.min(mx, Math.max(mn, v));


type Store = {
  timeSignature: TimeSig;
  setTimeSignature: (timeSignature: TimeSig) => void;
  sound: Sound;
  setSound: (sound: Sound) => void;
  audioOn: boolean;
  setAudioOn: (audioOn: boolean) => void;
  bpm: number
  setBpm: (bpm: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
};

export const useMetronomeStore = create<Store>()((set) => ({
  timeSignature: TimeSig.FourFour,
  setTimeSignature: (timeSignature) => set({ timeSignature }),
  sound: Sound.Click,
  setSound: (sound) => set({ sound }),
  audioOn: true,
  setAudioOn: (audioOn) => set({ audioOn }),
  bpm: 120,
  setBpm: (bpm) => set({ bpm: clamp(bpm, 30, 300) }),
  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
}));
