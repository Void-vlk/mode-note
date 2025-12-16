"use client";
import { type FC } from "react";
import KeyNoteDisplay from "@/components/keys/KeyNoteDisplay";
import type { NotePitch } from "@/resources/themes";

export type PadProps = {
  code: string;
  label: string;
  pitchIndex: NotePitch;
  isPressed: boolean;
  onPointerDown: (code: string) => void;
  onPointerUp: (code: string) => void;
};

const Pad: FC<PadProps> = ({
  code,
  label,
  pitchIndex,
  isPressed,
  onPointerDown,
  onPointerUp,
}) => {
  return (
    <button
      data-pressed={isPressed}
      className="size-14 rounded-md cursor-pointer bg-neutral-800 text-neutral-200 transition active:scale-99 data-[pressed=true]:bg-neutral-700"
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
        isPad={true}
      />
    </button>
  );
};

export default Pad;
