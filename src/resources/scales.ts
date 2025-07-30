import type { Scale } from "@/resources/types"

export enum Scales {
  Chromatic = "chromatic",
  Ionian = "ionian",
  Dorian = "dorian",
  Phrygian = "phyrgian",
  Lydian = "lydian",
  Mixolydian = "mixolydian",
  Aeolian = "aeolian",
  Locrian = "locrian",
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
  },
  [Scales.Dorian]: {
    id: "dorian",
    name: "Dorian",
    pattern: [0, 2, 3, 5, 7, 9, 10],
  },
  [Scales.Phrygian]: {
    id: "phyrgian",
    name: "Phrygian",
    pattern: [0, 1, 3, 5, 7, 8, 10],
  },
  [Scales.Lydian]: {
    id: "lydian",
    name: "Lydian",
    pattern: [0, 2, 4, 6, 7, 9, 11],
  },
  [Scales.Mixolydian]: {
    id: "mixolydian",
    name: "Mixolydian",
    pattern: [0, 2, 4, 5, 7, 9, 10],
  },
  [Scales.Aeolian]: {
    id: "aeolian",
    name: "Aeolian",
    pattern: [0, 2, 3, 5, 7, 8, 10],
  },
  [Scales.Locrian]: {
    id: "locrian",
    name: "Locrian",
    pattern: [0, 1, 3, 5, 6, 8, 10],
  },
  [Scales.Algerian]: {
    id: "algerian",
    name: "Algerian",
    pattern: [0, 2, 3, 6, 7, 9, 11],
  },
  [Scales.Augmented]: {
    id: "augmented",
    name: "Augmented",
    pattern: [0, 3, 4, 7, 8, 11],
  },
  [Scales.BebopMajor]: {
    id: "bebop-major",
    name: "Bebop Major",
    pattern: [0, 2, 4, 5, 7, 8, 9, 11],
  },
  [Scales.Blues]: {
    id: "blues",
    name: "Blues",
    pattern: [0, 3, 5, 6, 7, 10],
  },
  [Scales.HalfDiminished]: {
    id: "half-diminished",
    name: "Half Diminished",
    pattern: [0, 2, 3, 5, 6, 8, 10],
  },
  [Scales.Gypsy]: {
    id: "gypsy",
    name: "Gypsy",
    pattern: [0, 2, 3, 6, 7, 8, 10],
  },
  [Scales.HarmonicMinor]: {
    id: "harmonic-minor",
    name: "Harmonic Minor",
    pattern: [0, 2, 3, 5, 7, 8, 11],
  },
  [Scales.Hirajoshi]: {
    id: "hirajoshi",
    name: "Hirajoshi",
    pattern: [0, 4, 6, 7, 11],
  },
  [Scales.HungarianMinor]: {
    id: "hungarian-minor",
    name: "Hungarian Minor",
    pattern: [0, 2, 3, 6, 7, 8, 11],
  },
  [Scales.Iwato]: {
    id: "iwato",
    name: "Iwato",
    pattern: [0, 1, 5, 6, 10],
  },
  [Scales.MelodicMinorAscending]: {
    id: "melodic-minor-ascending",
    name: "Melodic Minor Ascending",
    pattern: [0, 2, 3, 5, 7, 9, 11],
  },
  [Scales.MelodicMinorDescending]: {
    id: "melodic-minor-descending",
    name: "Melodic Minor Descending",
    pattern: [0, 10, 8, 7, 5, 3, 2],
  },
  [Scales.PentatonicMajor]: {
    id: "pentatonic-major",
    name: "Pentatonic Major",
    pattern: [0, 2, 4, 7, 9],
  },
  [Scales.PentatonicMinor]: {
    id: "pentatonic-minor",
    name: "Pentatonic Minor",
    pattern: [0, 3, 5, 7, 10],
  },
  [Scales.Persian]: {
    id: "persian",
    name: "Persian",
    pattern: [0, 1, 4, 5, 6, 8, 11],
  },
  [Scales.Prometheus]: {
    id: "prometheus",
    name: "Prometheus",
    pattern: [0, 2, 4, 6, 9, 10],
  },
  [Scales.SuperLocrian]: {
    id: "super-locrian",
    name: "Super Locrian",
    pattern: [0, 1, 3, 4, 6, 8, 10],
  },
  [Scales.Tritone]: {
    id: "tritone",
    name: "Tritone",
    pattern: [0, 1, 4, 6, 7, 10],
  },
  [Scales.WholeTone]: {
    id: "whole-tone",
    name: "Whole tone",
    pattern: [0, 2, 4, 6, 8, 10],
  },
};

