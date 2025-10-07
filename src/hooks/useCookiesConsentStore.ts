import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  hasSetPreference: boolean;
  allowNonFunctionalCookies: boolean;
  setCookiesPref: (allowNonFunctionalCookies: boolean) => void;
  // Internal state to track if the store has hydrated from storage
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

const useCookiesConsentStore = create(
  persist<Store>(
    (set) => ({
      hasSetPreference: false,
      allowNonFunctionalCookies: false,
      setCookiesPref: (allowNonFunctionalCookies: boolean) => {
        set({
          hasSetPreference: true,
          allowNonFunctionalCookies,
        });
      },
      hasHydrated: false,
      setHasHydrated: (state: boolean) => {
        set({
          hasHydrated: state,
        });
      },
    }),
    {
      name: "cookies-consent",
      onRehydrateStorage: (s) => {
        return () => s.setHasHydrated(true);
      },
    }
  )
);

export default useCookiesConsentStore;
