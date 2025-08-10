import { SCALE_POSITIONS } from "@/resources/scales";
import { NotePitch } from "@/resources/themes";
import {
  type ScalePositions,
  PositionOption,
  // type PositionOption,
  ScalePosition,
} from "@/resources/types";
import { getNoteName } from "@/hooks/getNoteValues";

// modulo operator for circular indexing
// if position 3 and pattern is Ionian: [0, 2, 4, 5, 7, 9, 11] (7 notes),
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
  console.log("getScalePositionFretRange called with:", {
    scalePattern,
    tuning,
    fretRange,
    tonicNote,
    positionMode,
  });

  if (positionMode === "Shape") {
    console.log("Using Shape mode");
    return getShapeModePositions(scalePattern, tuning, fretRange, tonicNote);
  } else {
    console.log("Using 3NPS mode");
    return get3NPSModePositions(scalePattern, tuning, fretRange, tonicNote);
  }
};

// Build a small extended range outside the base position
const buildExtendedRange = (start: number, end: number) =>
  Array.from(
    { length: Math.max(0, Math.min(end + 5, 24) - start + 1) },
    (_, i) => start + i
  );

// Find all scale notes on a string in ascending fret order
const getNotesOnString = (
  open: NotePitch,
  pattern: NotePitch[],
  tonic: NotePitch,
  frets: number[]
) =>
  frets
    .map((f) => {
      const pitch = ((open + f) % 12) as NotePitch;
      return pattern.includes(((pitch - tonic + 12) % 12) as NotePitch)
        ? { fret: f, pitch, name: getNoteName(pitch, true) }
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
  const maxDist = Math.max(...fretRange) - minFret;
  const used: { string: number; fret: number; pitch: NotePitch }[] = [];

  // Explicitly declare result as number[][] and initialise each entry with an empty array
  const result: number[][] = Array.from({ length: tuning.length }, () => []);

  for (let i = tuning.length - 1; i >= 0; i--) {
    const openNote = tuning[i];
    const notes = getNotesOnString(
      openNote,
      scalePattern,
      tonicNote,
      fretRange
    );

    const frets: number[] = [];
    for (const n of notes) {
      const dup = used.some(
        (u) =>
          u.pitch === n.pitch &&
          Math.abs(i - u.string) <= 1 &&
          Math.abs(n.fret - u.fret) <= maxDist
      );
      if (!dup) {
        frets.push(n.fret);
        used.push({ string: i, fret: n.fret, pitch: n.pitch });
        if (frets.length >= 3) break;
      }
    }
    result[i] = frets;
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
  const extended = buildExtendedRange(baseStart, baseEnd);
  const result: number[][] = [];
  let prevPitches = new Set<number>();

  tuning.forEach((openNote, idx) => {
    const baseNotes = getNotesOnString(
      openNote,
      scalePattern,
      tonicNote,
      fretRange
    );

    // For the top two strings, drop any note that duplicates a pitch on the previous string
    let candidates = baseNotes;
    if (idx >= tuning.length - 2) {
      candidates = candidates.filter((n) => !prevPitches.has(n.pitch));
      // If we now have fewer than 3 notes, grab extras from just beyond the box
      if (candidates.length < 3) {
        const extra = getNotesOnString(
          openNote,
          scalePattern,
          tonicNote,
          extended
        )
          .filter((n) => n.fret > baseEnd && !prevPitches.has(n.pitch))
          .slice(0, 3 - candidates.length);
        candidates = candidates.concat(extra);
      }
    }

    const frets = candidates
      .slice(0, 3)
      .map((n) => n.fret)
      .sort((a, b) => a - b);
    result.push(frets);
    prevPitches = new Set(frets.map((f) => (openNote + f) % 12));
  });

  return result;
};
