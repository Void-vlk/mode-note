'use client'
import { type FC } from 'react'
import MenuSelectionList from "@/components/dropdowns/MenuSelectionList";
// import ContentToggle from "@/components/settings/ContentToggle";

import { useMetronomeStore } from "@/hooks/useMetronomeStore";
import { METRONOME_SOUNDS } from '@/resources/metronome';

const SoundChoice: FC = () => {
  const sound = useMetronomeStore((s) => s.sound);
  const setSound = useMetronomeStore((s) => s.setSound);

  const soundOptions = Object.entries(METRONOME_SOUNDS)

  return (
    <>
      <MenuSelectionList
        options={soundOptions.map(([key, option]) => ({
          value: key,
          label: option.label,
          checked: sound === key,
          onSelect: () => setSound(key as typeof sound),
        }))}
      />
      {/* <ContentToggle /> */}
    </>
  );
}

export default SoundChoice