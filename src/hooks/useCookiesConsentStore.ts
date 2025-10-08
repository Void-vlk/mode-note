import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  hasSetPreference: boolean;
  allowNonFunctionalCookies: boolean;
  setCookiesPref: (allowNonFunctionalCookies: boolean) => void;
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
    }),
    {
      name: "cookies-consent",
    }
  )
);

export default useCookiesConsentStore;
