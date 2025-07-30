"use client";
import { type FC } from "react";
import { twJoin, twMerge } from "tailwind-merge";

import MenuSelectionList from "@/components/dropdowns/MenuSelectionList";
import Switch from "@/components/settings/Switch";
import { getTonicNotes } from "@/hooks/getNoteValues";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { NotePitch } from "@/resources/themes";

type Props = { isInSetup?: boolean };

const TonicChoice: FC<Props> = ({ isInSetup = false }) => {
  const scale = useInstrumentStore((s) => s.scale);
  const setScale = useInstrumentStore((s) => s.setScale);
  const isSharp = useInstrumentStore((s) => s.isSharp);
  const setIsSharp = useInstrumentStore((s) => s.setIsSharp);

  const toggleSharpFlat = () => {
    setIsSharp(!isSharp);
  };

  const handleTonicSelect = (pitch: number) => {
    const newTonicNote =
      scale.tonicNote === pitch ? null : (pitch as NotePitch);
    setScale({ ...scale, tonicNote: newTonicNote });
  };

  return (
    <>
      <Switch
        isChecked={isSharp}
        onChange={toggleSharpFlat}
        iconLeft="♭"
        iconRight="♯"
        className={twMerge(isInSetup ? "mx-auto mb-2" : "ml-3 mt-px")}
      />
      <MenuSelectionList
        canDeselect={true}
        options={getTonicNotes(isSharp).map(({ pitch, name }) => ({
          value: pitch,
          label: name,
          checked: scale.tonicNote === pitch,
          onSelect: () => handleTonicSelect(pitch),
        }))}
        className={twJoin(isInSetup && "grid-cols-4 -mt-3")}
      />
    </>
  );
};

export default TonicChoice;
