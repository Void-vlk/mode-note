import { create } from "zustand";

interface NavState {
  isMenuOpen: boolean;
  setIsMenuOpen: () => void;
  isMetronomeOpen: boolean;
  setIsMetronomeOpen: () => void;
}

export const useNavStore = create<NavState>((set) => ({
  isMenuOpen: true,
  setIsMenuOpen: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  isMetronomeOpen: false,
  setIsMetronomeOpen: () =>
    set((state) => ({ isMetronomeOpen: !state.isMetronomeOpen })),
}));
