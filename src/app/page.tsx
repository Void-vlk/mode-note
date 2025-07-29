"use client";

import { useRef } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { useNavStore } from "@/hooks/useNavStore";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import SetupWizardStage from "@/components/settings/SetupStage";
import Instrument from "@/components/instrument/Instrument";
import { twJoin } from "tailwind-merge";
import MetronomeMenu from "@/components/metronome/MetronomeMenu";

// const Instrument = lazy(() => import("@/components/Instrument")); lazy,

export default function Home() {
  const hasHydrated = useNavStore((s) => s.hasHydrated);
  const hasDoneSetup = useNavStore((s) => s.hasDoneSetup);
  const isSidebarOpen = useNavStore((s) => s.isSidebarOpen);
  const instrument = useInstrumentStore((s) => s.instrument);
  const stringQty = useInstrumentStore((s) => s.stringQty);
  const container = useRef<HTMLDivElement>(null);

  const transitionKey = hasDoneSetup ? `${instrument}-${stringQty}` : "setup";

  if (!hasHydrated) {
    return null;
  }

  return (
    <main
      className={twJoin(
        "size-full min-h-screen flex items-center ease-in-out transition-all will-change-transform duration-300 overflow-x-auto custom-scrollbar",
        isSidebarOpen ? "ml-72 xl:ml-80" : "ml-0"
      )}
    >
      <SwitchTransition>
        <Transition
          key={transitionKey}
          timeout={{ enter: 0, exit: 300 }}
          appear={true}
          nodeRef={container}
        >
          {() => (
            <div
              className={twJoin(
                "w-full items-center flex",
                isSidebarOpen ? "" : "lg:justify-center"
              )}
              ref={container}
            >
              {hasDoneSetup ? (
                <Instrument key={instrument} show={true} />
              ) : (
                <SetupWizardStage />
              )}
            </div>
          )}
        </Transition>
      </SwitchTransition>

      <MetronomeMenu />
    </main>
  );
}
