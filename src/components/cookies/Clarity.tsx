"use client";

import Clarity from "@microsoft/clarity";
import { type FC, useEffect } from "react";

import useCookiesConsentStore from "@/hooks/useCookiesConsentStore";
import { useNavStore } from "@/hooks/useNavStore";

type ClarityProps = {
  projectId: string;
};

const MicrosoftClarity: FC<ClarityProps> = ({ projectId }) => {
  const allowNonFunctionalCookies = useCookiesConsentStore(
    (s) => s.allowNonFunctionalCookies
  );
  const hasHydrated = useNavStore((s) => s.hasHydrated);

  useEffect(() => {
    // if (process.env.NODE_ENV !== "development") return;
    if (!projectId) {
      console.error("Missing Microsoft Clarity ID");
      return;
    }
    if (!hasHydrated || !allowNonFunctionalCookies) {
      return;
    }
    Clarity.init(projectId);
    Clarity.consent(true);
  }, [projectId, allowNonFunctionalCookies, hasHydrated]);

  return null;
};

export default MicrosoftClarity;
