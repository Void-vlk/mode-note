"use client";

import { useEffect } from 'react';
import { useOrientationStore } from "@/lib/stores/orientation-state";

type NoteTextProps = {
  displayedNote: string | undefined;
  className: string;
};

const NoteText = ({ displayedNote, className }: NoteTextProps) => {
  const { isLandscape, isOnMobile, detectScreen } = useOrientationStore(
    (state) => ({
      isLandscape: state.isLandscape,
      isOnMobile: state.isOnMobile,
      detectScreen: state.detectScreen,
    })
  );

  // Detect mobile screen size on component mount and when resized
  useEffect(() => {
    detectScreen();
    const handleResize = () => {
      detectScreen();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [detectScreen]);

  const rotation = isLandscape || isOnMobile ? "rotate-90" : "rotate-0";

  return (
    <div
      className={`flex items-center justify-center transition-transform duration-300 select-none ${rotation} ${className}`}
    >
      {displayedNote}
    </div>
  );
};

export default NoteText;
