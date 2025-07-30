"use client";
import { TimeSig, Sound } from "@/resources/metronome";
import { create } from "zustand";

type Store = {
  timeSignature: TimeSig;
  setTimeSignature: (timeSignature: TimeSig) => void;
  sound: Sound;
  setSound: (sound: Sound) => void;
};

export const useMetronomeStore = create<Store>()((set) => ({
  timeSignature: TimeSig.FourFour,
  setTimeSignature: (timeSignature) => set({ timeSignature }),
  sound: Sound.Click,
  setSound: (sound) => set({ sound }),
}));
