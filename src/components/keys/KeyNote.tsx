"use client";
import { type FC } from "react";
import { twJoin } from "tailwind-merge";

import { buildNoteDisplay } from "@/hooks/getNoteValues";
import { useInstrumentStore } from "@/stores/useInstrumentStore";
import { useThemeStore } from "@/stores/useThemeStore";
import { type NotePitch } from "@/resources/themes";
import { SCALES, Scales } from "@/resources/scales";

type Props = {
  notePitchValue: NotePitch;
  isPressed: boolean;
  isBlack?: boolean;
  isPad?: boolean;
};

const KeyNote: FC<Props> = ({
  notePitchValue,
  isPressed,
  isBlack = false,
  isPad = false,
}) => {
  const isSharp = useInstrumentStore((s) => s.isSharp);
  const noteDisplay = useInstrumentStore((s) => s.noteDisplay);
  const scale = useInstrumentStore((s) => s.scale);
  const noteTheme = useThemeStore((s) => s.noteTheme);

  const noteName =
    scale.tonicNote != null
      ? buildNoteDisplay(
          notePitchValue,
          noteDisplay,
          isSharp,
          scale.scalePattern,
          scale.tonicNote
        )
      : "";

  const scalePattern = SCALES[scale.scalePattern as Scales];
  const hasScale = scalePattern && scale.tonicNote != null;
  const tonicNote = scale.tonicNote;

  let isInScale = false;
  let isTonic = false;

  if (hasScale) {
    const scaleNotes = new Set(
      scalePattern.pattern.map((interval) => (interval + tonicNote!) % 12)
    );
    isInScale = scaleNotes.has(notePitchValue);
    isTonic = notePitchValue === tonicNote;
  }

  const hasScaleSelected = scale.tonicNote != null;

  return (
    <div
      className={twJoin(
        "rounded-full flex items-center justify-center size-7 min-h-7 min-w-7 transition-all duration-200",
        isInScale
          ? isTonic
            ? "bg-(--tonic-colour)"
            : "bg-(--note-colour)"
          : isPad
            ? "bg-transparent"
            : isBlack
              ? "bg-black"
              : "bg-neutral-200",
        hasScaleSelected && !isInScale && "opacity-0",
        isPressed && "scale-102 bg-(--note-colour)!"
      )}
    >
      {noteName && (
        <p
          className={twJoin(
            "select-none font-semibold text-center text-sm",
            isInScale
              ? noteTheme === "yellow" || noteTheme === "white"
                ? isTonic && noteTheme === "yellow"
                  ? "text-white"
                  : "text-black"
                : "text-white"
              : isBlack
                ? "text-neutral-400"
                : "text-neutral-600"
          )}
        >
          {noteName}
        </p>
      )}
    </div>
  );
};

export default KeyNote;
