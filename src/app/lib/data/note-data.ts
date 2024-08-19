export interface NoteNameTextProps {
  id: number;
  name: string | { sharp: string; flat: string };
  opacity?: number;
}

export const noteNames: readonly NoteNameTextProps[] = [
  { id: 0, name: "C" },
  { id: 1, name: { sharp: "C#", flat: "Db" } },
  { id: 2, name: "D" },
  { id: 3, name: { sharp: "D#", flat: "Eb" } },
  { id: 4, name: "E" },
  { id: 5, name: "F" },
  { id: 6, name: { sharp: "F#", flat: "Gb" } },
  { id: 7, name: "G" },
  { id: 8, name: { sharp: "G#", flat: "Ab" } },
  { id: 9, name: "A" },
  { id: 10, name: { sharp: "A#", flat: "Bb" } },
  { id: 11, name: "B" },
];

export type IntervalProps = {
  id: number;
  name: string;
  color: string;
}

export const intervalNames: readonly IntervalProps[] = [
  { id: 0, name: 'I', color: 'bg-yellow-600' },
  { id: 1, name: 'ii', color: 'bg-lime-500' },
  { id: 2, name: 'II', color: 'bg-green-500' },
  { id: 3, name: 'iii', color: 'bg-orange-500' },
  { id: 4, name: 'III', color: 'bg-red-500' },
  { id: 5, name: 'iv', color: 'bg-fuchsia-500' },
  { id: 6, name: 'IV', color: 'bg-violet-500' },
  { id: 7, name: 'V', color: 'bg-indigo-600' },
  { id: 8, name: 'vi', color:'bg-cyan-500' },
  { id: 9, name: 'VI', color: 'bg-blue-500' },
  { id: 10, name: 'vii', color: 'bg-amber-500' },
  { id: 11, name: 'VII', color: 'bg-yellow-400' },
];