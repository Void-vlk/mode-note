import { type FC } from "react";
import { twMerge } from "tailwind-merge";
import MenuSelectionList from "@/components/dropdowns/MenuSelectionList";
import ContentToggle from "@/components/settings/ContentToggle";
import { useInstrumentStore } from "@/stores/useInstrumentStore";
import { SCALE_POSITIONS } from "@/resources/scales";

type Props = {
  isInSetup?: boolean;
};

const ScalePositionChoice: FC<Props> = ({ isInSetup = false }) => {
  const scalePosition = useInstrumentStore((s) => s.scalePosition);
  const setScalePosition = useInstrumentStore((s) => s.setScalePosition);
  const scalePositionMode = useInstrumentStore((s) => s.scalePositionMode);
  const setScalePositionMode = useInstrumentStore(
    (s) => s.setScalePositionMode
  );

  const scalePositionOptions = Object.entries(SCALE_POSITIONS);

  return (
    <>
      <ContentToggle
        isChecked={scalePositionMode === "3NPS"}
        onChange={() => {
          const newMode = scalePositionMode === "Shape" ? "3NPS" : "Shape";
          setScalePositionMode(newMode);
        }}
        isInSetup={isInSetup}
        optionHeader="Shape"
        leftOption="Box"
        rightOption="3NPS"
        aria-label="Toggle scale shape"
      />
      <MenuSelectionList
        options={scalePositionOptions.map(([key, position]) => ({
          value: key,
          label: position.label,
          checked: scalePosition === position.value,
          onSelect: () => setScalePosition(position.value),
        }))}
        className={twMerge(isInSetup && "grid-cols-3")}
      />
    </>
  );
};

export default ScalePositionChoice;
