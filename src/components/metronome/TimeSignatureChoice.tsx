"use client";
import { type FC } from "react";
import { useMetronomeStore } from "@/hooks/useMetronomeStore";
import MenuSelectionList from "@/components/dropdowns/MenuSelectionList";
import { TIME_SIGNATURES } from "@/resources/metronome";

const TimeSignatureChoice: FC = () => {
  const timeSignature = useMetronomeStore((s) => s.timeSignature);
  const setTimeSignature = useMetronomeStore((s) => s.setTimeSignature);

  const timeSignatureOptions = Object.entries(TIME_SIGNATURES);

  return (
    <MenuSelectionList
      options={timeSignatureOptions.map(([key, timeSig]) => ({
        value: key,
        label: timeSig.id,
        checked: timeSignature === key,
        onSelect: () => setTimeSignature(key as typeof timeSignature),
      }))}
    />
  );
};

export default TimeSignatureChoice;
