"use client";
import gsap from "gsap";
import { Check } from "lucide-react";
import React, { type FC, useRef } from "react";
import { Transition } from "react-transition-group";

import useCookiesConsentStore from "@/hooks/useCookiesConsentStore";

const CookiesBanner: FC = () => {
  const { hasHydrated, hasSetPreference, setCookiesPref } =
    useCookiesConsentStore();

  const container = useRef<HTMLDivElement>(null);

  const onEnter = () => {
    gsap.fromTo(
      container.current,
      { yPercent: 150 },
      { yPercent: 0, duration: 0.4, delay: 1, ease: "power2.inOut" }
    );
  };

  const onExit = () => {
    gsap.to(container.current, {
      yPercent: 150,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <Transition
      in={!hasSetPreference && hasHydrated}
      appear={true}
      mountOnEnter={true}
      unmountOnExit={true}
      nodeRef={container}
      timeout={{ enter: 0, exit: 300 }}
      onEnter={onEnter}
      onExit={onExit}
    >
      <section
        ref={container}
        className="fixed right-2 bottom-2 z-200 flex items-center gap-2 bg-black/80 pl-4 pr-3 py-3 rounded-full"
      >
        <p className="text-sm text-grey-mid">
          We use cookies to personalise your browsing and improve our site.
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCookiesPref(true)}
            className="cursor-pointer flex text-sm gap-1 px-2 py-1 rounded-full bg-(--note-colour) text-white/80 hover:text-white hover:border-white/80"
          >
            Accept <Check className="size-5" />
          </button>
          <button
            onClick={() => setCookiesPref(false)}
            className="cursor-pointer text-sm px-2 py-1 rounded-full text-grey-mid border border-grey-mid hover:text-grey-light"
          >
            Reject
          </button>
        </div>
      </section>
    </Transition>
  );
};

export default CookiesBanner;
