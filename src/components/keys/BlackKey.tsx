"use client";
import { type FC } from "react";
import { twJoin } from "tailwind-merge";

import useKeysStore from "@/stores/useKeysStore";
import KeyNoteDisplay from "@/components/keys/KeyNoteDisplay";
import type { NotePitch } from "@/resources/themes";

type Props = {
  code: string;
  label: string;
  pitchIndex: NotePitch;
  gridColumnStart: number;
  onPointerDown: (code: string) => void;
  onPointerUp: (code: string) => void;
};

const BlackKey: FC<Props> = ({
  code,
  label,
  pitchIndex,
  gridColumnStart,
  onPointerDown,
  onPointerUp,
}) => {
  const pressedKeys = useKeysStore((s) => s.pressedKeys);
  const isPressed = pressedKeys.has(code);

  return (
    <button
      aria-label={`Key ${label}`}
      data-key
      className={twJoin(
        "h-42 cursor-pointer bg-neutral-900 hover:bg-black rounded-b-md text-white pointer-events-auto col-span-2 outline-none focus-visible:outline-none transition-all duration-100 ease-out origin-top opacity-0",
        isPressed && "scale-y-101"
      )}
      style={{ gridColumnStart }}
      onPointerDown={(event) => {
        (event.currentTarget as HTMLElement).setPointerCapture?.(
          event.pointerId
        );
        onPointerDown(code);
      }}
      onPointerUp={() => onPointerUp(code)}
      onPointerCancel={() => onPointerUp(code)}
      onPointerLeave={(event) => {
        if (event.buttons === 1) onPointerUp(code);
      }}
    >
      <KeyNoteDisplay
        label={label}
        pitchIndex={pitchIndex}
        isPressed={isPressed}
        isBlack
      />
    </button>
  );
};

export default BlackKey;
