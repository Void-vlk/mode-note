import { create } from 'zustand'
import { TimeSignatureProps, timeSignatureData } from '@/lib/data/metronome-data';

export interface MetronomeState {
  bpm: number;
  setBpm: (bpm: number) => void;
  selectedTimeSignature: TimeSignatureProps;
  setSelectedTimeSignature: (timeSignatureId: number) => void;

  isPlaying: boolean;
  isClick: boolean;
  isVolume: boolean;
  isFlash: boolean;
  togglePlay: () => void;
  toggleSoundType: () => void;
  toggleVolume: () => void;
  toggleFlash: () => void;
}

export const useMetronomeStore = create<MetronomeState>((set, get) => ({
  bpm: 120,
  setBpm: (bpm) => set({ bpm }),
  selectedTimeSignature: timeSignatureData[2], //default 4/4
  setSelectedTimeSignature: (timeSignatureId) => {
    const timeSignature = timeSignatureData.find((timeSignature) => timeSignature.id === timeSignatureId) || timeSignatureData[2];
    set({ selectedTimeSignature: timeSignature });
  },
  isPlaying: false,
  isClick: true,
  isVolume: true,
  isFlash: true,
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  toggleSoundType: () => set((state) => ({ isClick: !state.isClick })),
  toggleVolume: () => set((state) => ({ isVolume: !state.isVolume })),
  toggleFlash: () => set((state) => ({ isFlash: !state.isFlash })),
}));