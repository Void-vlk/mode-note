"use client";
import { type FC } from "react";
import KeyNote from "@/components/keys/KeyNote";
import type { NotePitch } from "@/resources/themes";
import { twJoin } from "tailwind-merge";

type Props = {
  label: string;
  pitchIndex: NotePitch;
  isPressed: boolean;
  isBlack?: boolean;
  isPad?: boolean;
};

const KeyNoteDisplay: FC<Props> = ({
  label,
  pitchIndex,
  isPressed,
  isBlack = false,
  isPad = false,
}) => {
  return (
    <div
      className={twJoin(
        "flex size-full flex-col items-center gap-1",
        isPad ? "justify-center" : "justify-end pb-1"
      )}
    >
      <p className="text-xs text-neutral-400">{label}</p>
      <KeyNote
        notePitchValue={pitchIndex}
        isPressed={isPressed}
        isBlack={isBlack}
        isPad={isPad}
      />
    </div>
  );
};

export default KeyNoteDisplay;
