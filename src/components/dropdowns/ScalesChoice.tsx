import { Info } from "lucide-react";
import { type FC } from "react";
import { twMerge } from "tailwind-merge";

import MenuSelectionList from "@/components/dropdowns/MenuSelectionList";
import { useInstrumentStore } from "@/stores/useInstrumentStore";
import { Scales, SCALES } from "@/resources/scales";
import { useThemeStore } from "@/stores/useThemeStore";
import { useNavStore } from "@/stores/useNavStore";
import { EventName, trackEvent } from "@/resources/analytics";

type Props = {
  isInSetup?: boolean;
};

const ScalesChoice: FC<Props> = ({ isInSetup = false }) => {
  const scale = useInstrumentStore((s) => s.scale);
  const setScale = useInstrumentStore((s) => s.setScale);
  const customSelectionMode = useThemeStore((s) => s.customSelectionMode);
  const setCustomSelectionMode = useThemeStore((s) => s.setCustomSelectionMode);

  const scaleOptions = Object.entries(SCALES);

  const selectedScalePattern = customSelectionMode
    ? Scales.Custom
    : scale.scalePattern;

  return (
    <>
      {!isInSetup && <ScaleInfoButton />}
      <MenuSelectionList
        options={scaleOptions.map(([key, option]) => ({
          value: key,
          label: option.name,
          checked: selectedScalePattern === (key as Scales),
          onSelect: () => {
            setScale({ ...scale, scalePattern: key as Scales });
            setCustomSelectionMode(false);
            if ((key as Scales) === Scales.Custom) {
              setCustomSelectionMode(true);
            }
            trackEvent(EventName.ClickedScale, {
              scale_name: option.name,
              setup_page: isInSetup ? "true" : "false",
            });
          },
        }))}
        className={twMerge(isInSetup && "grid-cols-3", "-mt-2")}
      />
    </>
  );
};

export default ScalesChoice;

export const ScaleInfoButton: FC = () => {
  const isScaleInfoOpen = useNavStore((s) => s.isScaleInfoOpen);
  const setIsScaleInfoOpen = useNavStore((s) => s.setIsScaleInfoOpen);

  return (
    <button
      className="cursor-pointer flex text-xs gap-1 hover:text-white text-grey-light items-center justify-center px-2 py-1"
      onClick={() => {
        setIsScaleInfoOpen(!isScaleInfoOpen);
        trackEvent(EventName.ClickedScaleInfo);
      }}
    >
      <Info className="size-5" strokeWidth={1.5} />
      click for info
    </button>
  );
};
