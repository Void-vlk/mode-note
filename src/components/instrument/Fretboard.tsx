"use client";
import { type FC } from "react";

import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { twJoin } from "tailwind-merge";
import { Diamond, TriangleRight } from "lucide-react";

const Fretboard: FC<{ className: string }> = ({ className }) => {
  const fretQuantity = useInstrumentStore((s) => s.fretQuantity);
  const isRightHanded = useInstrumentStore((s) => s.isRightHanded);

  return (
    <section
      className={twJoin(
        "relative size-full bg-(--fretboard-colour) px-1 flex flex-nowrap border-b border-t border-white/10",
        className
      )}
    >
      <div
        className={twJoin(
          "nut-spacing h-full bg-(--headstock-bg) border-(--nut-colour)",
          isRightHanded ? "border-r-8 -ml-1" : "border-l-8 -mr-1"
        )}
      />
      {Array.from({ length: fretQuantity }).map((_, index) => {
        const isFirstFret = index === 0;
        const isLastFret = index === fretQuantity - 1;
        return (
          <div
            key={index}
            className="relative flex-shrink-0 h-full fret-spacing"
          >
            <div
              className={twJoin(
                "absolute inset-0 pointer-events-none border-l border-r xl:border-l-[1.5px] xl:border-r-[1.5px] 3xl:border-r-2 3xl:border-l-2",
                isFirstFret
                  ? "border-l-(--nut-colour) border-r-frets"
                  : "border-l-frets border-r-frets",
                isLastFret && "border-r-2 xl:border-r-[3px] 3xl:border-r-4"
              )}
            />
          </div>
        );
      })}

      <FretMarkers isTop={true} />
      <FretMarkers isTop={false} />
    </section>
  );
};

export default Fretboard;

const FretMarkers: FC<{
  isTop: boolean;
}> = ({ isTop = true }) => {
  const fretQuantity = useInstrumentStore((s) => s.fretQuantity);
  const isDiamond = useInstrumentStore((s) => s.isDiamond);
  const isRightHanded = useInstrumentStore((s) => s.isRightHanded);

  const showFretMarkers = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];

  return (
    <div
      className={twJoin(
        "absolute flex items-center justify-between left-0 right-0",
        isTop
          ? "-top-5.5 md:-top-7.5 xl:-top-8 3xl:-top-10"
          : "-bottom-4.5 md:-bottom-5.5 xl:-bottom-7 3xl:-bottom-11",
        isRightHanded
          ? "pl-12 pr-2 2xl:pl-14 3xl:pl-18"
          : "pr-12 pl-2 2xl:pr-14 3xl:pr-18"
      )}
    >
      {Array.from({ length: fretQuantity }).map((_, index) =>
        showFretMarkers.includes(index + 1) ? (
          <div
            key={index}
            className={twJoin(
              "h-5 md:h-6.5 xl:h-7 fret-spacing flex items-end text-frets/60",
              isDiamond ? "justify-center" : "justify-end"
            )}
          >
            {/* fret marker shapes */}
            {isDiamond ? (
              <Diamond className="size-4 md:size-5 xl:size-5.5 3xl:size-6 4xl:size-8" />
            ) : (
              <TriangleRight
                className={twJoin(
                  "rotate-90 size-4 md:size-5 xl:size-6 3xl:size-7 4xl:size-8",
                  isRightHanded && "scale-y-[-1]"
                )}
              />
            )}
            <p
              className={twJoin(
                "absolute 3xl:text-lg 4xl:text-xl xl:text-sm text-xs select-none",
                isTop
                  ? "-top-2.25 xl:-top-3 3xl:-top-4.5 4xl:-top-5.5"
                  : "xl:top-6.5 4xl:top-8 md:top-6 top-5",
                isDiamond ? "" : "mr-0.75"
              )}
            >
              {/* fret marker numbers */}
              {index + 1}
            </p>
          </div>
        ) : (
          <div
            key={index}
            className="w-7 h-5 lg:h-6 xl:h-7 3xl:h-9 fret-spacing"
          />
        )
      )}
    </div>
  );
};
