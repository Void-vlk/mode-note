"use client";
import { type FC } from "react";
import { twJoin } from "tailwind-merge";

export const CircleOfFifths: FC = () => {
  const outer = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const mid = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const inner = Array.from({ length: 12 }, (_, i) => `${i + 1}`);

  return (
    <section className="absolute size-full z-20 max-w-[32rem] max-h-[32rem]">
      {/* outer */}
      {outer.map((text, index) => (
        <div
          key={`outer-${index}`}
          className={twJoin(
            "text-xl absolute text-red rounded-full border border-black size-10 flex justify-center items-center",
            POSITIONS_OUTER[index]
          )}
        >
          {text}
        </div>
      ))}

      {/* middle */}
      {mid.map((text, index) => (
        <div
          key={`mid-${index}`}
          className={twJoin(
            "text-xl absolute text-blue rounded-full border border-black size-10 flex justify-center items-center",
            POSITIONS_MIDDLE[index]
          )}
        >
          {text}
        </div>
      ))}

      {/* inner */}
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
      ))}
    </section>
  );
};

const POSITIONS_OUTER: string[] = [
  "left-[68%] top-[9%]", // 1
  "left-[83%] top-[25%]", // 2
  "left-[89%] top-[46%]", // 3
  "left-[83%] top-[68%]", // 4
  "left-[67%] top-[83%]", // 5
  "left-[46%] top-[89%]", // 6
  "left-[25%] top-[83%]", // 7
  "left-[9%] top-[68%]", // 8
  "left-[3%]  top-[46%]", // 9
  "left-[9%] top-[25%]", // 10
  "left-[25%] top-[9%]", // 11
  "left-[46%] top-[3%]", // 12
];

const POSITIONS_MIDDLE: string[] = [
  "left-[61%] top-[20%]", // 1
  "left-[72%] top-[31%]", // 2
  "left-[76%] top-[46%]", // 3
  "left-[72%] top-[61%]", // 4
  "left-[62%] top-[72%]", // 5
  "left-[46%] top-[76%]", // 6
  "left-[31%] top-[72%]", // 7
  "left-[20%] top-[61%]", // 8
  "left-[16%] top-[46%]", // 9
  "left-[20%] top-[31%]", // 10
  "left-[31%] top-[20%]", // 11
  "left-[46%] top-[16%]", // 12
];

const POSITIONS_INNER: string[] = [
  "left-[55%] top-[30%]", // 1
  "left-[62%] top-[37%]", // 2
  "left-[65%] top-[46%]", // 3
  "left-[62%] top-[55%]", // 4
  "left-[55%] top-[62%]", // 5
  "left-[46%] top-[65%]", // 6
  "left-[37%] top-[62%]", // 7
  "left-[30%] top-[55%]", // 8
  "left-[27%] top-[46%]", // 9
  "left-[30%] top-[37%]", // 10
  "left-[37%] top-[30%]", // 11
  "left-[46%] top-[27%]", // 12
];
