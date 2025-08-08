import {
  type Scale,
  type ScalePositions,
  ScalePosition,
  type ScalePositionData,
} from "@/resources/types";

export enum Scales {
  Chromatic = "chromatic",
  Ionian = "ionian",
  Dorian = "dorian",
  Phrygian = "phyrgian",
  Lydian = "lydian",
  Mixolydian = "mixolydian",
  Aeolian = "aeolian",
  Locrian = "locrian",
  Major = "major",
  Minor = "minor",
  Algerian = "algerian",
  Augmented = "augmented",
  BebopMajor = "bebop-major",
  Blues = "blues",
  HalfDiminished = "half-diminished",
  Gypsy = "gypsy",
  HarmonicMinor = "harmonic-minor",
  Hirajoshi = "hirajoshi",
  HungarianMinor = "hungarian-minor",
  Iwato = "iwato",
  MelodicMinorAscending = "melodic-minor-ascending",
  MelodicMinorDescending = "melodic-minor-descending",
  PentatonicMajor = "pentatonic-major",
  PentatonicMinor = "pentatonic-minor",
  Persian = "persian",
  Prometheus = "prometheus",
  SuperLocrian = "super-locrian",
  Tritone = "tritone",
  WholeTone = "whole-tone",
}

// modulo operator for circular indexing
// if position 3 and pattern is Ionian: [0, 2, 4, 5, 7, 9, 11] (7 notes),
// 3: { startingNoteIndex: 2 % 7 = 2 } Start from 3rd note - (4)
const generateScalePositions = (patternLength: number): ScalePositions => {
  const positions: ScalePositions = {} as ScalePositions;

  Object.entries(SCALE_POSITIONS).forEach(([key, staticData]) => {
    const scalePos = key as ScalePosition;

    // Get position index directly from the enum values
    const allPositions = Object.values(ScalePosition);
    const positionIndex = allPositions.indexOf(scalePos);

    // Calculate starting note index: All/Open=0, First=1, others use (index-1) % pattern
    const startingNoteIndex =
      positionIndex <= 1 ? 0 : (positionIndex - 1) % patternLength;

    positions[scalePos] = {
      ...staticData,
      startingNoteIndex,
    };
  });

  return positions;
};

