"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { type WizardStage } from "@/resources/types";

type navState = {
  isSidebarOpen: boolean;
  wizardStage: WizardStage;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  setWizardStage: (stage: WizardStage) => void;
  hasDoneSetup: boolean;
  setHasDoneSetup: (hasDoneSetup: boolean) => void;
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  isMetronomeOpen: boolean;
  setIsMetronomeOpen: (isMetronomeOpen: boolean) => void;
  isScaleInfoOpen: boolean;
  setIsScaleInfoOpen: (isScaleInfoOpen: boolean) => void;
};

export const useNavStore = create<navState>()(
  persist(
    (set) => ({
      isSidebarOpen: false,
      wizardStage: "instrument",
      setIsSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
      setWizardStage: (wizardStage) => set({ wizardStage }),
      hasDoneSetup: false,
      setHasDoneSetup: (hasDoneSetup) => set({ hasDoneSetup }),
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      isMetronomeOpen: false,
      setIsMetronomeOpen: (isMetronomeOpen) => set({ isMetronomeOpen }),
      isScaleInfoOpen: false,
      setIsScaleInfoOpen: (isScaleInfoOpen) => set({ isScaleInfoOpen }),
    }),

    {
      name: "setup-wizard",
      partialize: (state) => ({ hasDoneSetup: state.hasDoneSetup }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
