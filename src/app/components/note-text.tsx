'use client';

import { useOrientationStore } from '@/lib/stores/orientation-state';

type NoteTextProps = {
  displayedNote: string | undefined;
}

const NoteText = ({ displayedNote }: NoteTextProps) => {
  const isLandscape = useOrientationStore((state) => state.isLandscape);

  return (
    <div className={`flex items-center justify-center transition-transform duration-300 select-none ${isLandscape ? 'rotate-90' : 'rotate-0'}`}>
      {displayedNote}
    </div>
  );
};

export default NoteText;