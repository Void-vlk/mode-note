"use client";
import {
  ChevronsDown,
  ChevronDown,
  ChevronsUp,
  ChevronUp,
  Save,
} from "lucide-react";
import { type FC, ReactNode } from "react";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import Switch from "@/components/settings/Switch";

type Props = {
  icon: ReactNode;
  semitone: -2 | -1 | 1 | 2;
};

const TuningButton: FC<Props> = ({ icon, semitone }) => {
  const setNewTuning = useInstrumentStore((s) => s.setNewTuning);
  const handleClick = () => setNewTuning(semitone);

  return (
    <button
      onClick={handleClick}
      className="bg-white/90 size-6 flex justify-center items-center cursor-pointer hover:bg-white rounded-sm text-black/80"
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

  const toggleSharpFlat = () => {
    setIsSharp(!isSharp);
  };

  return (
    <div className="flex items-center justify-between px-3">
      <Switch
        isChecked={isSharp}
        onChange={toggleSharpFlat}
        iconLeft="♭"
        iconRight={<span className="-mt-px">♯</span>}
        aria-label="Toggle sharp/flat"
      />
      <div className="flex gap-1 items-center">
        <p className="text-xs pr-1">Tune all: </p>
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
        className="cursor-pointer rounded-sm text-white/90 hover:text-white"
      >
        <Save className="size-6" strokeWidth={1.5} />
      </button>
    </div>
  );
};
export default TuningControls;
