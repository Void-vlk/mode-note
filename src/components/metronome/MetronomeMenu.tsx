"use client";
import { Timer, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, useRef } from "react";
import { Transition } from "react-transition-group";

import Dropdown from "@/components/dropdowns/DropdownAccordion";
import BPMControls from "@/components/metronome/BPMControls";
import { useNavStore } from "@/hooks/useNavStore";
import { METRONOME_CONTENT } from "@/resources/dropdown-content";
import { useMetronomeStore } from "@/hooks/useMetronomeStore";

const MetronomeMenu: FC = () => {
  const background = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const isMetronomeOpen = useNavStore((s) => s.isMetronomeOpen);
  const setIsMetronomeOpen = useNavStore((s) => s.setIsMetronomeOpen);
  const bpm = useMetronomeStore((s) => s.bpm);

  const { contextSafe } = useGSAP({ scope: container });

  const onEnter = contextSafe(() => {
    if (container.current) {
      gsap
        .timeline()
        .fromTo(".wrapper", { xPercent: 100 }, { xPercent: 0, duration: 0.3 })
        .fromTo(
          background.current,
          {
            autoAlpha: 0,
          },
          { autoAlpha: 1, duration: 0.2, ease: "none" },
          "-0.1"
        )
        .fromTo(
          container.current.children,
          {
            autoAlpha: 0,
          },
          { autoAlpha: 1, duration: 0.3, stagger: 0.06, ease: "none" },
          "-=0.1"
        );
    }
  });

  const onExit = contextSafe(() => {
    if (container.current) {
      gsap
        .timeline()
        .to(container.current, { xPercent: 100, duration: 0.3, ease: "none" })
        .to(
          background.current,
          { autoAlpha: 0, duration: 0.3, ease: "none" },
          "<"
        );
    }
  });

  return (
    <Transition
      in={isMetronomeOpen}
      timeout={400}
      unmountOnExit
      mountOnEnter
      appear
      nodeRef={container}
      onEnter={onEnter}
      onExit={onExit}
    >
      {() => (
        <>
          <section
            ref={container}
            className="wrapper fixed right-2 top-16 xl:top-20 z-30 w-64 xl:w-68 h-fit flex flex-col bg-black rounded-xl xl:rounded-3xl items-left p-4"
          >
            <div className="w-full justify-between items-center flex mb-2 xl:mb-4 border-b pb-1 xl:pb-2 border-grey-dark">
              <Timer
                className="size-6 xl:size-8 text-grey-light"
                strokeWidth={1.5}
              />
              <h2 className="text-base xl:text-lg font-bold text-grey-light uppercase mt-0.5">
                metronome
              </h2>
              <button
                className="p-1 cursor-pointer"
                onClick={() => setIsMetronomeOpen(false)}
              >
                <X
                  className="text-white/80 size-6 xl:size-8"
                  strokeWidth={1.5}
                />
              </button>
            </div>
            <Dropdown content={METRONOME_CONTENT} />

            <section className="flex flex-col w-full mt-1 py-3 xl:py-4 gap-1 md:gap-2 xl:gap-3 items-center">
              <h3 className="font-bold text-xl text-white/90">BPM: {bpm}</h3>
              <BPMControls />
            </section>
          </section>
          <div
            ref={background}
            className="absolute inset-0 bg-black/20 z-20"
            onClick={() => setIsMetronomeOpen(false)}
          />
        </>
      )}
    </Transition>
  );
};

export default MetronomeMenu;
