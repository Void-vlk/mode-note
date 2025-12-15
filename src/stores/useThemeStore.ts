"use client";

import { create } from "zustand";

import {
  type FretboardTheme,
  type NoteTheme,
  type StringTheme,
  NOTE_TO_TONIC,
} from "@/resources/themes";

type themeStore = {
  fretboardTheme: FretboardTheme;
  stringTheme: StringTheme;
  noteTheme: NoteTheme;
  customSelectionMode: boolean
  singleNoteSelectionMode: boolean
  showAllNotes: boolean

  setFretboardTheme: (colour: FretboardTheme) => void;
  setStringTheme: (colour: StringTheme) => void;
  setNoteTheme: (theme: NoteTheme) => void;
  setCustomSelectionMode: (customSelection: boolean) => void;
  setSingleNoteSelectionMode: (singleNoteSelection: boolean) => void;
  setShowAllNotes: (showAllNotes: boolean) => void;
};

export const useThemeStore = create<themeStore>((set) => ({
  fretboardTheme: "rosewood",
  stringTheme: "gold",
  noteTheme: "green",
  customSelectionMode: false,
  singleNoteSelectionMode: false,
  showAllNotes: false,

  setFretboardTheme: (fretboardTheme) => {
    set({ fretboardTheme });
    document.documentElement.setAttribute("data-fretboard", fretboardTheme);
  },
  setStringTheme: (stringTheme) => {
    set({ stringTheme });
    document.documentElement.setAttribute("data-string", stringTheme);
  },
  setNoteTheme: (noteTheme) => {
    set({ noteTheme });
    document.documentElement.setAttribute("data-note", noteTheme);
    document.documentElement.setAttribute(
      "data-tonic",
      NOTE_TO_TONIC[noteTheme]
    );
  },
  setCustomSelectionMode: (customSelectionMode) => set({ customSelectionMode }),
  setSingleNoteSelectionMode: (singleNoteSelectionMode) => set({ singleNoteSelectionMode }),
  setShowAllNotes: (showAllNotes) => set({ showAllNotes }),

}));
