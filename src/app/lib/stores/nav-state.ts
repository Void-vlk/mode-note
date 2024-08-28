import { create } from "zustand";

interface NavState {
  isMenuOpen: boolean;
  setIsMenuOpen: () => void;
  isMetronomeOpen: boolean;
  setIsMetronomeOpen: () => void;
  showTooltips: boolean;
  setShowTooltips: () => void;
}

export const useNavStore = create<NavState>((set) => ({
  isMenuOpen: true,
  setIsMenuOpen: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  isMetronomeOpen: false,
  setIsMetronomeOpen: () =>
    set((state) => ({ isMetronomeOpen: !state.isMetronomeOpen })),
  showTooltips: true,
  setShowTooltips: () => set((state) => ({ showTooltips: !state.showTooltips })),
}));
