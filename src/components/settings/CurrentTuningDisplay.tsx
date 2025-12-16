"use client";
import { type FC } from "react";
import { useInstrumentStore } from "@/stores/useInstrumentStore";
import { getNoteName } from "@/hooks/getNoteValues";
import type { NotePitch } from "@/resources/themes";

const CurrentTuningDisplay: FC = () => {
  const currentTuning = useInstrumentStore((s) => s.currentTuning);
  const isSharp = useInstrumentStore((s) => s.isSharp);

  const noteString = currentTuning
    .map((pitch: NotePitch) => getNoteName(pitch, isSharp))
    .join("-");

  return <div className="pl-3 pb-1 text-lg text-white/90">{noteString}</div>;
};
export default CurrentTuningDisplay;
