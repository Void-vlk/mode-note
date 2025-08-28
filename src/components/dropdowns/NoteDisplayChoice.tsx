"use client";
import { type FC } from "react";
import { twMerge } from "tailwind-merge";

import MenuSelectionList from "@/components/dropdowns/MenuSelectionList";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { NOTE_DISPLAY } from "@/resources/types";

type Props = {
  isInSetup?: boolean;
};

const NoteDisplayChoice: FC<Props> = ({ isInSetup }) => {
  const noteDisplay = useInstrumentStore((s) => s.noteDisplay);
  const setNoteDisplay = useInstrumentStore((s) => s.setNoteDisplay);

  const noteDisplayOptions = Object.entries(NOTE_DISPLAY);
  
  return (
    <MenuSelectionList
      options={noteDisplayOptions.map(([key, option]) => ({
        value: key,
        label: option.label,
        checked: noteDisplay === option.value,
        onSelect: () => setNoteDisplay(option.value),
      }))}
      className={twMerge(isInSetup && "grid-cols-3")}
    />
  );
};

export default NoteDisplayChoice;
