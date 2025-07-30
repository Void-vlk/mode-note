"use client";

import { create } from "zustand";

import {
  type AppTheme,
  type FretboardTheme,
  type NoteTheme,
  type StringTheme,
  NOTE_TO_TONIC,
} from "@/resources/themes";

type themeStore = {
  fretboardTheme: FretboardTheme;
  stringTheme: StringTheme;
  appTheme: AppTheme;
  noteTheme: NoteTheme;
  setFretboardTheme: (colour: FretboardTheme) => void;
  setStringTheme: (colour: StringTheme) => void;
  setAppTheme: (theme: AppTheme) => void;
  setNoteTheme: (theme: NoteTheme) => void;
};

export const useThemeStore = create<themeStore>((set) => ({
  fretboardTheme: "rosewood",
  stringTheme: "gold",
  appTheme: "default",
  noteTheme: "green",

  setFretboardTheme: (fretboardTheme) => {
    set({ fretboardTheme });
    document.documentElement.setAttribute("data-fretboard", fretboardTheme);
  },
  setStringTheme: (stringTheme) => {
    set({ stringTheme });
    document.documentElement.setAttribute("data-string", stringTheme);
  },
  setAppTheme: (appTheme) => {
    set({ appTheme });
    document.documentElement.setAttribute("data-app", appTheme);
  },
  setNoteTheme: (noteTheme) => {
    set({ noteTheme });
    document.documentElement.setAttribute("data-note", noteTheme);
    document.documentElement.setAttribute(
      "data-tonic",
      NOTE_TO_TONIC[noteTheme]
    );
  },
}));
