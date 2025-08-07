import type { NotePitch, StringQty } from "@/resources/themes";

export type WizardStage = (typeof WIZARD_STAGES)[number];
export const WIZARD_STAGES = ["instrument", "tuning", "scale"] as const;

export enum Instruments {
  Guitar = "guitar",
  Bass = "bass",
}

export type Instrument = {
  id: Instruments;
  label: string;
};

export const INSTRUMENTS: Record<Instruments, Instrument> = {
  [Instruments.Guitar]: { id: Instruments.Guitar, label: "Guitar" },
  [Instruments.Bass]: { id: Instruments.Bass, label: "Bass" },
};

export const DEFAULT_STRINGS: Record<Instruments, StringQty> = {
  [Instruments.Guitar]: 6,
  [Instruments.Bass]: 4,
} as const;

export enum NoteDisplay {
  Blank = "blank",
  Note = "note",
  Interval = "interval",
}

export type NoteVariant = {
  natural?: string;
  sharp?: string;
  flat?: string;
};

export type Tuning = {
  id: string;
  name: string;
  instrument: Instruments;
  stringQty: StringQty;
  stringTunings: NotePitch[];
};

export type Scale = {
  id: string;
  name: string;
  pattern: NotePitch[];
  positions?: ScalePositions;
};

export enum ScalePosition {
  All = "all",
  Open = "open",
  First = "first",
  Second = "second",
  Third = "third",
  Fourth = "fourth",
  Fifth = "fifth",
  Sixth = "sixth",
  Seventh = "seventh",
  Eighth = "eighth",
  Ninth = "ninth",
  Tenth = "tenth",
  Eleventh = "eleventh",
  Twelfth = "twelfth",
  Thirteenth = "thirteenth",
  Fourteenth = "fourteenth",
  Fifteenth = "fifteenth",
  Sixteenth = "sixteenth",
  Seventeenth = "seventeenth",
  Eighteenth = "eighteenth",
  Nineteenth = "nineteenth",
  Twentieth = "twentieth",
}

export type ScalePositionData = {
  label: string;
  value: ScalePosition;
  fretRange: number[];
};

// extended type
export type ScalePositionContent = ScalePositionData & {
  startingNoteIndex: number;
};

// collection type
export type ScalePositions = Record<ScalePosition, ScalePositionContent>
