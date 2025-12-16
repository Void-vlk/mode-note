"use client";
import { type FC } from "react";

import Keys from "@/components/keys/Keys";
import SynthPads from "@/components/keys/SynthPads";
import KeyboardControls from "@/components/keys/KeyboardControls";
import { getNoteName } from "@/hooks/getNoteValues";
import { useKeyboardInput } from "@/hooks/getUserInput";
import {
  KEYBOARD_KEYS,
  type KeyDefinition,
} from "@/resources/keyboard-controls";
import { useInstrumentStore } from "@/stores/useInstrumentStore";
import useKeysStore from "@/stores/useKeysStore";

const Keyboard: FC = () => {
  const isSharp = useInstrumentStore((s) => s.isSharp);
  const pressedKeys = useKeysStore((s) => s.pressedKeys);
  const pressedPads = useKeysStore((s) => s.pressedPads);
  const octaveShift = useKeysStore((s) => s.octaveShift);

  const {
    onPianoPointerDown,
    onPianoPointerUp,
    onPadPointerDown,
    onPadPointerUp,
  } = useKeyboardInput();

  const noteNowPlaying =
    Array.from(pressedKeys)
      .map((code): KeyDefinition | undefined =>
        KEYBOARD_KEYS.find((key) => key.code === code)
      )
      .filter((key): key is KeyDefinition => key !== undefined)
      .map((key) => {
        const noteName = getNoteName(key.pitchIndex, isSharp);
        return `${noteName}${key.octave + octaveShift}`;
      })
      .join(" · ") || " - ";

  return (
    <div className="mx-auto w-full max-w-[1200px] max-h-[70vh] p-4 overflow-x-auto custom-scrollbar">
      <div className="rounded-xl bg-neutral-700 p-4 min-w-[1040px]">
        <div className="mb-4 grid grid-cols-[1fr_auto] gap-4">
          <KeyboardControls noteNowPlaying={noteNowPlaying} />
          <SynthPads
            pressedPads={pressedPads}
            onPointerDown={onPadPointerDown}
            onPointerUp={onPadPointerUp}
          />
        </div>
        <Keys
          onPointerDown={onPianoPointerDown}
          onPointerUp={onPianoPointerUp}
        />
      </div>
    </div>
  );
};

export default Keyboard;
