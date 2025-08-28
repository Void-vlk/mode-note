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
  const isRightHanded = useInstrumentStore((s) => s.isRightHanded);

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

  /* Custom Note/Scale selection */

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
          ? `open-note ${isRightHanded ? "xl:mr-2.5 md:mr-1.75 mr-1.5 ml-4.5 md:ml-4 xl:ml-2.5" : "mr-1 ml-2"} `
          : "rounded-full note-styles",
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