/* POSITIONS */
export const SCALE_POSITIONS: Record<ScalePosition, ScalePositionData> = {
  [ScalePosition.All]: {
    label: "All",
    value: ScalePosition.All,
    fretRange: [],
  },
  [ScalePosition.Open]: {
    label: "Open",
    value: ScalePosition.Open,
    fretRange: [0, 1, 2, 3],
  },
  [ScalePosition.First]: {
    label: "First",
    value: ScalePosition.First,
    fretRange: [1, 2, 3, 4, 5],
  },
  [ScalePosition.Second]: {
    label: "Second",
    value: ScalePosition.Second,
    fretRange: [2, 3, 4, 5, 6],
  },
  [ScalePosition.Third]: {
    label: "Third",
    value: ScalePosition.Third,
    fretRange: [3, 4, 5, 6, 7],
  },
  [ScalePosition.Fourth]: {
    label: "Fourth",
    value: ScalePosition.Fourth,
    fretRange: [4, 5, 6, 7, 8],
  },
  [ScalePosition.Fifth]: {
    label: "Fifth",
    value: ScalePosition.Fifth,
    fretRange: [5, 6, 7, 8, 9],
  },
  [ScalePosition.Sixth]: {
    label: "Sixth",
    value: ScalePosition.Sixth,
    fretRange: [6, 7, 8, 9, 10],
  },
  [ScalePosition.Seventh]: {
    label: "Seventh",
    value: ScalePosition.Seventh,
    fretRange: [7, 8, 9, 10, 11],
  },
  [ScalePosition.Eighth]: {
    label: "Eighth",
    value: ScalePosition.Eighth,
    fretRange: [8, 9, 10, 11, 12],
  },
  [ScalePosition.Ninth]: {
    label: "Ninth",
    value: ScalePosition.Ninth,
    fretRange: [9, 10, 11, 12, 13],
  },
  [ScalePosition.Tenth]: {
    label: "Tenth",
    value: ScalePosition.Tenth,
    fretRange: [10, 11, 12, 13, 14],
  },
  [ScalePosition.Eleventh]: {
    label: "Eleventh",
    value: ScalePosition.Eleventh,
    fretRange: [11, 12, 13, 14, 15],
  },
  [ScalePosition.Twelfth]: {
    label: "Twelfth",
    value: ScalePosition.Twelfth,
    fretRange: [12, 13, 14, 15, 16],
  },
  [ScalePosition.Thirteenth]: {
    label: "Thirteenth",
    value: ScalePosition.Thirteenth,
    fretRange: [13, 14, 15, 16, 17],
  },
  [ScalePosition.Fourteenth]: {
    label: "Fourteenth",
    value: ScalePosition.Fourteenth,
    fretRange: [14, 15, 16, 17, 18],
  },
  [ScalePosition.Fifteenth]: {
    label: "Fifteenth",
    value: ScalePosition.Fifteenth,
    fretRange: [15, 16, 17, 18, 19],
  },
  [ScalePosition.Sixteenth]: {
    label: "Sixteenth",
    value: ScalePosition.Sixteenth,
    fretRange: [16, 17, 18, 19, 20],
  },
  [ScalePosition.Seventeenth]: {
    label: "Seventeenth",
    value: ScalePosition.Seventeenth,
    fretRange: [17, 18, 19, 20, 21],
  },
  [ScalePosition.Eighteenth]: {
    label: "Eighteenth",
    value: ScalePosition.Eighteenth,
    fretRange: [18, 19, 20, 21, 22],
  },
  [ScalePosition.Nineteenth]: {
    label: "Nineteenth",
    value: ScalePosition.Nineteenth,
    fretRange: [19, 20, 21, 22, 23],
  },
  [ScalePosition.Twentieth]: {
    label: "Twentieth",
    value: ScalePosition.Twentieth,
    fretRange: [20, 21, 22, 23, 24],
  },
};

