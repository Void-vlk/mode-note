"use client";
import { type FC } from "react";
import Note from "@/components/instrument/Note";
import {
  Instrument,
  type NotePitch,
  STRING_THICKNESS,
} from "@/resources/types";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { twJoin } from "tailwind-merge";

type Props = {
  openString: NotePitch;
  isNoteInScale: (p: NotePitch) => boolean;
  tonicNote: NotePitch | null;
  stringIndex: number;
};

const String: FC<Props> = ({
  openString,
  isNoteInScale,
  tonicNote,
  stringIndex,
}) => {
  const instrument = useInstrumentStore((s) => s.instrument);
  const fretQuantity = useInstrumentStore((s) => s.fretQuantity);

  return (
    <section
      className={twJoin(
        "relative w-full flex items-center ml-0.5 pr-3",
        instrument === Instrument.Guitar
          ? "my-1 lg:my-1.25 lg:first:mt-1 lg:last:mb-1"
          : "my-1.75 lg:my-3 lg:first:mt-1.5 lg:last:mb-1.5"
      )}
    >
      <StringLine stringIndex={stringIndex} />

      <Note
        key="open"
        notePitchValue={openString}
        showDot={isNoteInScale(openString)}
        isTonic={tonicNote !== null && openString === tonicNote}
        isOpenNote={true}
      />

      {Array.from({ length: fretQuantity }).map((_, noteNumber) => {
        const fretNumber = noteNumber + 1;
        const notePitch: NotePitch = ((openString + fretNumber) %
          12) as NotePitch;

        return (
          <Note
            key={fretNumber}
            notePitchValue={notePitch}
            showDot={isNoteInScale(notePitch)}
            isTonic={tonicNote !== null && notePitch === tonicNote}
            isOpenNote={false}
          />
        );
      })}
    </section>
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
