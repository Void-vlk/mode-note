"use client";
import { type FC, useMemo } from "react";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import type { NotePitch } from "@/resources/themes";
import { getNoteName } from "@/hooks/getNoteValues";

const CurrentTuningDisplay: FC = () => {
  const currentTuning = useInstrumentStore((s) => s.currentTuning);
  const isSharp = useInstrumentStore((s) => s.isSharp);

  const noteString = useMemo(
    () =>
      currentTuning
        .map((pitch: NotePitch) => getNoteName(pitch, isSharp))
        .join("-"),
    [currentTuning, isSharp]
  );

  return <div className="pl-3 pb-1 text-lg text-white/90">{noteString}</div>;
};
export default CurrentTuningDisplay;
