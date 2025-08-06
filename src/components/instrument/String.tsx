"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, useRef } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { twJoin } from "tailwind-merge";

import Note from "@/components/instrument/Note";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { STRING_THICKNESS, type NotePitch } from "@/resources/themes";
import { Instruments } from "@/resources/types";

type Props = {
  openString: NotePitch;
  isNoteInScale: (
    p: NotePitch,
    stringIndex?: number,
    fretNumber?: number
  ) => { show: boolean; isPosition: boolean };
  tonicNote: NotePitch | null;
  stringIndex: number;
};

const String: FC<Props> = ({
  openString,
  isNoteInScale,
  tonicNote,
  stringIndex,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const instrument = useInstrumentStore((s) => s.instrument);
  const fretQuantity = useInstrumentStore((s) => s.fretQuantity);
  const stringQty = useInstrumentStore((s) => s.stringQty);
  const scale = useInstrumentStore((s) => s.scale);
  const tuning = useInstrumentStore((s) => s.currentTuning);

  const { contextSafe } = useGSAP({ scope: container });

  const transitionKey = `${fretQuantity}-${instrument}-${scale.scalePattern}-${scale.tonicNote}-${stringQty}-${tuning.join("-")}`;

  const onEnter = contextSafe(() => {
    if (!container.current) return;

    gsap.fromTo(
      container.current.children,
      { y: -4, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.2,
        stagger: 0.02,
        ease: "power2.out",
      }
    );
  });

  const onExit = contextSafe(() => {
    if (container.current) {
      gsap.to(container.current.children, {
        opacity: 0,
        duration: 0.2,
        ease: "none",
      });
    }
  });

  // useGSAP(
  //   () => {
  //     if (container.current) {
  //       gsap.fromTo(
  //         container.current.children,
  //         { y: -4, opacity: 0 },
  //         { y: 0, opacity: 1, duration: 0.2, stagger: 0.02, ease: "none" }
  //       );
  //     }
  //   },
  //   {
  //     dependencies: [fretQuantity, instrument, scale, stringQty, tuning],
  //     scope: container,
  //   }
  // );

  const openNoteResult = isNoteInScale(openString, stringIndex, 0);

  return (
    <SwitchTransition>
      <Transition
        key={transitionKey}
        timeout={200}
        nodeRef={container}
        onEnter={onEnter}
        onExit={onExit}
        unmountOnExit
        mountOnEnter
        appear
      >
        <section
          ref={container}
          className={twJoin(
            "relative w-full flex items-center ml-0.5 pr-3",
            instrument === Instruments.Guitar
              ? "my-1 lg:my-1.25 lg:first:mt-1 lg:last:mb-1"
              : "my-1.75 lg:my-3 lg:first:mt-1.5 lg:last:mb-1.5"
          )}
        >
          <StringLine stringIndex={stringIndex} />

          <Note
            key="open"
            notePitchValue={openString}
            showDot={openNoteResult.show}
            isTonic={tonicNote !== null && openString === tonicNote}
            isOpenNote={true}
            isPosition={openNoteResult.isPosition}
          />

          {Array.from({ length: fretQuantity }).map((_, noteNumber) => {
            const fretNumber = noteNumber + 1;
            const notePitch: NotePitch = ((openString + fretNumber) %
              12) as NotePitch;
            const noteResult = isNoteInScale(
              notePitch,
              stringIndex,
              fretNumber
            );

            return (
              <Note
                key={fretNumber}
                notePitchValue={notePitch}
                showDot={noteResult.show}
                isTonic={tonicNote !== null && notePitch === tonicNote}
                isOpenNote={false}
                isPosition={noteResult.isPosition}
              />
            );
          })}
        </section>
      </Transition>
    </SwitchTransition>
  );
};

export default String;

const StringLine: FC<{ stringIndex: number }> = ({ stringIndex }) => {
  const instrument = useInstrumentStore((s) => s.instrument);
  const stringQty = useInstrumentStore((s) => s.stringQty);

  const getStringThickness = (): string => {
    const thicknesses =
      STRING_THICKNESS[instrument][
        stringQty as keyof (typeof STRING_THICKNESS)[typeof instrument]
      ];
    return thicknesses[stringIndex] || thicknesses[0];
  };

  return (
    <div
      className={twJoin(
        `absolute w-full top-1/2 bg-(--string-colour) transform -translate-y-1/2`,
        getStringThickness()
      )}
    />
  );
};
