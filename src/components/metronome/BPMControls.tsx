"use client";
import { type FC, ReactNode } from "react";
import { useMetronomeStore } from "@/hooks/useMetronomeStore";
import { Plus, Minus } from "lucide-react";
import { twJoin } from "tailwind-merge";

const BPMControls: FC = () => {
  return (
    <section className="flex gap-2 ml-2">
      <BPMButton
        icon={
          <>
            <Minus strokeWidth={3} />
            <span className="-ml-0.5">10</span>
          </>
        }
        value={-10}
      />
      <BPMButton icon={<Minus />} value={-1} />
      <BPMButton icon={<Plus />} value={1} />
      <BPMButton
        icon={
          <>
            <Plus strokeWidth={3} />
            <span className="-ml-0.5">10</span>
          </>
        }
        value={10}
      />
      <BPMButton reset />
    </section>
  );
};

export default BPMControls;

type Props = {
  icon?: ReactNode | string;
  value?: -10 | -1 | 1 | 10;
  reset?: boolean;
};

const BPMButton: FC<Props> = ({ icon, value, reset }) => {
  const bpm = useMetronomeStore((s) => s.bpm);
  const setBPM = useMetronomeStore((s) => s.setBpm);

  const handleClick = () => {
    if (reset) {
      setBPM(120);
    } else if (typeof value === "number") {
      setBPM(bpm + value);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={twJoin(
        "bg-white/90 text-[13px] font-semibold p-0.5 flex justify-center items-center cursor-pointer hover:bg-white rounded-sm text-black/80",
        reset ? "w-fit h-7 px-1" : "size-7"
      )}
    >
      {icon || "RESET"}
    </button>
  );
};
