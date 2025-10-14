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
    <section className="select-none relative border border-yellow z-20 min-w-[22rem] size-[22rem] md:size-[25rem] lg:size-[28rem] xl:size-[32rem] 2xl:size-[35rem]">
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
  <div className="absolute grid place-items-center min-w-[22rem] size-[22rem] md:size-[25rem] lg:size-[28rem] xl:size-[32rem] 2xl:size-[35rem] [--unit:22rem] md:[--unit:25rem] lg:[--unit:28rem] xl:[--unit:32rem] 2xl:[--unit:35rem]">
    {Array.from({ length: 12 }).map((_, index) => {
      const angle = -90 + 30 * index; // 12 o'clock start, 30° steps
      return (
        <div
          key={index}
          className="col-start-1 row-start-1 flex items-center justify-center rounded-full text-lg lg:text-xl xl:text-2xl text-red font-bold border border-red size-8 md:size-10 xl:size-12"
          style={
            {
              // rotate → translateX(radius) → rotate back keeps labels upright
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

// const POSITIONS_OUTER: string[] = [
//   "left-[46%] top-[3%]", // 12 o'clock
//   "left-[68%] top-[9%]", // 1
//   "left-[83%] top-[25%]", // 2
//   "left-[89%] top-[46%]", // 3
//   "left-[83%] top-[68%]", // 4
//   "left-[67%] top-[83%]", // 5
//   "left-[46%] top-[89%]", // 6
//   "left-[25%] top-[83%]", // 7
//   "left-[9%] top-[68%]", // 8
//   "left-[3%]  top-[46%]", // 9
//   "left-[9%] top-[25%]", // 10
//   "left-[25%] top-[9%]", // 11
// ];

// const POSITIONS_MIDDLE: string[] = [
//   "left-[46%] top-[16%]", // 12 o'clock
//   "left-[61%] top-[20%]", // 1
//   "left-[72%] top-[31%]", // 2
//   "left-[76%] top-[46%]", // 3
//   "left-[72%] top-[61%]", // 4
//   "left-[62%] top-[72%]", // 5
//   "left-[46%] top-[76%]", // 6
//   "left-[31%] top-[72%]", // 7
//   "left-[20%] top-[61%]", // 8
//   "left-[16%] top-[46%]", // 9
//   "left-[20%] top-[31%]", // 10
//   "left-[31%] top-[20%]", // 11
// ];

// const POSITIONS_INNER: string[] = [
//   "left-[46%] top-[27%]", // 12 o'clock
//   "left-[55%] top-[30%]", // 1
//   "left-[62%] top-[37%]", // 2
//   "left-[65%] top-[46%]", // 3
//   "left-[62%] top-[55%]", // 4
//   "left-[55%] top-[62%]", // 5
//   "left-[46%] top-[65%]", // 6
//   "left-[37%] top-[62%]", // 7
//   "left-[30%] top-[55%]", // 8
//   "left-[27%] top-[46%]", // 9
//   "left-[30%] top-[37%]", // 10
//   "left-[37%] top-[30%]", // 11
// ];

/*


      // middle - intervals 
      {intervalsOrder.map((interval, index) => (
        <div
          key={`mid-${index}`}
          className={twJoin(
            "text-xl absolute text-blue rounded-full border border-black size-10 flex justify-center items-center",
            POSITIONS_MIDDLE[index]
          )}
        >
          {interval}
        </div>
      ))}

    //   inner - relative minor
      {inner.map((text, index) => (
        <div
          key={`index-${index}`}
          className={twJoin(
            "text-xl absolute text-green rounded-full border border-black size-10 flex justify-center items-center",
            POSITIONS_INNER[index]
          )}
        >
          {text}
        </div>
      ))
}

*/
