import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NavState {
  isMenuOpen: boolean;
  setIsMenuOpen: () => void;
  isMetronomeOpen: boolean;
  setIsMetronomeOpen: () => void;
  showTooltips: boolean;
  setShowTooltips: () => void;
}

export const useNavStore = create<NavState>()(
  persist(
    (set) => ({
      isMenuOpen: true,
      setIsMenuOpen: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
      isMetronomeOpen: false,
      setIsMetronomeOpen: () =>
        set((state) => ({ isMetronomeOpen: !state.isMetronomeOpen })),
      showTooltips: true,
      setShowTooltips: () =>
        set((state) => ({ showTooltips: !state.showTooltips })),
    }),
    {
      name: "tooltip-storage",
      partialize: (state) => ({ showTooltips: state.showTooltips }),
    }
  )
);
