"use client";
import { type FC, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { Transition, SwitchTransition } from "react-transition-group";

import InstrumentChoice from "@/components/dropdowns/InstrumentChoice";
import TonicChoice from "@/components/dropdowns/TonicChoice";
import TuningChoice from "@/components/dropdowns/TuningChoice";
import ScalesChoice from "@/components/dropdowns/ScalesChoice";
import { useNavStore } from "@/stores/useNavStore";
import { WIZARD_STAGES } from "@/resources/types";
import { EventName, trackEvent } from "@/resources/analytics";

const WizardSetupStage: FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const setHasDoneSetup = useNavStore((s) => s.setHasDoneSetup);
  const setWizardStage = useNavStore((state) => state.setWizardStage);
  const wizardStage = useNavStore((state) => state.wizardStage);
  const currentIndex = WIZARD_STAGES.indexOf(wizardStage);

  const handleNextStage = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < WIZARD_STAGES.length) {
      setWizardStage(WIZARD_STAGES[nextIndex]);
    } else {
      setHasDoneSetup(true);
      trackEvent(EventName.SetupCompleted);
    }
  };

  const handleBack = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setWizardStage(WIZARD_STAGES[prevIndex]);
    }
  };

  const handleSkip = () => {
    setHasDoneSetup(true);
    trackEvent(EventName.SetupSkipped, { setup_page: wizardStage });
  };

  return (
    <main className="size-full justify-center items-start sm:items-center flex px-2 py-16 sm:py-0 overflow-y-auto custom-scrollbar">
      <section className="relative lg:max-w-xl max-w-md w-full flex flex-col rounded-lg bg-white/5 border pt-6 text-center space-y-1">
        <h2 className="text-center text-xl md:text-2xl xl:text-3xl text-white font-bold">
          Welcome to Mode Note!
        </h2>
        <h4 className="text-sm md:text-base text-grey-light md:px-4 leading-tight">
          Your helpful guide to learning scales and notes.
        </h4>
        <button
          className="cursor-pointer hover:text-white absolute top-1 right-1 px-2 py-1 text-[10px] text-white/80"
          onClick={handleSkip}
        >
          Skip
        </button>

        <SwitchTransition>
          <Transition
            key={wizardStage}
            timeout={{ enter: 300, exit: 200 }}
            nodeRef={container}
            appear={true}
          >
            {() => {
              return (
                <div ref={container} className="w-full p-2 md:p-4">
                  {wizardStage === "instrument" && (
                    <>
                      <p className="text-balance text-sm text-white/80 pb-4">
                        Follow this setup guide to get you started - pick an
                        instrument, tuning, tonic note, musical scale or mode &
                        start practicing with the built in metronome! Then if
                        you fancy a change, update your settings at any time
                        from the menu. You&apos;ll be playing like a pro in no
                        time!
                      </p>
                      <InstrumentChoice isInSetup={true} />
                    </>
                  )}

                  {wizardStage === "tuning" && (
                    <TuningChoice isInSetup={true} />
                  )}
                  {wizardStage === "scale" && (
                    <section className="flex flex-col text-xs md:text-sm">
                      <p className="my-1">Choose a scale & position:</p>
                      <ScalesChoice isInSetup={true} />
                      <p className="my-1">Choose a tonic note & accidental:</p>
                      <TonicChoice isInSetup={true} />
                    </section>
                  )}

                  <div className="flex w-full justify-between items-center pt-4 pb-5 sm:pb-0 px-4">
                    <button
                      className={twMerge(
                        "btn",
                        wizardStage === "instrument" && "opacity-50"
                      )}
                      onClick={handleBack}
                      disabled={wizardStage === "instrument"}
                    >
                      Back
                    </button>
                    <button className="btn" onClick={handleNextStage}>
                      {wizardStage !== "scale" ? "Continue" : "Let's Go!"}
                    </button>
                  </div>
                </div>
              );
            }}
          </Transition>
        </SwitchTransition>
      </section>
    </main>
  );
};
export default WizardSetupStage;
