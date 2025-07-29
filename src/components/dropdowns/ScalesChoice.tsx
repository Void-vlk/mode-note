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

  return (
      <MenuSelectionList
        options={SCALES.map((scales) => ({
          value: scales.id,
          label: scales.name,
          checked: scale.scalePattern === scales.id,
          onSelect: () => setScale({ ...scale, scalePattern: scales.id }),
        }))}
        className={twMerge(isInSetup && "grid-cols-3")}
      />
  );
};

export default ScalesChoice;
