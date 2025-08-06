"use client";
import { type FC, useMemo, useRef } from "react";
import { twJoin } from "tailwind-merge";

import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import Fretboard from "@/components/instrument/Fretboard";
import String from "@/components/instrument/String";
import { Scales, SCALES, SCALE_POSITIONS } from "@/resources/scales";
import { NotePitch } from "@/resources/themes";
import { ScalePosition } from "@/resources/types";

type Props = { show?: boolean };

const Instrument: FC<Props> = ({}) => {
  const container = useRef<HTMLDivElement>(null);
  const currentTuning = useInstrumentStore((s) => s.currentTuning);
  const scale = useInstrumentStore((s) => s.scale);
  const scalePosition = useInstrumentStore((s) => s.scalePosition);
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
    <div
      ref={container}
      className={twJoin(
        "relative grid w-full min-w-4xl md:w-5xl",
        fretQuantity === 24
          ? "lg:w-6xl xl:w-7xl xl:-ml-8"
          : "lg:w-5xl xl:w-6xl2 xl:-ml-36"
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
              isNoteInScale={isNoteInScalePosition}
              tonicNote={scale.tonicNote}
            />
          ))
          .reverse()}
      </section>
    </div>
  );
};

export default Instrument;
