'use client';

import ControlButton from '@/components/control-button';
import Tooltip from '@/components/tooltip';
import { noteNames } from '@/lib/data/note-data';
import { useInstrumentStore } from '@/lib/stores/instrument-state';
import { useNoteStore } from "@/lib/stores/note-state";
import { useNavStore } from "@/lib/stores/nav-state";

type ControlAllProps = {
  tunerStyle: "tunersMenu" | "tunersAll";
  className?: string;
  id: string;
}

const TuneAll = ({ tunerStyle, className, id }: ControlAllProps) => {
  const { stringNotes, setCurrentIndex } = useNoteStore();
  const { selectedInstrument } = useInstrumentStore();
  const { showTooltips } = useNavStore();

  const handleTuneDown = (steps: number) => {
    for (let i = 0; i < selectedInstrument.stringQty; i++) {
      const stringState = stringNotes[i] || { currentIndex: 0, openNoteId: 0 };
      const newIndex = (stringState.currentIndex - steps + noteNames.length) % noteNames.length;
      setCurrentIndex(i, newIndex);
    }
  };

  const handleTuneUp = (steps: number) => {
    for (let i = 0; i < selectedInstrument.stringQty; i++) {
      const stringState = stringNotes[i] || { currentIndex: 0, openNoteId: 0 };
      const newIndex = (stringState.currentIndex + steps) % noteNames.length;
      setCurrentIndex(i, newIndex);
    }
  };

  return (
    <div
      className={`flex flex-row gap-1 items-center justify-center" ${className}`}
      id={id}
    >
      <Tooltip
        content="Tune down 2 semitones/whole step"
        position="top"
        isEnabled={showTooltips}
      >
        <ControlButton onClick={() => handleTuneDown(2)} variant={tunerStyle}>
          <span className="text-4xl -mt-1">&laquo;</span>
        </ControlButton>
      </Tooltip>
      <Tooltip
        content="Tune down 1 semitone/half step"
        position="top"
        isEnabled={showTooltips}
      >
        <ControlButton onClick={() => handleTuneDown(1)} variant={tunerStyle}>
          <span className="text-4xl -mt-1">&lsaquo;</span>
        </ControlButton>
      </Tooltip>
      <Tooltip
        content="Tune up 1 semitone/half step"
        position="top"
        isEnabled={showTooltips}
      >
        <ControlButton onClick={() => handleTuneUp(1)} variant={tunerStyle}>
          <span className="text-4xl -mt-1">&rsaquo;</span>
        </ControlButton>
      </Tooltip>
      <Tooltip
        content="Tune up 2 semitones/whole step"
        position="top"
        isEnabled={showTooltips}
      >
        <ControlButton onClick={() => handleTuneUp(2)} variant={tunerStyle}>
          <span className="text-4xl -mt-1">&raquo;</span>
        </ControlButton>
      </Tooltip>
    </div>
  );
}

export default TuneAll;