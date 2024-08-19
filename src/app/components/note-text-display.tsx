"use client";

import { useMemo } from "react";
import NoteText from "@/components/note-text";
import { useCombiStore } from "@/lib/stores/combi-store";

interface NoteTextDisplayProps {
  stringIndex: number;
}

const NoteTextDisplay = ({ stringIndex }: NoteTextDisplayProps) => {
  const {
    noteNames,
    showSharp,
    intervalNames,
    showIntervals,
    selectedTonic,
    selectedScale,
    stringNotes,
  } = useCombiStore();
  const stringState = stringNotes[stringIndex] || {
    currentIndex: 0,
    openNoteId: 0,
  };
  const { currentIndex, openNoteId } = stringState;

  const getIntervalIndex = useMemo(
    () =>
      (index: number): number | null => {
        if (!showIntervals || !selectedTonic) return null;
        const tonicIndex = selectedTonic.id;
        return (index - tonicIndex + 12) % 12;
      },
    [showIntervals, selectedTonic]
  );

  //note & interval text display
  const getDisplayedNote = (index: number): string | undefined => {
    const intervalIndex = getIntervalIndex(index);
    if (intervalIndex !== null) {
      return intervalNames[intervalIndex]?.name;
    } else {
      const currentNote = noteNames[index % noteNames.length];
      return typeof currentNote.name === "string"
        ? currentNote.name
        : showSharp
        ? currentNote.name.sharp
        : currentNote.name.flat;
    }
  };

  //background styling under text
  const getCellStyle = (noteId: number, offset: number): string => {
    const isFirst = offset === 0;
    const isSelectedTonic = selectedTonic && noteId === selectedTonic.id;
    const intervalIndex = getIntervalIndex(noteId);

    let baseStyle =
      "flex items-center justify-center w-8 h-8 text-white text-sm font-semibold ";

    // Apply the base styles depending on the conditions
    if (intervalIndex !== null && showIntervals) {
      const intervalColor = intervalNames[intervalIndex]?.color;
      baseStyle += ` ${intervalColor} rounded-full`;
    } else if (isSelectedTonic) {
      baseStyle += isFirst
        ? " bg-yellow-600 rounded-md"
        : " bg-yellow-600 rounded-full";
    } else {
      baseStyle += isFirst
        ? " bg-orange-500 rounded-md"
        : " bg-green-800 rounded-full";
    }
    // Apply margin-bottom if it's the first note
    if (isFirst) {
      baseStyle += " mb-[0.29rem]";
    }

    return baseStyle;
  };

  //for scales, show only the relevant notes
  const setScaleNotes = (index: number): string => {
    if (!selectedScale) return "opacity-100";
    const tonicIndex = selectedTonic ? selectedTonic.id : 0;
    const noteIndex = (index - tonicIndex + 12) % 12;
    return selectedScale.intervals.includes(noteIndex)
      ? "visible opacity-100"
      : "invisible opacity-0";
  };
  //move functions out of jsx
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {Array.from({ length: 25 }).map((_, offset) => {
        const index = (openNoteId + currentIndex + offset) % noteNames.length;
        const displayedNote = getDisplayedNote(index);
        const cellStyle = getCellStyle(noteNames[index].id, offset);
        const scaleNoteOpacity = setScaleNotes(noteNames[index].id);

        return (
          <div key={offset} className={`${cellStyle} ${scaleNoteOpacity}`}>
            {displayedNote ? <NoteText displayedNote={displayedNote} /> : null}
          </div>
        );
      })}
    </div>
  );
};

export default NoteTextDisplay;
