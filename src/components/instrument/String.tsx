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
  const isRightHanded = useInstrumentStore((s) => s.isRightHanded);
  const openNoteResult = isNoteInScale(openString, stringIndex, 0);

  return (
    <section
      ref={container}
      className={twJoin(
        "relative w-full flex items-center",
        isRightHanded ? "pr-2" : "pl-2",
        instrument === Instruments.Guitar
          ? "my-1 lg:my-1.25 3xl:my-1.5 lg:first:mt-1 lg:last:mb-1 3xl:first:mt-1.25 3xl:last:mb-1.25"
          : "my-1.75 lg:my-3 3xl:my-4 lg:first:mt-1.5 lg:last:mb-1.5 3xl:first:mt-1.75 3xl:last:mb-1.75"
      )}
    >
      <StringLine stringIndex={stringIndex} />

      <div className="nut-spacing flex-shrink-0 h-full flex items-center justify-center">
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
      </div>

      {Array.from({ length: fretQuantity }).map((_, noteNumber) => {
        const fretNumber = noteNumber + 1;
        const notePitch: NotePitch = ((openString + fretNumber) %
          12) as NotePitch;
        const noteResult = isNoteInScale(notePitch, stringIndex, fretNumber);

        return (
          <div
            key={fretNumber}
            className="relative flex items-center justify-center flex-shrink-0 fret-spacing"
          >
            <Note
              notePitchValue={notePitch}
              showDot={noteResult.show}
              isTonic={tonicNote !== null && notePitch === tonicNote}
              isOpenNote={false}
              isPosition={noteResult.isPosition}
              stringIndex={stringIndex}
              fretNumber={fretNumber}
            />
          </div>
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
