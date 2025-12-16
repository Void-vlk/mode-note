"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { defaultTuning } from "@/hooks/getInstrumentValues";
import { Scales } from "@/resources/scales";
import type { FretQuantity, NotePitch, StringQty } from "@/resources/themes";
import {
  NoteDisplay,
  DEFAULT_STRINGS,
  Instruments,
  ScalePosition,
  PositionOption,
} from "@/resources/types";

export type ScalePattern = {
  tonicNote: NotePitch | null;
  scalePattern: Scales;
};

type CustomTunings = {
  [K in Instruments]?: {
    [S in StringQty]?: NotePitch[];
  };
};

type CustomNoteSelection = { stringIndex: number; fretNumber: number };

export type InstrumentState = {
  instrument: Instruments;
  stringQty: StringQty;
  currentTuning: NotePitch[];
  scale: ScalePattern;
  scalePosition: ScalePosition;
  scalePositionMode: PositionOption;
  noteDisplay: NoteDisplay;
  isSharp: boolean;
  isDiamond: boolean;
  fretQuantity: FretQuantity;
  customTunings: CustomTunings;
  isRightHanded: boolean;
  customScaleAll: NotePitch[];
  customScaleIndividual: CustomNoteSelection[];

  setInstrument: (instrument: Instruments) => void;
  setStringQty: (stringQty: StringQty) => void;
  setTuning: (tuning: NotePitch[]) => void;
  setScale: (scale: ScalePattern) => void;
  setScalePosition: (position: ScalePosition) => void;
  setScalePositionMode: (mode: PositionOption) => void;
  setNoteDisplay: (noteDisplay: NoteDisplay) => void;
  setIsSharp: (isSharp: boolean) => void;
  setIsDiamond: (isDiamond: boolean) => void;
  setFretQuantity: (quantity: FretQuantity) => void;
  setNewTuning: (semitones: -2 | -1 | 1 | 2) => void;
  setCustomTuning: (tuning?: NotePitch[]) => void;
  setIsRightHanded: (isRightHanded: boolean) => void;
  setStringTuning: (stringIndex: number, semitones: -2 | -1 | 1 | 2) => void;
  setCustomScaleAll: (notes: NotePitch[]) => void;
  setCustomScaleIndividual: (notes: CustomNoteSelection[]) => void;
  resetCustomScaleAll: () => void;
  resetCustomScaleIndividual: () => void;
};

export const useInstrumentStore = create<InstrumentState>()(
  persist(
    (set, get) => ({
      instrument: Instruments.Guitar,
      stringQty: DEFAULT_STRINGS[Instruments.Guitar],
      currentTuning: [4, 9, 2, 7, 11, 4],
      scale: {
        tonicNote: null,
        scalePattern: Scales.Chromatic,
      },
      scalePosition: ScalePosition.All,
      scalePositionMode: "Shape",
      noteDisplay: NoteDisplay.Note,
      isSharp: true,
      isDiamond: false,
      fretQuantity: 24,
      customTunings: {},
      isRightHanded: true,
      customScaleAll: [],
      customScaleIndividual: [],

      setInstrument: (instrument: Instruments) =>
        set(() => {
          if (instrument === Instruments.Keys) return { instrument };

          // Guitar/Bass have stringQty and tuning
          const stringQty = DEFAULT_STRINGS[instrument];
          return {
            instrument,
            stringQty,
            currentTuning: defaultTuning(instrument, stringQty),
          };
        }),

      setStringQty: (stringQty: StringQty) =>
        set((state) => ({
          stringQty,
          currentTuning: defaultTuning(state.instrument, stringQty),
        })),

      setTuning: (currentTuning) => set({ currentTuning }),

      setStringTuning: (stringIndex, semitones) =>
        set((state) => ({
          currentTuning: state.currentTuning.map((note, index) =>
            index === stringIndex ? (note + semitones + 12) % 12 : note
          ) as NotePitch[],
        })),

      setScale: (scale) => set({ scale, scalePosition: ScalePosition.All }),

      setScalePosition: (scalePosition) => set({ scalePosition }),
      setScalePositionMode: (scalePositionMode) => set({ scalePositionMode }),

      setNoteDisplay: (noteDisplay) => set({ noteDisplay }),
      setIsSharp: (isSharp) => set({ isSharp }),
      setIsDiamond: (isDiamond) => set({ isDiamond }),
      setFretQuantity: (fretQuantity) => set({ fretQuantity }),

      setNewTuning: (semitones) =>
        set({
          currentTuning: get().currentTuning.map(
            (notes) => (notes + semitones + 12) % 12
          ) as NotePitch[],
        }),

      setCustomTuning: (tuning) =>
        set((state) => {
          const { instrument, stringQty } = state;

          if (tuning) {
            return {
              currentTuning: tuning,
              customTunings: {
                ...state.customTunings,
                [instrument]: {
                  ...state.customTunings[instrument],
                  [stringQty]: tuning,
                },
              },
            };
          }
          // if no saved tuning, return existing/default
          const existing = state.customTunings[instrument]?.[stringQty];
          return existing ? { currentTuning: existing } : state;
        }),

      setIsRightHanded: (isRightHanded) => set({ isRightHanded }),

      setCustomScaleAll: (notes) => set({ customScaleAll: notes }),
      setCustomScaleIndividual: (notes) =>
        set({ customScaleIndividual: notes }),
      resetCustomScaleAll: () => set({ customScaleAll: [] }),
      resetCustomScaleIndividual: () => set({ customScaleIndividual: [] }),
    }),
    {
      name: "instrument-store",
      partialize: (state) => ({
        instrument: state.instrument,
        stringQty: state.stringQty,
        noteDisplay: state.noteDisplay,
        currentTuning: state.currentTuning,
        customTunings: state.customTunings,
        isSharp: state.isSharp,
        isRightHanded: state.isRightHanded,
        customScaleIndividual: state.customScaleIndividual,
        customScaleAll: state.customScaleAll,
      }),
      // not scales
    }
  )
);
