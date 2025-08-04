"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { useNavStore } from "@/hooks/useNavStore";
import SetupWizardStage from "@/components/settings/SetupStage";
import Instrument from "@/components/instrument/Instrument";

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const hasHydrated = useNavStore((s) => s.hasHydrated);
  const hasDoneSetup = useNavStore((s) => s.hasDoneSetup);
  const isSidebarOpen = useNavStore((s) => s.isSidebarOpen);

  useGSAP(
    () => {
      if (!container.current) return;
      const isXL = window.innerWidth >= 1280;
      const sidebarWidth = isXL ? 264 : 288;

      gsap.to(container.current, {
        x: isSidebarOpen ? sidebarWidth : 0,
        duration: 0.3,
        ease: "none",
      });
    },
    { dependencies: [isSidebarOpen] }
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
            className="w-full h-svh md:h-screen items-center flex xl:justify-center overflow-x-auto custom-scrollbar"
            ref={container}
          >
            {hasDoneSetup ? <Instrument show={true} /> : <SetupWizardStage />}
          </main>
        )}
      </Transition>
    </SwitchTransition>
  );
}
