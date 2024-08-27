"use client";

import ControlButton from "@/components/control-button";
import { noteNames } from "@/lib/data/note-data";
import { useNoteStore } from "@/lib/stores/note-state";

interface TuneStringProps {
  stringIndex: number;
}

const TuneString = ({ stringIndex }: TuneStringProps) => {
  const { stringNotes, setCurrentIndex } = useNoteStore();
  const stringState = stringNotes[stringIndex] || {
    currentIndex: 0,
    openNoteid: 0,
  };

  const handleTuneDown = (steps: number) => {
    const newIndex =
      (stringState.currentIndex - steps + noteNames.length) % noteNames.length;
    setCurrentIndex(stringIndex, newIndex);
  };

  const handleTuneUp = (steps: number) => {
    const newIndex = (stringState.currentIndex + steps) % noteNames.length;
    setCurrentIndex(stringIndex, newIndex);
  };

  return (
    <div className="flex flex-col gap-0.5 items-center justify-center p-0.5 mb-1">
      <div className="flex gap-0.5">
        <ControlButton onClick={() => handleTuneDown(2)} variant="tuners">
          <span className="text-[1.5rem]">&laquo;</span>
        </ControlButton>
        <ControlButton onClick={() => handleTuneUp(2)} variant="tuners">
          <span className="text-[1.5rem]">&raquo;</span>
        </ControlButton>
      </div>
      <div className="flex gap-0.5">
        <ControlButton onClick={() => handleTuneDown(1)} variant="tuners">
          <span className="text-[1.5rem]">&lsaquo;</span>
        </ControlButton>
        <ControlButton onClick={() => handleTuneUp(1)} variant="tuners">
          <span className="text-[1.5rem]">&rsaquo;</span>
        </ControlButton>
      </div>
    </div>
  );
};

export default TuneString;
