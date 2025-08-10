import { NOTE_PITCHES } from "@/resources/note-pitches";
import { Scales, SCALES } from "@/resources/scales";
import type { NotePitch } from "@/resources/themes";
import type { NoteDisplay } from "@/resources/types";

// handle sharps/flats for NoteName
export const getNoteName = (
  notePitchValue: NotePitch | null,
  isSharp: boolean
): string => {
  const { natural, sharp, flat } = NOTE_PITCHES[notePitchValue!];
  return isSharp
    ? (sharp ?? natural ?? flat ?? "")
    : (flat ?? natural ?? sharp ?? "");
};

// handle interval text for scales
export const getIntervalName = (
  notePitchValue: NotePitch,
  scalePattern: Scales,
  tonicNote: NotePitch
): string => {
  const scale = SCALES[scalePattern];
  const tonic: NotePitch = tonicNote ?? 0;
  const relativeNotePosition: NotePitch = ((notePitchValue - tonic + 12) %
    12) as NotePitch;
  const relativeNoteIndex: number = scale.pattern.indexOf(relativeNotePosition);

  return relativeNoteIndex !== -1 ? scale.intervals[relativeNoteIndex] : "";
};

// decide on text display of note
export const buildNoteDisplay = (
  notePitchValue: NotePitch,
  noteDisplay: NoteDisplay,
  isSharp: boolean,
  scalePattern: Scales,
  tonicNote: NotePitch
): string => {
  if (noteDisplay === "blank") return "";
  if (noteDisplay === "note") return getNoteName(notePitchValue, isSharp);
  if (noteDisplay === "interval")
    return getIntervalName(notePitchValue, scalePattern, tonicNote ?? 0);
  // note name values of note-pitches sharp or flat and naturals, intervals etc
  return getNoteName(notePitchValue, isSharp);
};

// get tonic notes for note display
export const getTonicNotes = (
  isSharp: boolean
): { pitch: NotePitch; name: string }[] =>
  Object.entries(NOTE_PITCHES).map(([pitch, noteVariant]) => {
    const noteValue = parseInt(pitch, 10) as NotePitch;
    const { natural, sharp, flat } = noteVariant;
    const name = isSharp
      ? (sharp ?? natural ?? flat ?? "")
      : (flat ?? natural ?? sharp ?? "");
    return {
      pitch: noteValue,
      name,
    };
  });
