"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { useNavStore } from "@/stores/useNavStore";
import { useInstrumentStore } from "@/stores/useInstrumentStore";
import SetupWizardStage from "@/components/settings/SetupStage";
import Instrument from "@/components/instrument/Instrument";
import { twJoin } from "tailwind-merge";
import { applySidebarOffset } from "@/resources/movement";
import { Scales } from "@/resources/scales";
import Keyboard from "@/components/keys/Keyboard";
import { Instruments } from "@/resources/types";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const hasHydrated = useNavStore((s) => s.hasHydrated);
  const hasDoneSetup = useNavStore((s) => s.hasDoneSetup);
  const isSidebarOpen = useNavStore((s) => s.isSidebarOpen);
  const isScaleInfoOpen = useNavStore((s) => s.isScaleInfoOpen);
  const isMobile = useNavStore((s) => s.isMobile);
  const setIsMobile = useNavStore((s) => s.setIsMobile);
  const instrument = useInstrumentStore((s) => s.instrument);
  const fretQuantity = useInstrumentStore((s) => s.fretQuantity);
  const isRightHanded = useInstrumentStore((s) => s.isRightHanded);
  const scalePattern = useInstrumentStore((s) => s.scale.scalePattern);
  const tonicNote = useInstrumentStore((s) => s.scale.tonicNote);

  const hasScaleInfoContent =
    isScaleInfoOpen && tonicNote !== null && scalePattern !== Scales.Chromatic;

  const { contextSafe } = useGSAP({ scope: container });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGSAP(
    () => {
      if (!container.current) return;

      if (instrument === Instruments.Keys) {
        gsap.set(container.current, { clearProps: "transform" });
        return;
      }

      applySidebarOffset(
        container.current,
        isSidebarOpen,
        fretQuantity,
        isRightHanded
      );
    },
    { dependencies: [isSidebarOpen, fretQuantity, isRightHanded, instrument] }
  );

  useGSAP(() => {
    if (!container.current) return;
    const onResize = () => {
      if (instrument === Instruments.Keys) {
        gsap.set(container.current!, { clearProps: "transform" });
        return;
      }
      applySidebarOffset(
        container.current!,
        isSidebarOpen,
        fretQuantity,
        isRightHanded
      );
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isSidebarOpen, fretQuantity, isRightHanded, instrument]);

  // Move Instrument if ScaleInfoPopup is open
  useGSAP(
    () => {
      if (!container.current) return;
      gsap.to(container.current!, {
        marginTop: hasScaleInfoContent ? (isMobile ? 90 : 80) : 0,
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
              instrument === Instruments.Keys || isRightHanded
                ? "flex-row direction-ltr"
                : "flex-row-reverse direction-rtl mr-2"
            )}
            ref={container}
          >
            {hasDoneSetup ? (
              instrument === Instruments.Keys ? (
                <Keyboard />
              ) : (
                <Instrument show={true} />
              )
            ) : (
              <SetupWizardStage />
            )}
          </main>
        )}
      </Transition>
    </SwitchTransition>
  );
}
