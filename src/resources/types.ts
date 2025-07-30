import type { NotePitch, StringQty } from "@/resources/themes";

export type WizardStage = (typeof WIZARD_STAGES)[number];
export const WIZARD_STAGES = [
  "instrument",
  "tuning",
  "scale",
  "complete",
] as const;

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

export type Scale = {
  id: string;
  name: string;
  pattern: NotePitch[];
};

export type Tuning = {
  id: string;
  name: string;
  instrument: Instruments;
  stringQty: StringQty;
  stringTunings: NotePitch[];
};
