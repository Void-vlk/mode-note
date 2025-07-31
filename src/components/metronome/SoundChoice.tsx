'use client'
import { type FC } from 'react'
import MenuSelectionList from "@/components/dropdowns/MenuSelectionList";
import ContentToggle from "@/components/settings/ContentToggle";

import { useMetronomeStore } from "@/hooks/useMetronomeStore";
import { METRONOME_SOUNDS } from '@/resources/metronome';
import { Volume2, VolumeX } from 'lucide-react';

const SoundChoice: FC = () => {
  const sound = useMetronomeStore((s) => s.sound);
  const setSound = useMetronomeStore((s) => s.setSound);
  const audioOn = useMetronomeStore((s) => s.audioOn);
  const setAudioOn = useMetronomeStore((s) => s.setAudioOn);

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
      <ContentToggle
        isChecked={audioOn}
        onChange={() => setAudioOn(!audioOn)}
        isInSetup={false}
        optionHeader="Audio"
        leftOption={<VolumeX className="size-5" />}
        rightOption={<Volume2 className="size-5" />}
        aria-label="Toggle audio off/on"
      />
    </>
  );
}

export default SoundChoice