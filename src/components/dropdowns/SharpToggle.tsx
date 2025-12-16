"use client";
import { type FC } from "react";
import { useInstrumentStore } from "@/stores/useInstrumentStore";
import Switch from "@/components/settings/Switch";

const SharpToggle: FC<{ className?: string }> = ({ className }) => {
  const isSharp = useInstrumentStore((s) => s.isSharp);
  const setIsSharp = useInstrumentStore((s) => s.setIsSharp);

  return (
    <Switch
      isChecked={isSharp}
      onChange={() => {
        setIsSharp(!isSharp);
      }}
      iconLeft="♭"
      iconRight={<span className="-mt-px">♯</span>}
      aria-label="Toggle sharp/flat"
      className={className}
    />
  );
};

export default SharpToggle;
