"use client";
import { type FC } from "react";
import useKeysStore from "@/stores/useKeysStore";

const OctaveRange: FC = () => {
  const octaveShift = useKeysStore((s) => s.octaveShift);
  const shiftOctaveUp = useKeysStore((s) => s.shiftOctaveUp);
  const shiftOctaveDown = useKeysStore((s) => s.shiftOctaveDown);

  const baseOctave = 2;
  const lowOctave = baseOctave + octaveShift;
  const highOctave = baseOctave + 4 + octaveShift;

  return (
    <div className="flex items-center justify-between gap-2 px-1 mt-1">
      <p className="flex-1 text-sm font-medium text-white/60">Octave Range:</p>
      <p className="flex-1 text-sm font-medium text-white/70">
        C{lowOctave} - C{highOctave}
      </p>
      <button
        onClick={shiftOctaveDown}
        disabled={octaveShift === -2}
        className="cursor-pointer px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 transition-colors"
        aria-label="Shift octave down"
      >
        ←
      </button>

      <button
        onClick={shiftOctaveUp}
        disabled={octaveShift === 2}
        className="cursor-pointer px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 transition-colors"
        aria-label="Shift octave up"
      >
        →
      </button>
    </div>
  );
};

export default OctaveRange;
