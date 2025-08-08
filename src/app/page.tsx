"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { useNavStore } from "@/hooks/useNavStore";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import SetupWizardStage from "@/components/settings/SetupStage";
import Instrument from "@/components/instrument/Instrument";
import { twJoin } from "tailwind-merge";

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const hasHydrated = useNavStore((s) => s.hasHydrated);
  const hasDoneSetup = useNavStore((s) => s.hasDoneSetup);
  const isSidebarOpen = useNavStore((s) => s.isSidebarOpen);
  const fretQuantity = useInstrumentStore((s) => s.fretQuantity);
  const isRightHanded = useInstrumentStore((s) => s.isRightHanded);

  useGSAP(
    () => {
      if (!container.current) return;
      const isXL = window.innerWidth >= 1280;

      let sidebarWidth = 0;
      if (isRightHanded) {
        if (fretQuantity === 24) {
          sidebarWidth = isXL ? 264 : 288;
        } else {
          sidebarWidth = isXL ? 184 : 280;
        }
      }

      gsap.to(container.current, {
        x: isSidebarOpen ? sidebarWidth : 0,
        duration: 0.3,
        ease: "none",
      });
    },
    { dependencies: [isSidebarOpen, fretQuantity, isRightHanded] }
  );

  const { contextSafe } = useGSAP({ scope: container });

  const onEnter = contextSafe(() => {
    if (!container.current) return;
    gsap.fromTo(container.current, { opacity: 0 }, { duration: 1, opacity: 1 });
  });

  const onExit = contextSafe(() => {
    if (!container.current) return;
    gsap.to(container.current, { duration: 1, opacity: 0 });
  });

  if (!hasHydrated) {
    return null;
  }

  return (
    <SwitchTransition>
      <Transition
        key={hasDoneSetup ? "main" : "setup"}
        timeout={0}
        nodeRef={container}
        onEnter={onEnter}
        onExit={onExit}
        unmountOnExit
        mountOnEnter
        appear
      >
        {() => (
          <main
            className={twJoin(
              "w-full items-center flex xl:justify-center h-svh max-h-svh md:h-lvh overflow-x-auto custom-scrollbar overflow-y-hidden",
              isRightHanded
                ? "flex-row direction-ltr"
                : "flex-row-reverse direction-rtl mr-2"
            )}
            ref={container}
          >
            {hasDoneSetup ? <Instrument show={true} /> : <SetupWizardStage />}
          </main>
        )}
      </Transition>
    </SwitchTransition>
  );
}
