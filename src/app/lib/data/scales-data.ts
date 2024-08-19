export interface ScalesDataProps {
  id: number;
  title: string;
  intervals: number[];
}

export const scalesData: readonly ScalesDataProps[] = [
  {
    id: 0,
    title: "Ionian",
    intervals: [0, 2, 4, 5, 7, 9, 11],
  },
  {
    id: 1,
    title: "Dorian",
    intervals: [0, 2, 3, 5, 7, 9, 10],
  },
  {
    id: 2,
    title: "Phrygian",
    intervals: [0, 1, 3, 5, 7, 8, 10],
  },
  {
    id: 3,
    title: "Lydian",
    intervals: [0, 2, 4, 6, 7, 9, 11],
  },
  {
    id: 4,
    title: "Mixolydian",
    intervals: [0, 2, 4, 5, 7, 9, 10],
  },
  {
    id: 5,
    title: "Aeolian",
    intervals: [0, 2, 3, 5, 7, 8, 10],
  },
  {
    id: 6,
    title: "Locrian",
    intervals: [0, 1, 3, 5, 6, 8, 10],
  },
  {
    id: 7,
    title: "Algerian",
    intervals: [0, 2, 3, 6, 7, 9, 11],
  },
  {
    id: 8,
    title: "Augmented",
    intervals: [0, 3, 4, 7, 8, 11],
  },
  {
    id: 9,
    title: "Bebop Major",
    intervals: [0, 2, 4, 5, 7, 8, 9, 11],
  },
  {
    id: 10,
    title: "Blues",
    intervals: [0, 3, 5, 6, 7, 10],
  },
  {
    id: 11,
    title: "Half Diminished",
    intervals: [0, 2, 3, 5, 6, 8, 10],
  },
  {
    id: 12,
    title: "Gypsy",
    intervals: [0, 2, 3, 6, 7, 8, 10],
  },
  {
    id: 13,
    title: "Harmonic Minor",
    intervals: [0, 2, 3, 5, 7, 8, 11],
  },
  {
    id: 14,
    title: "Hirajoshi",
    intervals: [0, 4, 6, 7, 11],
  },
  {
    id: 15,
    title: "Hungarian Minor",
    intervals: [0, 2, 3, 6, 7, 8, 11],
  },
  {
    id: 16,
    title: "Iwato",
    intervals: [0, 1, 5, 6, 10],
  },
  {
    id: 17,
    title: "Melodic Minor Ascending",
    intervals: [0, 2, 3, 5, 7, 9, 11],
  },
  {
    id: 18,
    title: "Melodic Minor Descending",
    intervals: [12, 10, 8, 7, 5, 3, 2],
  },
  {
    id: 19,
    title: "Pentatonic Major",
    intervals: [0, 2, 4, 7, 9],
  },
  {
    id: 20,
    title: "Pentatonic Minor",
    intervals: [0, 3, 5, 7, 10],
  },
  {
    id: 21,
    title: "Persian",
    intervals: [0, 1, 4, 5, 6, 8, 11],
  },
  {
    id: 22,
    title: "Prometheus",
    intervals: [0, 2, 4, 6, 9, 10],
  },
  {
    id: 23,
    title: "Super Locrian",
    intervals: [0, 1, 3, 4, 6, 8, 10],
  },
  {
    id: 24,
    title: "Tritone",
    intervals: [0, 1, 4, 6, 7, 10],
  },
  {
    id: 25,
    title: "Whole tone",
    intervals: [0, 2, 4, 6, 8, 10],
  },
  {
    id: 26,
    title: "Chromatic",
    intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
];