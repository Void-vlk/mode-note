import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type DropdownState = {
  tonicOpen: boolean;
  scaleOpen: boolean;
  instrumentOpen: boolean;
  timeSignatureOpen: boolean;
  forcePlaceholder: boolean;
  infoOpen: boolean;
  tuningOpen: boolean;
  headerText: Record<string, string>;
  toggleTonicOpen: () => void;
  toggleScaleOpen: () => void;
  toggleInstrumentOpen: () => void;
  toggleTimeSignatureOpen: () => void;
  closeAll: () => void;
  handleClickOutside: (event: MouseEvent) => void;
  registerClickOutsideListener: () => void;
  unregisterClickOutsideListener: () => void;
  setForcePlaceholder: (value: boolean) => void;
  toggleInfo: () => void;
  toggleTuningOpen: () => void;
  setHeaderText: (variant: string, text: string) => void;
};

export const useDropdownStore = create<DropdownState>()(
  persist(
    (set, get) => ({
      tonicOpen: false,
      scaleOpen: false,
      instrumentOpen: false,
      timeSignatureOpen: false,
      forcePlaceholder: true,
      infoOpen: false,
      tuningOpen: false,
      headerText: {},
      toggleTonicOpen: () => {
        set((state) => {
          const newTonicOpen = !state.tonicOpen;
          get().closeAll();
          return { tonicOpen: newTonicOpen };
        });
        get().registerClickOutsideListener();
      },
      toggleScaleOpen: () => {
        set((state) => {
          const newScaleOpen = !state.scaleOpen;
          get().closeAll();
          return { scaleOpen: newScaleOpen };
        });
        get().registerClickOutsideListener();
      },
      toggleInstrumentOpen: () => {
        set((state) => {
          const newInstrumentOpen = !state.instrumentOpen;
          get().closeAll();
          return { instrumentOpen: newInstrumentOpen };
        });
        get().registerClickOutsideListener();
      },
      toggleTimeSignatureOpen: () => {
        set((state) => {
          const newTimeSignatureOpen = !state.timeSignatureOpen;
          get().closeAll();
          return { timeSignatureOpen: newTimeSignatureOpen };
        });
        get().registerClickOutsideListener();
      },
      toggleInfo: () => {
        set((state) => {
          const newInfoOpen = !state.infoOpen;
          get().closeAll();
          return { infoOpen: newInfoOpen };
        });
        get().registerClickOutsideListener();
      },
      //
      toggleTuningOpen: () => {
        set((state) => {
          const newTuningOpen = !state.tuningOpen;
          get().closeAll();
          return { tuningOpen: newTuningOpen };
        });
        get().registerClickOutsideListener();
      },
      closeAll: () => {
        set({
          tonicOpen: false,
          scaleOpen: false,
          instrumentOpen: false,
          timeSignatureOpen: false,
          tuningOpen: false,
        });
        get().unregisterClickOutsideListener();
      },
      handleClickOutside: (event: MouseEvent) => {
        const dropdowns = document.querySelectorAll(".dropdown-container");
        let isClickInside = false;
        dropdowns.forEach((dropdown) => {
          if (dropdown.contains(event.target as Node)) {
            isClickInside = true;
          }
        });
        if (!isClickInside) {
          get().closeAll();
        }
      },
      registerClickOutsideListener: () => {
        document.addEventListener("mousedown", get().handleClickOutside);
      },
      unregisterClickOutsideListener: () => {
        document.removeEventListener("mousedown", get().handleClickOutside);
      },
      setForcePlaceholder: (value: boolean) => set({ forcePlaceholder: value }),
      setHeaderText: (variant: string, text: string) => {
        set((state) => ({
          headerText: {
            ...state.headerText,
            [variant]: text,
          },
        }));
      },
    }),
    {
      name: "dropdown-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        headerText: state.headerText,
      }),
    }
  )
);
