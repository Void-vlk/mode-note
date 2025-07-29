import { TUNINGS } from "@/resources/tunings";
import type { Instrument, NotePitch, StringQty } from "@/resources/types";

// Get all available string quantities for selected Instrument
export const getStringQuantities = (instrument: Instrument): StringQty[] =>
  [
    ...new Set(
      TUNINGS.filter((t) => t.instrument === instrument).map((t) => t.stringQty)
    ),
  ].sort();

// Get all available tunings for selected Instrument & string quantities
export const getInstrumentTunings = (
  instrument: Instrument,
  stringQty: StringQty
) =>
  TUNINGS.filter(
    (t) => t.instrument === instrument && t.stringQty === stringQty
  );

// check tuning
export const isTuningMatching = (
  currentTuning: NotePitch[],
  tuningOption: { stringTunings: NotePitch[] }
): boolean =>
  currentTuning.length === tuningOption.stringTunings.length &&
  currentTuning.every(
    (note, index) => note === tuningOption.stringTunings[index]
  );

// default tuning for instrument/stringQty combo
export const defaultTuning = (
  instrument: Instrument,
  stringQty: StringQty
): NotePitch[] => {
  const tuning = TUNINGS.find(
    (t) => t.instrument === instrument && t.stringQty === stringQty
  );
  return tuning!.stringTunings;
};
