import { type FC } from "react";
import MenuSelectionList from "@/components/dropdowns/MenuSelectionList";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { SCALES } from "@/resources/scales";
import { twMerge } from "tailwind-merge";

type Props = {
  isInSetup?: boolean;
};

const ScalesChoice: FC<Props> = ({ isInSetup = false }) => {
  const scale = useInstrumentStore((s) => s.scale);
  const setScale = useInstrumentStore((s) => s.setScale);

  const scaleOptions = Object.entries(SCALES);

  return (
    <MenuSelectionList
      options={scaleOptions.map(([key, option]) => ({
        value: key,
        label: option.name,
        checked: scale.scalePattern === option.id,
        onSelect: () => setScale({ ...scale, scalePattern: option.id }),
      }))}
      className={twMerge(isInSetup && "grid-cols-3")}
    />
  );
};

export default ScalesChoice;
