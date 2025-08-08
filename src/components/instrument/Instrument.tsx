"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, useMemo, useRef } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { twJoin } from "tailwind-merge";

import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import Fretboard from "@/components/instrument/Fretboard";
import Strings from "@/components/instrument/Strings";
import { Scales, SCALES, SCALE_POSITIONS } from "@/resources/scales";
import { NotePitch } from "@/resources/themes";
import { ScalePosition } from "@/resources/types";

type Props = { show?: boolean };

const Instrument: FC<Props> = ({}) => {
  const container = useRef<HTMLDivElement>(null);

  const instrument = useInstrumentStore((s) => s.instrument);
  const currentTuning = useInstrumentStore((s) => s.currentTuning);
  const scale = useInstrumentStore((s) => s.scale);
  const scalePosition = useInstrumentStore((s) => s.scalePosition);
  const fretQuantity = useInstrumentStore((s) => s.fretQuantity);
  const stringQty = useInstrumentStore((s) => s.stringQty);

  const instrumentKey = `${instrument}-${stringQty}-${fretQuantity}`;

  const { contextSafe } = useGSAP({ scope: container });

  const onEnter = contextSafe(() => {
    if (!container.current) return;

    gsap.fromTo(
      container.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.3,
        ease: "none",
        delay: 0.1,
      }
    );
  });

  const onExit = contextSafe(() => {
    if (!container.current) return;
    gsap.to(container.current, {
      opacity: 0,
      duration: 0.3,
      ease: "none",
    });
  });

  const isNoteInScale = useMemo(() => {
    // get scale pattern intervals
    const scalePattern = SCALES[scale.scalePattern as Scales];
    if (!scalePattern) return () => false;

    // transpose pattern to chosen tonic note
    const tonicNote = scale.tonicNote ?? 0;

    // create Set for fast lookup of scale notes
    const scaleNotes = new Set(
      scalePattern.pattern.map((interval) => (interval + tonicNote) % 12)
    );

    return (notePitch: NotePitch) => scaleNotes.has(notePitch);
  }, [scale.scalePattern, scale.tonicNote]);

  // get fret range for the position
  const getPositionFretRange = useMemo(() => {
    if (scalePosition === ScalePosition.All) return [];

    return SCALE_POSITIONS[scalePosition]?.fretRange || [];
  }, [scalePosition]);

  const isNoteInScalePosition = useMemo(() => {
    return (
      notePitch: NotePitch,
      _stringIndex?: number,
      fretNumber?: number
    ): { show: boolean; isPosition: boolean } => {
      if (!isNoteInScale(notePitch)) {
        return { show: false, isPosition: false };
      }
      // if showing all positions, always show
      if (scalePosition === ScalePosition.All) {
        return { show: true, isPosition: true };
      }
      // if specific position, check if fret is in range
      if (fretNumber !== undefined && getPositionFretRange) {
        const isInPositionRange = getPositionFretRange.includes(fretNumber);
        return {
          show: true,
          isPosition: isInPositionRange,
        };
      }
      return { show: true, isPosition: false };
    };
  }, [isNoteInScale, scalePosition, getPositionFretRange]);

  return (
    <SwitchTransition mode="out-in">
      <Transition
        key={instrumentKey}
        timeout={{ enter: 400, exit: 300 }}
        nodeRef={container}
        onEnter={onEnter}
        onExit={onExit}
        unmountOnExit
        mountOnEnter
        appear
      >
        <div
          ref={container}
          className={twJoin(
            "relative grid w-full min-w-4xl md:w-5xl",
            fretQuantity === 24
              ? "lg:w-6xl xl:w-7xl xl:-ml-8"
              : "lg:w-5xl xl:w-6xl2 xl:-ml-36",
          )}
        >
          <Fretboard className="row-start-1 col-start-1 w-full" />
          <Strings
            currentTuning={currentTuning}
            isNoteInScale={isNoteInScalePosition}
            tonicNote={scale.tonicNote}
            instrument={instrument}
          />
        </div>
      </Transition>
    </SwitchTransition>
  );
};

export default Instrument;
