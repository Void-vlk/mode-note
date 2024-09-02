import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface OrientationState {
  isLandscape: boolean;
  toggleOrientation: () => void;
}

export const useOrientationStore = create<OrientationState>()(
  persist(
    (set) => ({
      isLandscape: false,
      toggleOrientation: () =>
        set((state) => ({ isLandscape: !state.isLandscape })),
    }),
    {
      name: "orientation-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
