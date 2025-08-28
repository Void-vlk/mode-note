"use client";
import { type FC, useRef } from "react";
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
  instrument: Instruments;
};

const String: FC<Props> = ({
  openString,
  isNoteInScale,
  tonicNote,
  stringIndex,
  instrument,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const fretQuantity = useInstrumentStore((s) => s.fretQuantity);

  const openNoteResult = isNoteInScale(openString, stringIndex, 0);

  return (
    <section
      ref={container}
      className={twJoin(
        "relative w-full flex items-center  ml-0.5 pr-3",
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
        stringIndex={stringIndex}
        fretNumber={0}
      />

      {Array.from({ length: fretQuantity }).map((_, noteNumber) => {
        const fretNumber = noteNumber + 1;
        const notePitch: NotePitch = ((openString + fretNumber) %
          12) as NotePitch;
        const noteResult = isNoteInScale(notePitch, stringIndex, fretNumber);

        return (
          <Note
            key={fretNumber}
            notePitchValue={notePitch}
            showDot={noteResult.show}
            isTonic={tonicNote !== null && notePitch === tonicNote}
            isOpenNote={false}
            isPosition={noteResult.isPosition}
            stringIndex={stringIndex}
            fretNumber={fretNumber}
          />
        );
      })}
    </section>
  );
};

export default String;

const StringLine: FC<{ stringIndex: number }> = ({ stringIndex }) => {
  const stringQty = useInstrumentStore((s) => s.stringQty);
  const instrument = useInstrumentStore((s) => s.instrument);
  const isRightHanded = useInstrumentStore((s) => s.isRightHanded);

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
        isRightHanded ? "left-0" : "right-0",
        getStringThickness()
      )}
    />
  );
};
