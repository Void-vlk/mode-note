"use client";

import { noteNames } from "@/lib/data/note-data";
import { useNoteStore } from "@/lib/stores/note-state";
import { useNavStore } from "@/lib/stores/nav-state";

import ControlButton from "@/components/control-button";
import Tooltip from "@/components/tooltip";

interface TuneStringProps {
  stringIndex: number;
}

const TuneString = ({ stringIndex }: TuneStringProps) => {
  const { stringNotes, setCurrentIndex } = useNoteStore();
  const { showTooltips, setShowTooltips } = useNavStore();
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
        <Tooltip
          content="Tune down 2 semitones/whole step"
          position="left"
          isEnabled={showTooltips}
        >
          <ControlButton onClick={() => handleTuneDown(2)} variant="tuners">
            <span className="text-[1.5rem]">&laquo;</span>
          </ControlButton>
        </Tooltip>
        <Tooltip
          content="Tune up 2 semitones/whole step"
          position="left"
          isEnabled={showTooltips}
        >
          <ControlButton onClick={() => handleTuneUp(2)} variant="tuners">
            <span className="text-[1.5rem]">&raquo;</span>
          </ControlButton>
        </Tooltip>
      </div>
      <div className="flex gap-0.5">
        <Tooltip
          content="Tune down 1 semitone/half step"
          position="left"
          isEnabled={showTooltips}
        >
          <ControlButton onClick={() => handleTuneDown(1)} variant="tuners">
            <span className="text-[1.5rem]">&lsaquo;</span>
          </ControlButton>
        </Tooltip>
        <Tooltip
          content="Tune up 1 semitone/half step"
          position="left"
          isEnabled={showTooltips}
        >
          <ControlButton onClick={() => handleTuneUp(1)} variant="tuners">
            <span className="text-[1.5rem]">&rsaquo;</span>
          </ControlButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default TuneString;
