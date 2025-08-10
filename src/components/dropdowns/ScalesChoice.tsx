import { type FC } from "react";
import { twMerge } from "tailwind-merge";

import MenuSelectionList from "@/components/dropdowns/MenuSelectionList";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { Scales, SCALES } from "@/resources/scales";
import { NOTE_DISPLAY } from "@/resources/types";

type Props = {
  isInSetup?: boolean;
};

const ScalesChoice: FC<Props> = ({ isInSetup = false }) => {
  const scale = useInstrumentStore((s) => s.scale);
  const setScale = useInstrumentStore((s) => s.setScale);
  const noteDisplay = useInstrumentStore((s) => s.noteDisplay);
  const setNoteDisplay = useInstrumentStore((s) => s.setNoteDisplay);

  const scaleOptions = Object.entries(SCALES);
  const noteDisplayOptions = Object.entries(NOTE_DISPLAY);

  console.log("Current noteDisplay:", noteDisplay);

  return (
    <>
      <MenuSelectionList
        options={noteDisplayOptions.map(([key, option]) => ({
          value: key,
          label: option.label,
          checked: noteDisplay === option.value,
          onSelect: () => setNoteDisplay(option.value),
        }))}
        className={twMerge(isInSetup && "grid-cols-3")}
      />
      <MenuSelectionList
        options={scaleOptions.map(([key, option]) => ({
          value: key,
          label: option.name,
          checked: scale.scalePattern === (key as Scales),
          onSelect: () => setScale({ ...scale, scalePattern: key as Scales }),
        }))}
        className={twMerge(isInSetup && "grid-cols-3")}
      />
    </>
  );
};

export default ScalesChoice;
