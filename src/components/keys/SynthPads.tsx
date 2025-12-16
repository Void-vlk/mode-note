"use client";
import { type FC } from "react";

import Pad from "@/components/keys/Pad";
import { PADS } from "@/resources/keyboard-controls";

type Props = {
  pressedPads: Set<string>;
  onPointerDown: (code: string) => void;
  onPointerUp: (code: string) => void;
};

const SynthPads: FC<Props> = ({ pressedPads, onPointerDown, onPointerUp }) => {
  return (
    <div className="grid grid-cols-5 w-full gap-1.5 rounded-md bg-neutral-900 px-4 py-2 items-center">
      {PADS.map((pad) => (
        <Pad
          key={pad.id}
          code={pad.code}
          label={pad.label}
          pitchIndex={pad.pitchIndex}
          isPressed={pressedPads.has(pad.code)}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        />
      ))}
    </div>
  );
};

export default SynthPads;
