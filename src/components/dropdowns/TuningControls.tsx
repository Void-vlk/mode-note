"use client";
import {
  ChevronsDown,
  ChevronDown,
  ChevronsUp,
  ChevronUp,
  Save,
} from "lucide-react";
import { type FC, ReactNode } from "react";
import { useInstrumentStore } from "@/stores/useInstrumentStore";
import Switch from "@/components/settings/Switch";
import { twJoin } from "tailwind-merge";
import { getNoteName } from "@/hooks/getNoteValues";
import type { NotePitch } from "@/resources/themes";

type Props = {
  icon: ReactNode;
  semitone: -2 | -1 | 1 | 2;
  onClick?: () => void;
  isSmall?: boolean;
};

const TuningButton: FC<Props> = ({
  icon,
  semitone,
  onClick,
  isSmall = false,
}) => {
  const setNewTuning = useInstrumentStore((s) => s.setNewTuning);
  const handleClick = () => (onClick ? onClick() : setNewTuning(semitone));

  return (
    <button
      onClick={handleClick}
      className={twJoin(
        "bg-grey-light flex justify-center items-center cursor-pointer hover:bg-white/80 rounded-sm text-black/80",
        isSmall ? "w-6 h-5" : "size-6"
      )}
    >
      {icon}
    </button>
  );
};

const TuningControls: FC = () => {
  const isSharp = useInstrumentStore((s) => s.isSharp);
  const setIsSharp = useInstrumentStore((s) => s.setIsSharp);
  const currentTuning = useInstrumentStore((s) => s.currentTuning);
  const setCustomTuning = useInstrumentStore((s) => s.setCustomTuning);

  return (
    <div className="flex items-center justify-between px-3 pb-2">
      <Switch
        isChecked={isSharp}
        onChange={() => {
          setIsSharp(!isSharp);
        }}
        iconLeft="♭"
        iconRight={<span className="-mt-px">♯</span>}
        aria-label="Toggle sharp/flat"
      />
      <div className="flex gap-1 items-center">
        <p className="text-xs lg:text-sm pr-0.5 text-grey-light">Tune all: </p>
        <TuningButton
          icon={<ChevronsDown className="size-6" />}
          semitone={-2}
        />
        <TuningButton icon={<ChevronDown className="size-6" />} semitone={-1} />
        <TuningButton icon={<ChevronUp className="size-6" />} semitone={1} />
        <TuningButton icon={<ChevronsUp className="size-6" />} semitone={2} />
      </div>
      <button
        onClick={() => setCustomTuning(currentTuning)}
        className="cursor-pointer rounded-sm text-grey-light hover:text-white"
      >
        <Save className="size-6" strokeWidth={1.5} />
      </button>
    </div>
  );
};
export default TuningControls;

export const IndividualStringTuningControls: FC = () => {
  const currentTuning = useInstrumentStore((s) => s.currentTuning);
  const stringQty = useInstrumentStore((s) => s.stringQty);
  const isSharp = useInstrumentStore((s) => s.isSharp);
  const setStringTuning = useInstrumentStore((s) => s.setStringTuning);

  const gridStyle = { gridTemplateColumns: `repeat(${stringQty}, 1fr)` };

  return (
    <section style={gridStyle} className={twJoin("grid px-1")}>
      {currentTuning.map((pitch: NotePitch, index) => {
        const note = getNoteName(pitch, isSharp);
        return (
          <div
            key={index}
            className="flex flex-col justify-center items-center gap-0.5"
          >
            <TuningButton
              icon={<ChevronsUp className="size-5" />}
              semitone={2}
              onClick={() => setStringTuning(index, 2)}
              isSmall={true}
            />
            <TuningButton
              icon={<ChevronUp className="size-5" />}
              semitone={1}
              onClick={() => setStringTuning(index, 1)}
              isSmall={true}
            />
            <p className="text-xl text-white/90">{note}</p>
            <TuningButton
              icon={<ChevronDown className="size-5" />}
              semitone={-1}
              onClick={() => setStringTuning(index, -1)}
              isSmall={true}
            />
            <TuningButton
              icon={<ChevronsDown className="size-5" />}
              semitone={-2}
              onClick={() => setStringTuning(index, -2)}
              isSmall={true}
            />
          </div>
        );
      })}
    </section>
  );
};
