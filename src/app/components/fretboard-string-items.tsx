"use client";

import { useEffect } from "react";

import NoteTextDisplay from "@/components/note-text-display";
import TuneString from "@/app/components/tune-string";

import { useNoteStore } from "@/lib/stores/note-state";
import { useTuningStore } from "@/lib/stores/tuning-state";

interface FretboardStringItemsProps {
  stringIndex: number;
}

const FretboardStringItems = ({ stringIndex }: FretboardStringItemsProps) => {
  const { setOpenNote } = useNoteStore();
  const { selectedTuning } = useTuningStore();

  useEffect(() => {
    const tuning = selectedTuning.stringTunings[stringIndex];
    if (tuning) {
      setOpenNote(stringIndex, tuning.openNote);
    }
  }, [stringIndex, selectedTuning, setOpenNote]);

  return (
    <div className="flex flex-col items-center justify-center">
      <TuneString stringIndex={stringIndex} />
      <NoteTextDisplay stringIndex={stringIndex} />
    </div>
  );
};

export default FretboardStringItems;
