"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { useNavStore } from "@/hooks/useNavStore";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import SetupWizardStage from "@/components/settings/SetupStage";
import Instrument from "@/components/instrument/Instrument";
import { twJoin } from "tailwind-merge";
import { applySidebarOffset } from "@/resources/movement";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const hasHydrated = useNavStore((s) => s.hasHydrated);
  const hasDoneSetup = useNavStore((s) => s.hasDoneSetup);
  const isSidebarOpen = useNavStore((s) => s.isSidebarOpen);
  const isMobile = useNavStore((s) => s.isMobile);
  const setIsMobile = useNavStore((s) => s.setIsMobile);
  const hasScaleInfoContent = useNavStore((s) => s.hasScaleInfoContent);
  const fretQuantity = useInstrumentStore((s) => s.fretQuantity);
  const isRightHanded = useInstrumentStore((s) => s.isRightHanded);
  const { contextSafe } = useGSAP({ scope: container });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // calc using CSS var so it works with zoom / different screen sizes
  // Remove transform completely for left-handed mode
  // keep it in sync if window size / zoom changes
  useGSAP(
    () => {
      if (!container.current) return;
      applySidebarOffset(
        container.current,
        isSidebarOpen,
        fretQuantity,
        isRightHanded
      );
    },
    { dependencies: [isSidebarOpen, fretQuantity, isRightHanded] }
  );

  useGSAP(() => {
    if (!container.current) return;
    const onResize = () => {
      applySidebarOffset(
        container.current!,
        isSidebarOpen,
        fretQuantity,
        isRightHanded
      );
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isSidebarOpen, fretQuantity, isRightHanded]);

  // Move Instrument if ScaleInfoPopup is open
  useGSAP(
    () => {
      if (!container.current) return;
      gsap.to(container.current!, {
        marginTop: hasScaleInfoContent ? (isMobile ? 112 : 80) : 0,
        duration: hasScaleInfoContent ? 0.3 : 0.2,
        ease: "none",
      });
    },
    { dependencies: [hasScaleInfoContent, isMobile] }
  );

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
