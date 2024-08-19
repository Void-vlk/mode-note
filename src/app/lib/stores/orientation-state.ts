import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface OrientationState {
  isLandscape: boolean;
  toggleOrientation: () => void;
  isOnMobile: boolean;
  setIsOnMobile: (value: boolean) => void;
  detectScreen: () => void;
}

export const useOrientationStore = create<OrientationState>()(
  persist(
    (set) => ({
      isLandscape: false,
      toggleOrientation: () =>
        set((state) => ({ isLandscape: !state.isLandscape })),
      isOnMobile: false,
      setIsOnMobile: (value: boolean) => set({ isOnMobile: value }),
      detectScreen: () => {
        const isMobileScreen = window.innerWidth <= 768;
        set({ isOnMobile: isMobileScreen });
      },
    }),
    {
      name: "orientation-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