// export const SCALES: Scale[] = [
//   {
//     id: "chromatic",
//     name: "Chromatic",
//     pattern: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
//   },
//   {
//     id: "ionian",
//     name: "Ionian",
//     pattern: [0, 2, 4, 5, 7, 9, 11],
//   },
//   {
//     id: "dorian",
//     name: "Dorian",
//     pattern: [0, 2, 3, 5, 7, 9, 10],
//   },
//   {
//     id: "phyrgian",
//     name: "Phrygian",
//     pattern: [0, 1, 3, 5, 7, 8, 10],
//   },
//   {
//     id: "lydian",
//     name: "Lydian",
//     pattern: [0, 2, 4, 6, 7, 9, 11],
//   },
//   {
//     id: "mixolydian",
//     name: "Mixolydian",
//     pattern: [0, 2, 4, 5, 7, 9, 10],
//   },
//   {
//     id: "aeolian",
//     name: "Aeolian",
//     pattern: [0, 2, 3, 5, 7, 8, 10],
//   },
//   {
//     id: "locrian",
//     name: "Locrian",
//     pattern: [0, 1, 3, 5, 6, 8, 10],
//   },
//   {
//     id: "algerian",
//     name: "Algerian",
//     pattern: [0, 2, 3, 6, 7, 9, 11],
//   },
//   {
//     id: "augmented",
//     name: "Augmented",
//     pattern: [0, 3, 4, 7, 8, 11],
//   },
//   {
//     id: "bebop-major",
//     name: "Bebop Major",
//     pattern: [0, 2, 4, 5, 7, 8, 9, 11],
//   },
//   {
//     id: "blues",
//     name: "Blues",
//     pattern: [0, 3, 5, 6, 7, 10],
//   },
//   {
//     id: "half-diminished",
//     name: "Half Diminished",
//     pattern: [0, 2, 3, 5, 6, 8, 10],
//   },
//   {
//     id: "gypsy",
//     name: "Gypsy",
//     pattern: [0, 2, 3, 6, 7, 8, 10],
//   },
//   {
//     id: "harmonic-minor",
//     name: "Harmonic Minor",
//     pattern: [0, 2, 3, 5, 7, 8, 11],
//   },
//   {
//     id: "hirajoshi",
//     name: "Hirajoshi",
//     pattern: [0, 4, 6, 7, 11],
//   },
//   {
//     id: "hungarian-minor",
//     name: "Hungarian Minor",
//     pattern: [0, 2, 3, 6, 7, 8, 11],
//   },
//   {
//     id: "iwato",
//     name: "Iwato",
//     pattern: [0, 1, 5, 6, 10],
//   },
//   {
//     id: "melodic-minor-ascending",
//     name: "Melodic Minor Ascending",
//     pattern: [0, 2, 3, 5, 7, 9, 11],
//   },
//   {
//     id: "melodic-minor-descending",
//     name: "Melodic Minor Descending",
//     pattern: [0, 10, 8, 7, 5, 3, 2],
//   },
//   {
//     id: "pentatonic-major",
//     name: "Pentatonic Major",
//     pattern: [0, 2, 4, 7, 9],
//   },
//   {
//     id: "pentatonic-minor",
//     name: "Pentatonic Minor",
//     pattern: [0, 3, 5, 7, 10],
//   },
//   {
//     id: "persian",
//     name: "Persian",
//     pattern: [0, 1, 4, 5, 6, 8, 11],
//   },
//   {
//     id: "prometheus",
//     name: "Prometheus",
//     pattern: [0, 2, 4, 6, 9, 10],
//   },
//   {
//     id: "super-locrian",
//     name: "Super Locrian",
//     pattern: [0, 1, 3, 4, 6, 8, 10],
//   },
//   {
//     id: "tritone",
//     name: "Tritone",
//     pattern: [0, 1, 4, 6, 7, 10],
//   },
//   {
//     id: "whole-tone",
//     name: "Whole tone",
//     pattern: [0, 2, 4, 6, 8, 10],
//   },
// ]
