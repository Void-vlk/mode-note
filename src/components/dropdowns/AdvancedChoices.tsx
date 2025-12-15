"use client";
import { type FC } from "react";

import ContentToggle from "@/components/settings/ContentToggle";
import { useInstrumentStore } from "@/stores/useInstrumentStore";
import { useThemeStore } from "@/stores/useThemeStore";
import { Scales } from "@/resources/scales";
import { EventName, trackEvent } from "@/resources/analytics";

const AdvancedChoices: FC = () => {
  const customSelectionMode = useThemeStore((s) => s.customSelectionMode);
  const setCustomSelectionMode = useThemeStore((s) => s.setCustomSelectionMode);
  const singleNoteSelectionMode = useThemeStore(
    (s) => s.singleNoteSelectionMode
  );
  const setSingleNoteSelectionMode = useThemeStore(
    (s) => s.setSingleNoteSelectionMode
  );
  const setScale = useInstrumentStore((s) => s.setScale);
  const resetCustomScaleAll = useInstrumentStore((s) => s.resetCustomScaleAll);
  const resetCustomScaleIndividual = useInstrumentStore(
    (s) => s.resetCustomScaleIndividual
  );

  const handleCustomSelectionToggle = () => {
    setCustomSelectionMode(!customSelectionMode);
    trackEvent(EventName.ToggledCustomNoteSelection);
    if (!customSelectionMode)
      setScale({ scalePattern: Scales.Chromatic, tonicNote: null });
  };

  return (
    <>
      <ContentToggle
        isChecked={customSelectionMode === true}
        onChange={handleCustomSelectionToggle}
        optionHeader="Custom Note Selection"
        isInSetup={false}
        leftOption="Off"
        rightOption="On"
        aria-label="Toggle custom Selection Mode"
      />

      <ContentToggle
        isChecked={singleNoteSelectionMode === true}
        onChange={() => setSingleNoteSelectionMode(!singleNoteSelectionMode)}
        optionHeader="Note Selection Type"
        isInSetup={false}
        leftOption="All Notes"
        rightOption="Individual Positions"
        aria-label="Toggle custom Selection Mode Type"
      />

      <button
        onClick={() => {
          if (singleNoteSelectionMode) {
            resetCustomScaleIndividual();
          } else {
            resetCustomScaleAll();
          }
        }}
        className="cursor-pointer capitalize rounded-lg text-grey-light text-sm hover:text-white border ml-2 mt-2 px-2 py-0.5 select-none"
      >
        reset selection
      </button>
    </>
  );
};

export default AdvancedChoices;
