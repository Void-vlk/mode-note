'use client';

import { useEffect } from 'react';
import NoteTextDisplay from '@/components/note-text-display';
import TuneString from '@/app/components/tune-string';
import { useCombiStore } from '@/lib/stores/combi-store';

interface FretboardStringItemsProps {
  stringIndex: number;
}

const FretboardStringItems = ({ stringIndex }: FretboardStringItemsProps) => {
  const { setOpenNote, selectedInstrument } = useCombiStore();

  useEffect(() => {
    const tuning = selectedInstrument.stringTunings[stringIndex];
    if (tuning) {
      setOpenNote(stringIndex, tuning.openNote);
    }
  }, [stringIndex, selectedInstrument, setOpenNote]);

  return (
    <div className="flex flex-col items-center justify-center">
      <TuneString stringIndex={stringIndex} />
      <NoteTextDisplay stringIndex={stringIndex} />
    </div>  
  );
}

export default FretboardStringItems;