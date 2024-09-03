"use client";

import { useOrientationStore } from "@/lib/stores/orientation-state";

type NoteTextProps = {
  displayedNote: string | undefined;
  className: string;
};

const NoteText = ({ displayedNote, className }: NoteTextProps) => {
  const isLandscape = useOrientationStore((state) => state.isLandscape);

  return (
    <div
      className={`flex items-center justify-center transition-transform duration-300 select-none ${
        isLandscape ? "rotate-90" : "rotate-0"
      } ${className}`}
    >
      {displayedNote}
    </div>
  );
};

export default NoteText;
