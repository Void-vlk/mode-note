"use client";
import type { FC } from "react";
import type { NoteDisplay } from "@/resources/types";
import { twJoin } from "tailwind-merge";
import { getIntervalName, getNoteName } from "@/hooks/getNoteValues";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { useThemeStore } from "@/hooks/useThemeStore";
import { NotePitch } from "@/resources/themes";

type Props = {
  notePitchValue: NotePitch;
  showDot: boolean;
  isTonic: boolean;
  isOpenNote: boolean;
  isPosition: boolean;
};

const buildNoteDisplay = (
  notePitchValue: NotePitch,
  noteDisplay: NoteDisplay,
  isSharp: boolean
) => {
  if (noteDisplay === "blank") return "";
  if (noteDisplay === "note") return getNoteName(notePitchValue, isSharp);
  if (noteDisplay === "interval")
    return getIntervalName(notePitchValue, isSharp);
  // note name values of note-pitches sharp or flat and naturals, intervals etc
  return getNoteName(notePitchValue, isSharp);
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
  const noteTheme = useThemeStore((s) => s.noteTheme);
  const fretboardTheme = useThemeStore((s) => s.fretboardTheme);
  const scalePosition = useInstrumentStore((s) => s.scalePosition);

  if (notePitchValue === 0 && showDot) {
    console.log("Note (C) render:", {
      notePitchValue,
      showDot,
      isPosition,
      scalePosition,
      isOpenNote,
    });
  }

  const noteName = buildNoteDisplay(notePitchValue, noteDisplay, isSharp);

  return (
    <div
      data-note={isOpenNote ? "open" : notePitchValue}
      className={twJoin(
        "transition-colors flex items-center justify-center relative",
        isOpenNote
          ? "open-note xl:mr-2.25 md:mr-1.75 mr-1.5"
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
            "select-none leading-none font-semibold",
            isOpenNote && "-rotate-45 text-sm lg:text-base xl:text-lg",
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
