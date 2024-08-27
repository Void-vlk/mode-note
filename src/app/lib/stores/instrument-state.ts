import { create } from 'zustand';
import { InstrumentProps, instrumentData } from '@/lib/data/instrument-data';
import { useNoteStore } from './note-state';
import { useTuningStore } from './tuning-state';

export interface InstrumentState {
  selectedInstrument: InstrumentProps;
  setSelectedInstrument: (instrumentId: string) => void;
  stringIndex: number;
  setStringIndex: (index: number) => void;
//   stringThickness: string;
//   setStringThickness: (thickness: string) => void;
}

export const useInstrumentStore = create<InstrumentState>((set) => ({
  selectedInstrument: instrumentData[5], // Default to 8 string 
  stringIndex: 0,

//TODO: Add different thicknesses for guitar & bass, and for each string on fretboard thick to thin...
//   stringThickness: "p-0.5",
//   setStringThickness: (thickness) => set({ stringThickness: thickness }),

  setSelectedInstrument: (instrumentId: string) =>
    set(() => {
      const selectedInstrument = instrumentData.find(
        (instrument) => instrument.id === instrumentId
      ) || instrumentData[5];

      const tuningStore = useTuningStore.getState();
      const defaultTuning = tuningStore.selectedTuning;
      const noteStore = useNoteStore.getState();
      //reset to default tuning when switching instrument
      defaultTuning.stringTunings.forEach((tuning, index) => {
        noteStore.setOpenNote(index, tuning.openNote);
      });

    return {
      selectedInstrument,
      stringIndex: 0,
    };
  }),

  setStringIndex: (index: number) => set(() => ({ stringIndex: index })),
}));