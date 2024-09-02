import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  NoteNameTextProps,
  noteNames,
  IntervalProps,
  intervalNames,
} from "@/lib/data/note-data";

export interface NoteState {
  showSharp: boolean;
  showIntervals: boolean;
  noteNames: NoteNameTextProps[];
  intervalNames: IntervalProps[];
  stringNotes: Record<number, { currentIndex: number; openNoteId: number }>;
  toggleSharp: () => void;
  toggleIntervals: () => void;
  setCurrentIndex: (stringIndex: number, newIndex: number) => void;
  setOpenNote: (stringIndex: number, noteId: number) => void;
  resetSharps: () => void;
  resetIntervals: () => void;
}

export const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      showSharp: false,
      showIntervals: false,
      noteNames: [...noteNames],
      intervalNames: [...intervalNames],
      stringNotes: {},
      toggleSharp: () =>
        set((state) => ({
          showSharp: !state.showSharp,
        })),
      toggleIntervals: () =>
        set((state) => ({
          showIntervals: !state.showIntervals,
        })),
      setCurrentIndex: (stringIndex, newIndex) => {
        set((state) => {
          const currentStringNote = state.stringNotes[stringIndex] || {
            currentIndex: 0,
            openNoteId: 0,
          };
          return {
            stringNotes: {
              ...state.stringNotes,
              [stringIndex]: {
                ...currentStringNote,
                currentIndex: newIndex % noteNames.length,
              },
            },
          };
        });
      },
      setOpenNote: (stringIndex, noteId) => {
        set((state) => {
          const currentStringNote = state.stringNotes[stringIndex] || {
            currentIndex: 0,
            openNoteId: 0,
          };
          return {
            stringNotes: {
              ...state.stringNotes,
              [stringIndex]: {
                ...currentStringNote,
                openNoteId: noteId,
                currentIndex: 0,
              },
            },
          };
        });
      },
      resetSharps: () => set({ showSharp: false }),
      resetIntervals: () => set({ showIntervals: false }),
    }),
    {
      name: "note-storage",
      partialize: (state) => ({ showSharp: state.showSharp }),
    }
  )
);
