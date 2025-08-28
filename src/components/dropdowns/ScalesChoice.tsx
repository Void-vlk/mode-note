import { type FC } from "react";
import { twMerge } from "tailwind-merge";

import MenuSelectionList from "@/components/dropdowns/MenuSelectionList";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { Scales, SCALES } from "@/resources/scales";
import { Info } from "lucide-react";
import { useThemeStore } from "@/hooks/useThemeStore";

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
      <section className="flex justify-between items-center px-2 pb-2">
        <button className="cursor-pointer flex text-xs gap-1 hover:text-white text-grey-light items-center justify-center">
          <Info className="size-5" strokeWidth={1.5} />
          click for info
        </button>
      </section>

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
          },
        }))}
        className={twMerge(isInSetup && "grid-cols-3", "-mt-2")}
      />
    </>
  );
};

export default ScalesChoice;

export const ScaleInfoMenu: FC = () => {
  return (
    <section className="">
      <h2 className=""></h2>
    </section>
  );
};
