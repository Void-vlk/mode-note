"use client";
import { type ReactNode, type FC, CSSProperties } from "react";
import { getNoteName } from "@/hooks/getNoteValues";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { Scales, SCALES } from "@/resources/scales";
import { NotePitch } from "@/resources/themes";

// highlighted sections - colour coded notes in scale
// outside ring - Notes
// middle ring - intervals
// inner ring - relative notes
// chords in scale

export const CircleOfFifths: FC = () => {
  // const setScale = useInstrumentStore((s) => s.setScale);
  const tonicNote = useInstrumentStore((s) => s.scale.tonicNote);
  const scalePattern = useInstrumentStore((s) => s.scale.scalePattern);
  const isSharp = useInstrumentStore((s) => s.isSharp);

  const noteOrder = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5] as const;
  const relativeNoteOrder = [9, 4, 11, 6, 1, 8, 3, 10, 5, 0, 7, 2] as const;

  const currentTonicNote = tonicNote ?? 0; // Default to C if none selected
  const displayScale =
    scalePattern === Scales.Chromatic
      ? Scales.Ionian
      : (scalePattern ?? Scales.Ionian);

  const { intervals, pattern } = SCALES[displayScale];
  const intervalsOrder = noteOrder.map((notePitch) => {
    const relativePosition = ((notePitch - currentTonicNote + 12) %
      12) as NotePitch;
    const scaleIndex = pattern.indexOf(relativePosition);
    return scaleIndex !== -1 ? intervals[scaleIndex] : "";
  });

  // const inner = Array.from({ length: 12 }, (_, i) => `${i + 1}`);

  return (
    <section className="select-none relative z-20 min-w-64 size-64 sm:size-80 md:size-[25rem] lg:size-[28rem] xl:size-[32rem] 2xl:size-[35rem]">
      <RingSection
        ratio={0.86}
        content={(index) => getNoteName(noteOrder[index], isSharp)}
      />
      <RingSection ratio={0.61} content={(index) => intervalsOrder[index]} />
      <RingSection
        ratio={0.37}
        content={(index) => getNoteName(relativeNoteOrder[index], isSharp)}
      />
    </section>
  );
};

type Props = {
  ratio: number; // Distance from center (0-50, where 50 is the edge)
  content: (index: number) => ReactNode;
};

export const RingSection: FC<Props> = ({ ratio, content }) => (
  <div className="absolute grid place-items-center min-w-64 size-64 sm:size-80 md:size-[25rem] lg:size-[28rem] xl:size-[32rem] 2xl:size-[35rem] [--unit:22rem] md:[--unit:25rem] lg:[--unit:28rem] xl:[--unit:32rem] 2xl:[--unit:35rem]">
    {Array.from({ length: 12 }).map((_, index) => {
      const angle = -90 + 30 * index; // 12 o'clock start, 30° steps
      return (
        <div
          key={index}
          className="col-start-1 row-start-1 flex items-center justify-center rounded-full text-lg lg:text-xl xl:text-2xl text-red font-bold border border-red size-8 md:size-10 xl:size-12"
          style={
            {
              // rotate → translateX(radius) → rotate back keeps text upright
              transform: `rotate(${angle}deg) translateX(calc((var(--unit) / 2) * ${ratio})) rotate(${-angle}deg)`,
            } as CSSProperties
          }
        >
          {content(index)}
        </div>
      );
    })}
  </div>
);