"use client";
import { type FC, useMemo, useRef } from "react";
// import { Transition } from "react-transition-group";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import String from "@/components/instrument/String";
import { NotePitch } from "@/resources/themes";
import { Scales, SCALES } from "@/resources/scales";
import Fretboard from "@/components/instrument/Fretboard";
import { twJoin } from "tailwind-merge";

type Props = { show?: boolean };

const Instrument: FC<Props> = ({}) => {
  const container = useRef<HTMLDivElement>(null);
  const currentTuning = useInstrumentStore((s) => s.currentTuning);
  const scale = useInstrumentStore((s) => s.scale);
  const fretQuantity = useInstrumentStore((s) => s.fretQuantity);

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

  return (
    <div
      ref={container}
      className={twJoin(
        "relative grid w-full min-w-4xl md:w-5xl xl:-ml-8",
        fretQuantity === 24 ? "lg:w-6xl xl:w-7xl" : "lg:w-5xl xl:w-6xl"
      )}
    >
      <Fretboard className="row-start-1 col-start-1 w-full" />
      <section className="row-start-1 col-start-1 w-full z-10">
        {currentTuning
          .map((openString, stringIndex) => (
            <String
              stringIndex={stringIndex}
              key={stringIndex}
              openString={openString}
              isNoteInScale={isNoteInScale}
              tonicNote={scale.tonicNote}
            />
          ))
          .reverse()}
      </section>
    </div>
  );
};

export default Instrument;
