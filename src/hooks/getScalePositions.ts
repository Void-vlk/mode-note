import { SCALE_POSITIONS } from "@/resources/scales";
import { NotePitch } from "@/resources/themes";
import {
  type ScalePositions,
  PositionOption,
  ScalePosition,
} from "@/resources/types";
import { getNoteName } from "@/hooks/getNoteValues";

// modulo operator for circular indexing, if position 3 and pattern is Ionian: [0, 2, 4, 5, 7, 9, 11] (7 notes),
// 3: { startingNoteIndex: 2 % 7 = 2 } Start from 3rd note - (4)
export const generateScalePositions = (
  patternLength: number
): ScalePositions => {
  const positions: ScalePositions = {} as ScalePositions;

  Object.entries(SCALE_POSITIONS).forEach(([key, staticData]) => {
    const scalePosition = key as ScalePosition;

    // Get position index directly from the enum values
    const allPositions = Object.values(ScalePosition);
    const positionIndex = allPositions.indexOf(scalePosition);

    // Calculate starting note index: All/Open=0, First=1, others use (index-1) % pattern
    const startingNoteIndex =
      positionIndex <= 1 ? 0 : (positionIndex - 1) % patternLength;

    positions[scalePosition] = {
      ...staticData,
      startingNoteIndex,
    };
  });

  return positions;
};

export const getScalePositionFretRange = (
  scalePattern: NotePitch[],
  tuning: NotePitch[],
  fretRange: number[],
  tonicNote: NotePitch,
  positionMode: PositionOption
): number[][] => {
  if (positionMode === "Shape") {
    return getShapeModePositions(scalePattern, tuning, fretRange, tonicNote);
  } else {
    return get3NPSModePositions(scalePattern, tuning, fretRange, tonicNote);
  }
};

// Build a small extended fret range outside the base position
const getExtendedFretRange = (start: number, end: number) =>
  Array.from(
    { length: Math.max(0, Math.min(end + 5, 24) - start + 1) },
    (_, index) => start + index
  );

// Find all scale notes on a string in ascending fret order
const getNotesOnString = (
  open: NotePitch,
  pattern: NotePitch[],
  tonic: NotePitch,
  frets: number[]
) =>
  frets
    .map((fret) => {
      const pitch = ((open + fret) % 12) as NotePitch;
      return pattern.includes(((pitch - tonic + 12) % 12) as NotePitch)
        ? { fret, pitch, name: getNoteName(pitch, true) }
        : null;
    })
    .filter(Boolean) as { fret: number; pitch: NotePitch; name: string }[];

// Get positions in "Shape" box mode
export const getShapeModePositions = (
  scalePattern: NotePitch[],
  tuning: NotePitch[],
  fretRange: number[],
  tonicNote: NotePitch
): number[][] => {
  const minFret = Math.min(...fretRange);
  const maxDistance = Math.max(...fretRange) - minFret;
  const used: { string: number; fret: number; pitch: NotePitch }[] = [];

  // Explicitly declare result as number[][] and initialise each entry with an empty array
  const result: number[][] = Array.from({ length: tuning.length }, () => []);

  for (let index = tuning.length - 1; index >= 0; index--) {
    const openNote = tuning[index];
    const notes = getNotesOnString(
      openNote,
      scalePattern,
      tonicNote,
      fretRange
    );

    const frets: number[] = [];
    for (const note of notes) {
      const duplicated = used.some(
        (used) =>
          used.pitch === note.pitch &&
          Math.abs(index - used.string) <= 1 &&
          Math.abs(note.fret - used.fret) <= maxDistance
      );
      if (!duplicated) {
        frets.push(note.fret);
        used.push({ string: index, fret: note.fret, pitch: note.pitch });
        if (frets.length >= 3) break;
      }
    }
    result[index] = frets;
  }

  return result;
};

export const get3NPSModePositions = (
  scalePattern: NotePitch[],
  tuning: NotePitch[],
  fretRange: number[],
  tonicNote: NotePitch
): number[][] => {
  const baseStart = Math.min(...fretRange);
  const baseEnd = Math.max(...fretRange);
  const extended = getExtendedFretRange(baseStart, baseEnd);
  const result: number[][] = [];
  let prevPitches = new Set<number>();

  tuning.forEach((openNote, index) => {
    const baseNotes = getNotesOnString(
      openNote,
      scalePattern,
      tonicNote,
      fretRange
    );

    // For the top two strings, drop any note that duplicates a pitch on the previous string
    let candidates = baseNotes;
    if (index >= tuning.length - 2) {
      candidates = candidates.filter((note) => !prevPitches.has(note.pitch));
      // If we now have fewer than 3 notes, grab extras from just beyond the box
      if (candidates.length < 3) {
        const extra = getNotesOnString(
          openNote,
          scalePattern,
          tonicNote,
          extended
        )
          .filter((note) => note.fret > baseEnd && !prevPitches.has(note.pitch))
          .slice(0, 3 - candidates.length);
        candidates = candidates.concat(extra);
      }
    }

    const frets = candidates
      .slice(0, 3)
      .map((note) => note.fret)
      .sort((a, b) => a - b);
    result.push(frets);
    prevPitches = new Set(frets.map((fret) => (openNote + fret) % 12));
  });

  return result;
};
