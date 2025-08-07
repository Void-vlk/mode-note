import { type FC } from "react";
import MenuSelectionList from "@/components/dropdowns/MenuSelectionList";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { SCALE_POSITIONS } from "@/resources/scales";
import { twMerge } from "tailwind-merge";

type Props = {
  isInSetup?: boolean;
};

const ScalePositionChoice: FC<Props> = ({ isInSetup = false }) => {
  const scalePosition = useInstrumentStore((s) => s.scalePosition);
  const setScalePosition = useInstrumentStore((s) => s.setScalePosition);

  const scalePositionOptions = Object.entries(SCALE_POSITIONS);

  return (
    <MenuSelectionList
      options={scalePositionOptions.map(([key, position]) => ({
        value: key,
        label: position.label,
        checked: scalePosition === position.value,
        onSelect: () => setScalePosition(position.value),
      }))}
      className={twMerge(isInSetup && "grid-cols-3")}
    />
  );
};

export default ScalePositionChoice;
