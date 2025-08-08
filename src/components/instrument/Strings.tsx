"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, useRef } from "react";
import { SwitchTransition, Transition } from "react-transition-group";

import String from "@/components/instrument/String";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { NotePitch } from "@/resources/themes";
import { Instruments } from "@/resources/types";

type Props = {
  currentTuning: NotePitch[];
  isNoteInScale: (
    p: NotePitch,
    stringIndex?: number,
    fretNumber?: number
  ) => { show: boolean; isPosition: boolean };
  tonicNote: NotePitch | null;
  instrument: Instruments;
};

const Strings: FC<Props> = ({
  currentTuning,
  isNoteInScale,
  tonicNote,
  instrument,
}) => {
  const stringsRef = useRef<HTMLDivElement>(null);
  const scale = useInstrumentStore((s) => s.scale);
  const contentKey = `${scale.scalePattern}-${scale.tonicNote}`;
  const { contextSafe } = useGSAP({ scope: stringsRef });

  const onEnter = contextSafe(() => {
    if (!stringsRef.current) return;

    const strings = stringsRef.current.querySelectorAll("section");
    gsap.set(strings, { y: -8, opacity: 0 });

    strings.forEach((string, index) => {
      const notesInString = string.querySelectorAll("[data-note]");

      gsap.set(notesInString, { y: -4, opacity: 0 });

      const stringTimeline = gsap.timeline({
        delay: index * 0.04,
      });

      stringTimeline
        .to(string, {
          y: 0,
          opacity: 1,
          duration: 0.2,
          ease: "none",
        })
        .to(
          notesInString,
          {
            y: 0,
            opacity: 1,
            duration: 0.2,
            stagger: 0.01,
            ease: "none",
          },
          "-=0.1"
        );
    });
  });

  const onExit = contextSafe(() => {
    if (!stringsRef.current) return;
    gsap.to(stringsRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "none",
    });
  });

  return (
    <SwitchTransition>
      <Transition
        key={contentKey}
        timeout={{ enter: 400, exit: 300 }}
        nodeRef={stringsRef}
        onEnter={onEnter}
        onExit={onExit}
        unmountOnExit
        mountOnEnter
        appear
      >
        <section
          ref={stringsRef}
          className="row-start-1 col-start-1 w-full z-10"
        >
          {currentTuning
            .map((openString, stringIndex) => (
              <String
                stringIndex={stringIndex}
                key={stringIndex}
                openString={openString}
                isNoteInScale={isNoteInScale}
                tonicNote={tonicNote}
                instrument={instrument}
              />
            ))
            .reverse()}
        </section>
      </Transition>
    </SwitchTransition>
  );
};

export default Strings;
