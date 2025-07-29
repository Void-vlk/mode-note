import { INTERVALS, NOTE_PITCHES } from "@/resources/note-pitches";
import { NotePitch, NoteVariant } from "@/resources/types";

// handle sharps/flats for NoteName
export const getNoteName = (
  notePitchValue: NotePitch,
  isSharp: boolean
): string => {
  const { natural, sharp, flat } = NOTE_PITCHES[notePitchValue];
  return isSharp
    ? (sharp ?? natural ?? flat ?? "")
    : (flat ?? natural ?? sharp ?? "");
};

// handle sharps/flats for IntervalName
export const getIntervalName = (
  notePitchValue: NotePitch,
  isSharp: boolean
): string => {
  const { natural, sharp, flat } = INTERVALS[notePitchValue];
  return isSharp
    ? (sharp ?? natural ?? flat ?? "")
    : (flat ?? natural ?? sharp ?? "");
};

export const getNoteDisplay = (
  notePitches: Record<NotePitch, NoteVariant>,
  isSharp: boolean
): { pitch: NotePitch; name: string }[] =>
  Object.entries(notePitches).map(([pitch]) => {
    const noteValue = parseInt(pitch, 10) as NotePitch;
    const { natural, sharp, flat } = notePitches[noteValue];
    const name = isSharp
      ? (sharp ?? natural ?? flat ?? "")
      : (flat ?? natural ?? sharp ?? "");
    return {
      pitch: noteValue,
      name,
    };
  });

export const getTonicNotes = (isSharp: boolean) =>
  getNoteDisplay(NOTE_PITCHES, isSharp);

export const getIntervalNames = (isSharp: boolean) =>
  getNoteDisplay(INTERVALS, isSharp);

// Get all tonic notes
// export const getTonicNotes = (
//   isSharp: boolean
// ): { pitch: NotePitch; name: string }[] =>
//   Object.entries(NOTE_PITCHES).map(([pitch]) => {
//     const pitchValue = parseInt(pitch, 10) as NotePitch;
//     return {
//       pitch: pitchValue,
//       name: getNoteName(pitchValue, isSharp),
//     };
//   });
