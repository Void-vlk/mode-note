import { create } from 'zustand';
import { ScalesDataProps, scalesData } from '@/lib/data/scales-data';
import { noteNames, NoteNameTextProps } from '@/lib/data/note-data';

interface ScaleState {
  selectedScale: ScalesDataProps | null;
  setSelectedScale: (scaleId: number) => void;
  selectedTonic: NoteNameTextProps | null;
  setSelectedTonic: (noteId: number) => void;
  resetSelection: () => void;
}

export const useScalesStore = create<ScaleState>((set) => ({
  selectedScale: null,
  setSelectedScale: (scaleId) => {
    const scale = scalesData.find((s) => s.id === scaleId) || null;
    // set({ selectedScale: scale }); added default Tonic of C if scale selected first
    set((state) => {
      const defaultTonic = state.selectedTonic || { id: 0, name: 'C' };
      return { selectedScale: scale, selectedTonic: defaultTonic };
    });
  },
  selectedTonic: null,
  setSelectedTonic: (noteId) => {
    const tonic = noteNames.find((n) => n.id === noteId) || null;
    set({ selectedTonic: tonic });
  },
  resetSelection: () => set({ selectedScale: null, selectedTonic: null }),
}));