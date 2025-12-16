import type { NotePitch, StringQty } from "@/resources/themes";

export type WizardStage = (typeof WIZARD_STAGES)[number];
export const WIZARD_STAGES = ["instrument", "tuning", "scale"] as const;

export enum Instruments {
  Guitar = "guitar",
  Bass = "bass",
  Keys = "keys",
}

export type Instrument = {
  id: Instruments;
  label: string;
};

export const INSTRUMENTS: Record<Instruments, Instrument> = {
  [Instruments.Guitar]: { id: Instruments.Guitar, label: "Guitar" },
  [Instruments.Bass]: { id: Instruments.Bass, label: "Bass" },
  [Instruments.Keys]: { id: Instruments.Keys, label: "Keyboard" },
};

export const DEFAULT_STRINGS: Record<Instruments, StringQty> = {
  [Instruments.Guitar]: 6,
  [Instruments.Bass]: 4,
  [Instruments.Keys]: 0,
} as const;

// Allowed string quantities per instrument
type GuitarStringQty = 6 | 7 | 8 | 9 | 10;
type BassStringQty = 4 | 5 | 6 | 7;
type KeysStringQty = 0;

export type InstrumentStringQtyMap = {
  [Instruments.Guitar]: GuitarStringQty;
  [Instruments.Bass]: BassStringQty;
  [Instruments.Keys]: KeysStringQty;
};

export type TuningsMap = {
  [K in Instruments]: Record<InstrumentStringQtyMap[K], Tuning[]>;
};

export enum NoteDisplay {
  Note = "note",
  Interval = "interval",
  Blank = "blank",
}

export type NoteDisplayOption = {
  value: NoteDisplay;
  label: string;
};

export const NOTE_DISPLAY: Record<NoteDisplay, NoteDisplayOption> = {
  [NoteDisplay.Note]: { value: NoteDisplay.Note, label: "Pitch" },
  [NoteDisplay.Interval]: { value: NoteDisplay.Interval, label: "Intervals" },
  [NoteDisplay.Blank]: { value: NoteDisplay.Blank, label: "Blank" },
};

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
  intervals: string[];
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
export type ScalePositions = Record<ScalePosition, ScalePositionContent>;

export type PositionOption = 'Shape' | '3NPS'