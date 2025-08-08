import type { NoteVariant } from "@/resources/types";
import type { NotePitch } from "@/resources/themes";

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

export const INTERVALS: Record<
  NotePitch,
  { major: NoteVariant; minor: NoteVariant }
> = {
  0: { major: { natural: "I" }, minor: { natural: "i" } },
  1: {
    major: { sharp: "♯I", flat: "♭II" },
    minor: { sharp: "♯i", flat: "♭ii" },
  },
  2: { major: { natural: "II" }, minor: { natural: "ii" } },
  3: {
    major: { sharp: "♯II", flat: "♭III" },
    minor: { sharp: "♯ii", flat: "♭iii" },
  },
  4: { major: { natural: "III" }, minor: { natural: "iii" } },
  5: { major: { natural: "IV" }, minor: { natural: "iv" } },
  6: {
    major: { sharp: "♯IV", flat: "♭V" },
    minor: { sharp: "♯iv", flat: "♭v" },
  },
  7: { major: { natural: "V" }, minor: { natural: "v" } },
  8: {
    major: { sharp: "♯V", flat: "♭VI" },
    minor: { sharp: "♯v", flat: "♭vi" },
  },
  9: { major: { natural: "VI" }, minor: { natural: "vi" } },
  10: {
    major: { sharp: "♯VI", flat: "♭VII" },
    minor: { sharp: "♯vi", flat: "♭vii" },
  },
  11: { major: { natural: "VII" }, minor: { natural: "vii" } },
  } as const;

export type Mode =
  | "Ionian"
  | "Dorian"
  | "Phrygian"
  | "Lydian"
  | "Mixolydian"
  | "Aeolian"
  | "Locrian";

export const MODE_INTERVALS_SIMPLE: Record<Mode, string[]> = {
  Ionian: ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
  Dorian: ["i", "ii", "III", "IV", "v", "vi°", "VII"],
  Phrygian: ["i", "II", "III", "iv", "v°", "VI", "vii"],
  Lydian: ["I", "II", "iii", "♯iv°", "V", "vi", "vii"],
  Mixolydian: ["I", "ii", "iii°", "IV", "v", "vi", "♭VII"],
  Aeolian: ["i", "ii°", "♭III", "iv", "v", "♭VI", "♭VII"],
  Locrian: ["i°", "♭II", "♭III", "iv", "♭V", "♭VI", "♭vii"],
} as const;