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

const A4_FREQUENCY = 440;
const A4_PITCH_INDEX = 9;
const A4_OCTAVE = 4;

export function frequencyFromOctaveIndex(octave: number, pitchIndex: NotePitch): number {
  const semitonesFromA4 = (octave - A4_OCTAVE) * 12 + (pitchIndex - A4_PITCH_INDEX);
  return A4_FREQUENCY * Math.pow(2, semitonesFromA4 / 12);
}

export function splitSemitone(absoluteSemitone: number): [number, NotePitch] {
  const octave = Math.floor(absoluteSemitone / 12);
  const pitchIndex = ((absoluteSemitone % 12) + 12) % 12;
  return [octave, pitchIndex as NotePitch];
}
