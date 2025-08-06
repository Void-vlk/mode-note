"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NoteDisplay, DEFAULT_STRINGS, Instruments, ScalePosition } from "@/resources/types";
import type { FretQuantity, NotePitch, StringQty } from "@/resources/themes";
import { defaultTuning } from "@/hooks/getInstrumentValues";

export type Scale = {
  tonicNote: NotePitch | null;
  scalePattern: string;
};

type CustomTunings = {
  [K in Instruments]?: {
    [S in StringQty]?: NotePitch[];
  };
};

export type InstrumentState = {
  instrument: Instruments;
  stringQty: StringQty;
  currentTuning: NotePitch[];
  scale: Scale;
  scalePosition: ScalePosition;
  noteDisplay: NoteDisplay;
  isSharp: boolean;
  isDiamond: boolean;
  fretQuantity: FretQuantity;
  customTunings: CustomTunings;

  setInstrument: (instrument: Instruments) => void;
  setStringQty: (stringQty: StringQty) => void;
  setTuning: (tuning: NotePitch[]) => void;
  setScale: (scale: Scale) => void;
  setScalePosition: (position: ScalePosition) => void;
  setNoteDisplay: (noteDisplay: NoteDisplay) => void;
  setIsSharp: (isSharp: boolean) => void;
  setIsDiamond: (isDiamond: boolean) => void;
  setFretQuantity: (quantity: FretQuantity) => void;
  setNewTuning: (semitones: -2 | -1 | 1 | 2) => void;
  setCustomTuning: (tuning?: NotePitch[]) => void;
};

export const useInstrumentStore = create<InstrumentState>()(
  persist(
    (set, get) => ({
      instrument: Instruments.Guitar,
      stringQty: DEFAULT_STRINGS[Instruments.Guitar],
      currentTuning: [4, 9, 2, 7, 11, 4],
      scale: {
        tonicNote: null,
        scalePattern: "chromatic",
      },
      scalePosition: ScalePosition.All,
      noteDisplay: NoteDisplay.Note,
      isSharp: true,
      isDiamond: false,
      fretQuantity: 24,
      customTunings: {},

      setInstrument: (instrument: Instruments) =>
        set(() => {
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
      setScale: (scale) => set({ scale }),

      setScalePosition: (scalePosition) => {
        console.log("Store: setScalePosition called with:", scalePosition);
        set({ scalePosition });
        console.log("Store: scalePosition updated to:", scalePosition);
      },

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
    }),
    {
      name: "instrument-store",
      partialize: (state) => ({
        instrument: state.instrument,
        stringQty: state.stringQty,
        currentTuning: state.currentTuning,
        customTunings: state.customTunings,
        noteDisplay: state.noteDisplay,
        isSharp: state.isSharp,
      }),
      // not scales
    }
  )
);
