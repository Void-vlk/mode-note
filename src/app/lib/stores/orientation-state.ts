import { create } from "zustand";

interface OrientationState {
  isLandscape: boolean;
  toggleOrientation: () => void;
}

export const useOrientationStore = create<OrientationState>((set) => ({
  isLandscape: false,
  toggleOrientation: () =>
    set((state) => ({ isLandscape: !state.isLandscape })),
}));
