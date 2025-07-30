"use client";
import { type FC, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { Transition, SwitchTransition } from "react-transition-group";

import InstrumentChoice from "@/components/dropdowns/InstrumentChoice";
import TonicChoice from "@/components/dropdowns/TonicChoice";
import TuningChoice from "@/components/dropdowns/TuningChoice";
import ScalesChoice from "@/components/dropdowns/ScalesChoice";
import { useNavStore } from "@/hooks/useNavStore";
import { WIZARD_STAGES } from "@/resources/types";

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
      setWizardStage("complete");
      setHasDoneSetup(true);
    }
  };

  const handleBack = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setWizardStage(WIZARD_STAGES[prevIndex]);
    }
  };

  const handleSkip = () => {
    setWizardStage("complete");
    setHasDoneSetup(true);
  };

  const BUTTON_CLASSES =
    "min-w-24 border hover:text-white text-white/80 py-1 px-6 rounded-md cursor-pointer text-sm";

  return (
    <main className="h-full w-full overflow-hidden justify-center items-center flex flex-col px-4 sm:px-10">
      <section className="lg:min-w-1/2 max-w-lg w-full rounded-lg bg-white/10 border pt-6 text-center space-y-1">
        <h2 className="text-center text-3xl text-white">
          Welcome to Mode Note!
        </h2>
        <p className="text-lg text-white px-8 sm:px-4 leading-tight">
          Your helpful guide to learning scales and notes.
        </p>

        <SwitchTransition>
          <Transition
            key={wizardStage}
            timeout={{ enter: 300, exit: 200 }}
            nodeRef={container}
            appear={true}
          >
            {() => {
              //status - prop transitionStatus: TransitionStatus for isExiting
              return (
                <div ref={container} className="w-full px-4 py-4">
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
                    <section className="flex flex-col">
                      <p className="text-sm">Choose a scale:</p>
                      <ScalesChoice isInSetup={true} />
                      <p className="text-sm">Choose a tonic note:</p>
                      <TonicChoice isInSetup={true} />
                    </section>
                  )}

                  <div className="flex w-full justify-between sm:px-8 items-center pt-4">
                    <button
                      className={twMerge(
                        BUTTON_CLASSES,
                        wizardStage === "instrument" && "opacity-50"
                      )}
                      onClick={handleBack}
                      disabled={wizardStage === "instrument"}
                    >
                      Back
                    </button>
                    <button
                      className={BUTTON_CLASSES}
                      onClick={handleNextStage}
                    >
                      {wizardStage !== "scale" ? "Continue" : "Let's Go!"}
                    </button>
                    <button className={BUTTON_CLASSES} onClick={handleSkip}>
                      Skip
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
