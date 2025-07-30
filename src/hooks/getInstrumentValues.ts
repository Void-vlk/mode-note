import { STRING_QTY_OPTIONS, TUNINGS } from "@/resources/tunings";
import type { Instruments, Tuning } from "@/resources/types";
import type { NotePitch, StringQty } from "@/resources/themes";

// Get all available string quantities for selected Instrument
export const getStringQuantities = (instrument: Instruments): StringQty[] =>
  // Object.keys(TUNINGS[instrument]).map(Number) as StringQty[];
  STRING_QTY_OPTIONS[instrument] ?? [];

// Get all available tunings for selected Instrument & string quantities
export const getInstrumentTunings = (
  instrument: Instruments,
  stringQty: StringQty
): Tuning[] => TUNINGS[instrument][stringQty] ?? [];

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
  instrument: Instruments,
  stringQty: StringQty
): NotePitch[] => {
  const tunings = TUNINGS[instrument][stringQty];
  return tunings && tunings.length > 0 ? tunings[0].stringTunings : [];
};
