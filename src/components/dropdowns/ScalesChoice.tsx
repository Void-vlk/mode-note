import { type FC } from "react";
import { twMerge } from "tailwind-merge";

import MenuSelectionList from "@/components/dropdowns/MenuSelectionList";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { Scales, SCALES } from "@/resources/scales";

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
        checked: scale.scalePattern === (key as Scales),
        onSelect: () => setScale({ ...scale, scalePattern: key as Scales }),
      }))}
      className={twMerge(isInSetup && "grid-cols-3")}
    />
  );
};

export default ScalesChoice;