/* SCALES */
export const SCALES: Record<Scales, Scale> = {
  [Scales.Chromatic]: {
    id: "chromatic",
    name: "Chromatic",
    pattern: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
  [Scales.Ionian]: {
    id: "ionian",
    name: "Ionian",
    pattern: [0, 2, 4, 5, 7, 9, 11],
    positions: generateScalePositions(7),
  },
  [Scales.Dorian]: {
    id: "dorian",
    name: "Dorian",
    pattern: [0, 2, 3, 5, 7, 9, 10],
    positions: generateScalePositions(7),
  },
  [Scales.Phrygian]: {
    id: "phyrgian",
    name: "Phrygian",
    pattern: [0, 1, 3, 5, 7, 8, 10],
    positions: generateScalePositions(7),
  },
  [Scales.Lydian]: {
    id: "lydian",
    name: "Lydian",
    pattern: [0, 2, 4, 6, 7, 9, 11],
    positions: generateScalePositions(7),
  },
  [Scales.Mixolydian]: {
    id: "mixolydian",
    name: "Mixolydian",
    pattern: [0, 2, 4, 5, 7, 9, 10],
    positions: generateScalePositions(7),
  },
  [Scales.Aeolian]: {
    id: "aeolian",
    name: "Aeolian",
    pattern: [0, 2, 3, 5, 7, 8, 10],
    positions: generateScalePositions(7),
  },
  [Scales.Locrian]: {
    id: "locrian",
    name: "Locrian",
    pattern: [0, 1, 3, 5, 6, 8, 10],
    positions: generateScalePositions(7),
  },
  [Scales.Major]: {
    id: "major",
    name: "Major",
    pattern: [0, 2, 4, 5, 7, 9, 11],
    positions: generateScalePositions(7),
  },
  [Scales.Minor]: {
    id: "minor",
    name: "Minor",
    pattern: [0, 2, 3, 5, 7, 8, 10],
    positions: generateScalePositions(7),
  },
  [Scales.Algerian]: {
    id: "algerian",
    name: "Algerian",
    pattern: [0, 2, 3, 6, 7, 9, 11],
    positions: generateScalePositions(7),
  },
  [Scales.Augmented]: {
    id: "augmented",
    name: "Augmented",
    pattern: [0, 3, 4, 7, 8, 11],
    positions: generateScalePositions(6),
  },
  [Scales.BebopMajor]: {
    id: "bebop-major",
    name: "Bebop Major",
    pattern: [0, 2, 4, 5, 7, 8, 9, 11],
    positions: generateScalePositions(8),
  },
  [Scales.Blues]: {
    id: "blues",
    name: "Blues",
    pattern: [0, 3, 5, 6, 7, 10],
    positions: generateScalePositions(6),
  },
  [Scales.HalfDiminished]: {
    id: "half-diminished",
    name: "Half Diminished",
    pattern: [0, 2, 3, 5, 6, 8, 10],
    positions: generateScalePositions(7),
  },
  [Scales.Gypsy]: {
    id: "gypsy",
    name: "Gypsy",
    pattern: [0, 2, 3, 6, 7, 8, 10],
    positions: generateScalePositions(7),
  },
  [Scales.HarmonicMinor]: {
    id: "harmonic-minor",
    name: "Harmonic Minor",
    pattern: [0, 2, 3, 5, 7, 8, 11],
    positions: generateScalePositions(7),
  },
  [Scales.Hirajoshi]: {
    id: "hirajoshi",
    name: "Hirajoshi",
    pattern: [0, 4, 6, 7, 11],
    positions: generateScalePositions(5),
  },
  [Scales.HungarianMinor]: {
    id: "hungarian-minor",
    name: "Hungarian Minor",
    pattern: [0, 2, 3, 6, 7, 8, 11],
    positions: generateScalePositions(7),
  },
  [Scales.Iwato]: {
    id: "iwato",
    name: "Iwato",
    pattern: [0, 1, 5, 6, 10],
    positions: generateScalePositions(5),
  },
  [Scales.MelodicMinorAscending]: {
    id: "melodic-minor-ascending",
    name: "Melodic Minor Ascending",
    pattern: [0, 2, 3, 5, 7, 9, 11],
    positions: generateScalePositions(7),
  },
  [Scales.MelodicMinorDescending]: {
    id: "melodic-minor-descending",
    name: "Melodic Minor Descending",
    pattern: [0, 10, 8, 7, 5, 3, 2],
    positions: generateScalePositions(7),
  },
  [Scales.PentatonicMajor]: {
    id: "pentatonic-major",
    name: "Pentatonic Major",
    pattern: [0, 2, 4, 7, 9],
    positions: generateScalePositions(5),
  },
  [Scales.PentatonicMinor]: {
    id: "pentatonic-minor",
    name: "Pentatonic Minor",
    pattern: [0, 3, 5, 7, 10],
    positions: generateScalePositions(5),
  },
  [Scales.Persian]: {
    id: "persian",
    name: "Persian",
    pattern: [0, 1, 4, 5, 6, 8, 11],
    positions: generateScalePositions(7),
  },
  [Scales.Prometheus]: {
    id: "prometheus",
    name: "Prometheus",
    pattern: [0, 2, 4, 6, 9, 10],
    positions: generateScalePositions(6),
  },
  [Scales.SuperLocrian]: {
    id: "super-locrian",
    name: "Super Locrian",
    pattern: [0, 1, 3, 4, 6, 8, 10],
    positions: generateScalePositions(7),
  },
  [Scales.Tritone]: {
    id: "tritone",
    name: "Tritone",
    pattern: [0, 1, 4, 6, 7, 10],
    positions: generateScalePositions(6),
  },
  [Scales.WholeTone]: {
    id: "whole-tone",
    name: "Whole tone",
    pattern: [0, 2, 4, 6, 8, 10],
    positions: generateScalePositions(6),
  },
};
