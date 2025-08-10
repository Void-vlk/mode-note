"use client";
import { type FC } from "react";
import { twJoin } from "tailwind-merge";

import { buildNoteDisplay } from "@/hooks/getNoteValues";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { useThemeStore } from "@/hooks/useThemeStore";
import { type NotePitch } from "@/resources/themes";

type Props = {
  notePitchValue: NotePitch;
  showDot: boolean;
  isTonic: boolean;
  isOpenNote: boolean;
  isPosition: boolean;
};

const Note: FC<Props> = ({
  notePitchValue,
  showDot,
  isOpenNote,
  isTonic,
  isPosition,
}) => {
  const isSharp = useInstrumentStore((s) => s.isSharp);
  const noteDisplay = useInstrumentStore((s) => s.noteDisplay);
  const scale = useInstrumentStore((s) => s.scale);
  const noteTheme = useThemeStore((s) => s.noteTheme);
  const fretboardTheme = useThemeStore((s) => s.fretboardTheme);
  const isRightHanded = useInstrumentStore((s) => s.isRightHanded);

  const noteName = buildNoteDisplay(
    notePitchValue,
    noteDisplay,
    isSharp,
    scale.scalePattern,
    scale.tonicNote!
  );

  return (
    <div
      data-note={isOpenNote ? "open" : notePitchValue}
      className={twJoin(
        "transition-colors flex items-center justify-center relative",
        isOpenNote
          ? `open-note ${isRightHanded ? "xl:mr-2.25 md:mr-1.75 mr-1.5 ml-4.25 md:ml-4 xl:ml-2.5" : "mr-1 ml-2"} `
          : "rounded-full note-styles",
        isTonic ? "bg-(--tonic-colour)" : "bg-(--note-colour)",
        fretboardTheme === "pale" &&
          noteTheme === "white" &&
          "outline outline-black",
        fretboardTheme === "ebony" &&
          noteTheme === "black" &&
          "outline outline-white",
        !showDot && "invisible",
        showDot && !isPosition && "!opacity-40",
        showDot && isPosition && "opacity-100"
      )}
    >
      {noteName && (
        <p
          className={twJoin(
            "select-none font-semibold text-center",
            isOpenNote && "-rotate-45",
            noteTheme === "yellow" || noteTheme === "white"
              ? "text-black"
              : "text-white",
            noteTheme === "yellow" && isTonic && "text-white"
          )}
        >
          {noteName}
        </p>
      )}
    </div>
  );
};

export default Note;
