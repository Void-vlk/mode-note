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
  stringIndex: number;
  fretNumber: number;
};

const Note: FC<Props> = ({
  notePitchValue,
  showDot,
  isOpenNote,
  isTonic,
  isPosition,
  stringIndex,
  fretNumber,
}) => {
  const isSharp = useInstrumentStore((s) => s.isSharp);
  const noteDisplay = useInstrumentStore((s) => s.noteDisplay);
  const scale = useInstrumentStore((s) => s.scale);
  const noteTheme = useThemeStore((s) => s.noteTheme);
  const fretboardTheme = useThemeStore((s) => s.fretboardTheme);

  const customSelectionMode = useThemeStore((s) => s.customSelectionMode);
  const singleNoteSelectionMode = useThemeStore(
    (s) => s.singleNoteSelectionMode
  );
  const customScaleIndividual = useInstrumentStore(
    (s) => s.customScaleIndividual
  );
  const setCustomScaleIndividual = useInstrumentStore(
    (s) => s.setCustomScaleIndividual
  );
  const customScaleAll = useInstrumentStore((s) => s.customScaleAll);
  const setCustomScaleAll = useInstrumentStore((s) => s.setCustomScaleAll);

  const noteName = buildNoteDisplay(
    notePitchValue,
    noteDisplay,
    isSharp,
    scale.scalePattern,
    scale.tonicNote!
  );

  // check if note is in custom scale, either by individual position or by pitch value
  const isInCustomScale = singleNoteSelectionMode
    ? customScaleIndividual.some(
        (note) =>
          note.stringIndex === stringIndex && note.fretNumber === fretNumber
      )
    : customScaleAll.includes(notePitchValue);

  // handle adding/removing note from custom scale, either individual pattern, or all notes of same note-pitch
  const handleCustomNoteSelection = () => {
    if (!customSelectionMode) return;
    if (singleNoteSelectionMode) {
      if (isInCustomScale) {
        setCustomScaleIndividual(
          customScaleIndividual.filter(
            (note) =>
              !(
                note.stringIndex === stringIndex &&
                note.fretNumber === fretNumber
              )
          )
        );
      } else {
        setCustomScaleIndividual([
          ...customScaleIndividual,
          { stringIndex, fretNumber },
        ]);
      }
    } else {
      if (isInCustomScale) {
        const index = customScaleAll.findIndex((n) => n === notePitchValue);
        setCustomScaleAll(customScaleAll.filter((_, i) => i !== index));
      } else {
        setCustomScaleAll([...customScaleAll, notePitchValue]);
      }
    }
  };

  return (
    <div
      data-note={isOpenNote ? "open" : notePitchValue}
      onClick={customSelectionMode ? handleCustomNoteSelection : undefined}
      className={twJoin(
        "transition-colors flex items-center justify-center relative duration-200",
        isOpenNote
          ? "rounded-xs rotate-45 size-5.5 xl:size-6 2xl:size-7 3xl:size-8 4xl:size-10 5xl:size-11.5"
          : "rounded-full size-7 md:size-8 xl:size-9 2xl:size-10 3xl:size-12 4xl:size-15 5xl:size-18",
        // Custom selection mode: use normal color if selected, if unselected use grey
        customSelectionMode
          ? [
              "cursor-pointer",
              isInCustomScale
                ? isTonic
                  ? "bg-(--tonic-colour) outline"
                  : "bg-(--note-colour) outline"
                : "bg-grey-light/50",
            ]
          : isTonic
            ? "bg-(--tonic-colour)"
            : "bg-(--note-colour)",
        fretboardTheme === "pale" &&
          noteTheme === "white" &&
          "outline outline-black",
        fretboardTheme === "ebony" &&
          noteTheme === "black" &&
          "outline outline-white",
        !customSelectionMode && [
          !showDot && "invisible",
          showDot && !isPosition && "!opacity-40",
          showDot && isPosition && "opacity-100",
        ]
      )}
    >
      {noteName && (
        <p
          className={twJoin(
            "select-none font-semibold text-center text-base xl:text-lg 2xl:text-xl 4xl:text-3xl 5xl:text-4xl",
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
