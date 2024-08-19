"use client";

import { useEffect, useState } from "react";
import { useMetronomeStore } from "@/lib/stores/metronome-state";

interface MetronomeAudioProps {
  bpm: number;
  isPlaying: boolean;
  timeSignature: { beat: number; bar: number };
}

const MetronomeAudio = ({
  bpm,
  isPlaying,
  timeSignature,
}: MetronomeAudioProps) => {
  const { isClick } = useMetronomeStore();
  const [currentBeat, setCurrentBeat] = useState<number>(0);

  useEffect(() => {
    if (isPlaying) {
      // Calculate the interval based on BPM and whether quarter/eighth notes in bar
      const noteLength = timeSignature.bar === 4 ? 1 : 0.5;
      const intervalTime = (60 / bpm) * 1000 * noteLength;

      const firstBeatAudio = new Audio(
        isClick ? "/sounds/Synth_Block_A_hi.wav" : "/sounds/Perc_Metal_hi.wav"
      );
      const regularBeatAudio = new Audio(
        isClick ? "/sounds/Synth_Block_A_lo.wav" : "/sounds/Perc_Metal_lo.wav"
      );

      const timing = setInterval(() => {
        // Play the hi sound on the first beat, res play lo sound
        if (currentBeat === 0) {
          firstBeatAudio.play();
        } else {
          regularBeatAudio.play();
        }
        setCurrentBeat(
          (prevBeat: number) => (prevBeat + 1) % timeSignature.beat
        );
      }, intervalTime);

      return () => {
        clearInterval(timing);
      };
    } else {
      setCurrentBeat(0); // Reset when stopped
    }
  }, [bpm, isPlaying, timeSignature, isClick, currentBeat]);

  return null;
};

export default MetronomeAudio;
