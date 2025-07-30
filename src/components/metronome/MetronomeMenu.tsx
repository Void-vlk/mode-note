"use client";
import { ArrowLeft } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, useRef } from "react";
import { Transition } from "react-transition-group";

import Dropdown from "@/components/dropdowns/DropdownAccordion";
import { useNavStore } from "@/hooks/useNavStore";
import { METRONOME_CONTENT } from "@/resources/dropdown-content";

const MetronomeMenu: FC = () => {
  const background = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const isMetronomeOpen = useNavStore((s) => s.isMetronomeOpen);
  const setIsMetronomeOpen = useNavStore((s) => s.setIsMetronomeOpen);

  const { contextSafe } = useGSAP({ scope: container });

  const onEnter = contextSafe(() => {
    if (container.current) {
      gsap
        .timeline()
        .fromTo(
          container.current,
          { yPercent: -100 },
          { yPercent: 0, duration: 0.3 }
        )
        .fromTo(
          background.current,
          {
            autoAlpha: 0,
          },
          { autoAlpha: 1, duration: 0.2, ease: "none" },
          "-0.1"
        );
    }
  });

  const onExit = contextSafe(() => {
    if (container.current) {
      gsap
        .timeline()
        .to(container.current, { yPercent: -100, duration: 0.3, ease: "none" })
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
      nodeRef={container}
      onEnter={onEnter}
      onExit={onExit}
    >
      {() => (
        <>
          <section
            ref={container}
            className="fixed border-l-2 right-0 top-0 z-30 w-64 h-full flex flex-col bg-black items-left px-4 py-2 md:py-3 xl:py-4"
          >
            <button
              className="top-1 right-2 p-1 xl:p-2 absolute cursor-pointer"
              onClick={() => setIsMetronomeOpen(false)}
            >
              <ArrowLeft
                className="rotate-90 text-white/80 size-6 xl:size-8"
                strokeWidth={1.5}
              />
            </button>
            <h2 className="text-base xl:text-lg font-bold text-white pb-1 xl:pb-2 mb-2 xl:mb-4 uppercase border-b">
              metronome
            </h2>
            <Dropdown content={METRONOME_CONTENT} />
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
