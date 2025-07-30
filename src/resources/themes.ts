import { Instrument, Instruments } from "@/resources/types";
import { TimeSignature, Sound } from "@/resources/metronome";

export type OptionValue =
  | Instrument
  | StringQty
  | NotePitch
  | TimeSignature
  | Sound
  | string;

export const NOTE_PITCHES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
export type NotePitch = (typeof NOTE_PITCHES)[number];

export const STRING_QUANTITIES = [4, 5, 6, 7, 8] as const;
export type StringQty = (typeof STRING_QUANTITIES)[number];

export type FretboardTheme = (typeof FRETBOARD_THEMES)[number];
export const FRETBOARD_THEMES = ["rosewood", "maple", "ebony", "pale"] as const;

export type StringTheme = (typeof STRING_THEMES)[number];
export const STRING_THEMES = ["gold", "silver"] as const;

export type FretQuantity = 21 | 24;

export type NoteTheme = (typeof NOTE_THEMES)[number];
export const NOTE_THEMES = [
  "green",
  "blue",
  "red",
  "orange",
  "pink",
  "purple",
  "turquoise",
  "yellow",
  "black",
  "white",
] as const;

export type TonicTheme = (typeof TONIC_THEMES)[number];
export const TONIC_THEMES = [
  "amber",
  "blue",
  "emerald",
  "fuchsia",
  "orange",
  "rose",
  "grey-mid",
  "grey-dark",
] as const;

export const NOTE_TO_TONIC: Record<NoteTheme, TonicTheme> = {
  green: "fuchsia",
  blue: "orange",
  orange: "blue",
  pink: "emerald",
  purple: "amber",
  red: "emerald",
  turquoise: "rose",
  yellow: "fuchsia",
  black: "grey-dark",
  white: "grey-mid",
} as const;

export type AppTheme = (typeof APP_THEMES)[number];
export const APP_THEMES = ["default", "simple"] as const;







export const STRING_THICKNESS = {
  [Instruments.Guitar]: {
    6: ["h-1.25", "h-1", "h-0.75", "h-0.75", "h-0.5", "h-0.5"],
    7: ["h-1.5", "h-1.25", "h-1", "h-0.75", "h-0.75", "h-0.5", "h-0.5"],
    8: [
      "h-1.75",
      "h-1.5",
      "h-1.25",
      "h-1",
      "h-0.75",
      "h-0.75",
      "h-0.5",
      "h-0.5",
    ],
  },
  [Instruments.Bass]: {
    4: ["h-1.75", "h-1.5", "h-1.25", "h-1"],
    5: ["h-2", "h-1.75", "h-1.5", "h-1.25", "h-1"],
    6: ["h-2", "h-1.75", "h-1.5", "h-1.25", "h-1", "h-0.75"],
  },
} as const;
