"use client";

import { useEffect } from "react";
import { tuningData } from "@/lib/data/tuning-data";
import { useTuningStore } from "@/lib/stores/tuning-state";
import { useNoteStore } from "@/lib/stores/note-state";
import { useInstrumentStore } from "@/lib/stores/instrument-state";

const CurrentTuning = () => {
  const { selectedTuning, setSelectedTuning } = useTuningStore();
  const { showSharp, noteNames, stringNotes } = useNoteStore();
  const { selectedInstrument } = useInstrumentStore();

  useEffect(() => {
    const defaultTuning = tuningData.find(
      (tuning) => tuning.instrumentTitle === selectedInstrument.title
    );
    if (defaultTuning) {
      setSelectedTuning(defaultTuning.id);
    }
  }, [selectedInstrument, setSelectedTuning]);

  const getNoteName = (openNoteId: number, currentIndex: number) => {
    const currentNoteId = (openNoteId + currentIndex) % noteNames.length;
    const note = noteNames.find((note) => note.id === currentNoteId);
    if (note) {
      return typeof note.name === "string"
        ? note.name
        : showSharp
        ? note.name.sharp
        : note.name.flat;
    }
    return "";
  };

  const noteNameList = selectedTuning.stringTunings
    .map((_, index) => {
      const tuningState = stringNotes[index] || {
        currentIndex: 0,
        openNoteId: selectedTuning.stringTunings[index].openNote,
      };
      return getNoteName(tuningState.openNoteId, tuningState.currentIndex);
    })
    .join("-");

  return (
    <div className="flex flex-col mb-0 px-2 w-56">
      <span className="text-sm text-gray-400 select-none">Current Tuning:</span>
      <span className="tracking-normal">{noteNameList}</span>
      <div className="bg-gray-400 h-0.5 w-full"></div>
    </div>
  );
};
export default CurrentTuning;
