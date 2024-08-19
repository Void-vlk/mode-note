'use client';

import ControlButton from '@/components/control-button';
import { noteNames } from '@/lib/data/note-data';
import { useCombiStore } from '@/lib/stores/combi-store';

type ControlAllProps = {
  tunerStyle: "tunersMenu" | "tunersAll";
  className?: string;
  id: string;
}

const TuneAll = ({ tunerStyle, className, id }: ControlAllProps) => {
  const { stringNotes, setCurrentIndex, selectedInstrument } = useCombiStore();

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
      <ControlButton onClick={() => handleTuneDown(2)} variant={tunerStyle}>
        <span className="text-4xl -mt-1">&laquo;</span>
      </ControlButton>
      <ControlButton onClick={() => handleTuneDown(1)} variant={tunerStyle}>
        <span className="text-4xl -mt-1">&lsaquo;</span>
      </ControlButton>
      <ControlButton onClick={() => handleTuneUp(1)} variant={tunerStyle}>
        <span className="text-4xl -mt-1">&rsaquo;</span>
      </ControlButton>
      <ControlButton onClick={() => handleTuneUp(2)} variant={tunerStyle}>
        <span className="text-4xl -mt-1">&raquo;</span>
      </ControlButton>
    </div>
  );
}

export default TuneAll;