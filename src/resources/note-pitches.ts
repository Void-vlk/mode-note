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
