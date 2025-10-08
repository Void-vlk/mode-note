"use client";
import { type FC } from "react";

import CurrentTuningDisplay from "@/components/settings/CurrentTuningDisplay";
import MenuSelectionList from "@/components/dropdowns/MenuSelectionList";
import TuningControls, {
  IndividualStringTuningControls,
} from "@/components/dropdowns/TuningControls";
import {
  getInstrumentTunings,
  isTuningMatching,
} from "@/hooks/getInstrumentValues";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import InnerDropdown from "@/components/dropdowns/InnerDropdown";

import { EventName, trackEvent } from "@/resources/analytics";
import { getNoteName } from "@/hooks/getNoteValues";

type Props = { isInSetup?: boolean };

const TuningChoice: FC<Props> = ({ isInSetup = false }) => {
  const instrument = useInstrumentStore((s) => s.instrument);
  const stringQty = useInstrumentStore((s) => s.stringQty);
  const currentTuning = useInstrumentStore((s) => s.currentTuning);
  const setTuning = useInstrumentStore((s) => s.setTuning);
  const customTunings = useInstrumentStore((s) => s.customTunings);
  const setCustomTuning = useInstrumentStore((s) => s.setCustomTuning);
  const isSharp = useInstrumentStore((s) => s.isSharp);

  const tuningPresets = getInstrumentTunings(instrument, stringQty);

  const tuningIsMatching = tuningPresets.some((tuningOption) =>
    isTuningMatching(currentTuning, tuningOption)
  );

  const tuningOptions = [
    ...tuningPresets.map((tuningOption) => ({
      value: tuningOption.id,
      label: tuningOption.name,
      checked: isTuningMatching(currentTuning, tuningOption),
      onSelect: () => {
        setTuning(tuningOption.stringTunings);
        trackEvent(EventName.ClickedPresetTuning, {
          preset_selected: tuningOption.name,
        });
      },
    })),
    {
      value: `custom-${instrument}-${stringQty}`,
      label: "Custom",
      checked: !tuningIsMatching,
      onSelect: () => {
        if (customTunings[instrument]?.[stringQty]) {
          setCustomTuning();
        } else {
          setCustomTuning(currentTuning);
        }
        trackEvent(EventName.ClickedPresetTuning, {
          preset_selected: "Custom",
          custom_tuning: customTunings[instrument]?.[stringQty]
            ?.map((notePitch) => getNoteName(notePitch, isSharp))
            .join("-"),
        });
      },
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-between">
        {isInSetup ? (
          <>
            <p className="mb-3 text-sm text-white/90 text-balance">
              Now choose a tuning! Select a preset, or create your own. Adjust
              each individual string - or the full fretboard up or down, in
              either a semi-tone or whole-tone, & then save your custom tuning
              for next time!
            </p>
            <div className="flex items-center mx-auto">
              <p className="text-xs pb-0.5">Current tuning:</p>
              <CurrentTuningDisplay />
            </div>
            <div className="w-full h-px bg-white mb-2" />
          </>
        ) : (
          <CurrentTuningDisplay />
        )}
        <TuningControls />
        <InnerDropdown heading="Individual String Tuning">
          <IndividualStringTuningControls />
        </InnerDropdown>
      </div>

      <MenuSelectionList options={tuningOptions} />
    </>
  );
};

export default TuningChoice;
