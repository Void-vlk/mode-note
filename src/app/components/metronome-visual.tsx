"use client";

import { useEffect, useState } from "react";

interface MetronomeVisualProps {
  bpm: number;
  isPlaying: boolean;
  visualOn: boolean;
  timeSignature: { beat: number; bar: number };
}

const MetronomeVisual = ({
  bpm,
  isPlaying,
  visualOn,
  timeSignature,
}: MetronomeVisualProps) => {
  const [currentBeat, setCurrentBeat] = useState<number>(0);
  const [flashColour, setFlashColour] = useState<string>("bg-gray-500");

  useEffect(() => {
    if (visualOn && isPlaying) {
      // Calculate the interval based on BPM and whether quarter/eighth notes in bar
      const noteLength = timeSignature.bar === 4 ? 0.5 : 0.25;
      const intervalTime = (60 / bpm) * 1000 * noteLength;

      const timing = setInterval(() => {
        setCurrentBeat((prevBeat: number) => {
          const newBeat = prevBeat + 1;

          const isFirstBeat = Math.floor(prevBeat / 2) % timeSignature.beat;
          const isNote = newBeat % 2 === 0;

          if (isNote) {
            setFlashColour(isFirstBeat === 0 ? "bg-green-700" : "bg-gray-400");
          } else {
            setFlashColour("bg-gray-500");
          }

          return newBeat;
        });
      }, intervalTime);

      return () => clearInterval(timing);
    } else {
      setCurrentBeat(0); // Reset when stopped
      setFlashColour("bg-gray-500"); //flash off
    }
  }, [bpm, isPlaying, visualOn, timeSignature]);

  return (
    <div
      className={`w-6 h-6 rounded-full transition-colors duration-100 ease-in-out ${flashColour}`}
    />
  );
};

export default MetronomeVisual;
