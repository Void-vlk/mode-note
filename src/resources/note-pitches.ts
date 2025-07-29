import { NotePitch, NoteVariant } from "@/resources/types";

export const NOTE_PITCHES: Record<NotePitch, NoteVariant> = {
  0: { natural: "C" },
  1: { sharp: "C♯", flat: "D♭" },
  2: { natural: "D" },
  3: { sharp: "D♯", flat: "E♭" },
  4: { natural: "E" },
  5: { natural: "F" },
  6: { sharp: "F♯", flat: "G♭" },
  7: { natural: "G" },
  8: { sharp: "G♯", flat: "A♭" },
  9: { natural: "A" },
  10: { sharp: "A♯", flat: "B♭" },
  11: { natural: "B" },
} as const;

export const INTERVALS: Record<NotePitch, NoteVariant> = {
  0: { natural: "I" },
  1: { sharp: "♯I", flat: "♭II" },
  2: { natural: "II" },
  3: { sharp: "♯II", flat: "♭III" },
  4: { natural: "III" },
  5: { natural: "IV" },
  6: { sharp: "♯IV", flat: "♭V}" },
  7: { natural: "V" },
  8: { sharp: "♯V", flat: "♭VI" },
  9: { natural: "VI" },
  10: { sharp: "♯VI", flat: "♭VII" },
  11: { natural: "VII" },
} as const;
