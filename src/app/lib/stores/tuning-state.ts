import { create } from "zustand";
import { TuningProps, tuningData } from "@/lib/data/tuning-data";
import { useInstrumentStore } from "@/lib/stores/instrument-state";
import { useNoteStore } from "@/lib/stores/note-state";

export interface TuningState {
  selectedTuning: TuningProps;
  setSelectedTuning: (tuningId: string) => void;
  resetTuning: () => void;
  isCustom: boolean;
  checkIfCustom: () => void;
}

export const useTuningStore = create<TuningState>((set, get) => ({
  selectedTuning: tuningData[41], //default: standard 8 string tuning

  setSelectedTuning: (tuningId: string) => {
    const selectedInstrument = useInstrumentStore.getState().selectedInstrument;

    const tuning = tuningData.find(
      (tuning) =>
        tuning.id === tuningId &&
        tuning.instrumentTitle === selectedInstrument.title
    );

    if (tuning) {
      set({ selectedTuning: tuning });
    } else {
      const defaultTuning = tuningData.find(
        (tuning) => tuning.instrumentTitle === selectedInstrument.title
      );
      if (defaultTuning) {
        set({ selectedTuning: defaultTuning });
      }
    }

    const noteStore = useNoteStore.getState();
    get().selectedTuning?.stringTunings.forEach((tuning, index) => {
      noteStore.setOpenNote(index, tuning.openNote);
    });

    get().checkIfCustom();
  },
  resetTuning: () => {
    const selectedInstrument = useInstrumentStore.getState().selectedInstrument;
    const defaultTuning = tuningData.find(
      (tuning) => tuning.instrumentTitle === selectedInstrument.title
    );
    if (defaultTuning) {
      set({ selectedTuning: defaultTuning });
      const noteStore = useNoteStore.getState();
      defaultTuning.stringTunings.forEach((tuning, index) => {
        noteStore.setOpenNote(index, tuning.openNote);
      });
    }
  },
  isCustom: false,
  checkIfCustom: () => {
    const selectedTuning = get().selectedTuning;
    const isDefaultTuning = tuningData.some((tuning) => 
    tuning.stringTunings.every(
      (stringTuning, index) =>
        stringTuning.openNote === selectedTuning.stringTunings[index].openNote
    ));
    set({ isCustom: !isDefaultTuning });
  },

}));
