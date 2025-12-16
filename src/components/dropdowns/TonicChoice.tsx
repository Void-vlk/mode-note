"use client";
import { type FC } from "react";
import { twJoin, twMerge } from "tailwind-merge";

import MenuSelectionList from "@/components/dropdowns/MenuSelectionList";
import { ScaleInfoButton } from "@/components/dropdowns/ScalesChoice";
import { getTonicNotes } from "@/hooks/getNoteValues";
import { useInstrumentStore } from "@/stores/useInstrumentStore";
import { NotePitch } from "@/resources/themes";
import { EventName, trackEvent } from "@/resources/analytics";
import SharpToggle from "./SharpToggle";

type Props = { isInSetup?: boolean };

const TonicChoice: FC<Props> = ({ isInSetup = false }) => {
  const scale = useInstrumentStore((s) => s.scale);
  const setScale = useInstrumentStore((s) => s.setScale);
  const isSharp = useInstrumentStore((s) => s.isSharp);

  const handleTonicSelect = (pitch: number) => {
    const newTonicNote =
      scale.tonicNote === pitch ? null : (pitch as NotePitch);
    setScale({ ...scale, tonicNote: newTonicNote });
  };

  return (
    <>
      <div className="flex items-center -mb-1">
        <SharpToggle className={twMerge(isInSetup ? "mx-auto mb-3" : "ml-3")} />
        {!isInSetup && <ScaleInfoButton />}
      </div>
      <MenuSelectionList
        canDeselect={true}
        options={getTonicNotes(isSharp).map(({ pitch, name }) => ({
          value: pitch,
          label: name,
          checked: scale.tonicNote === pitch,
          onSelect: () => {
            handleTonicSelect(pitch);
            trackEvent(EventName.ClickedScale, {
              tonic_note: name,
              setup_page: isInSetup ? "true" : "false",
            });
          },
        }))}
        className={twJoin(isInSetup && "grid-cols-6 -mt-3")}
      />
    </>
  );
};

export default TonicChoice;
