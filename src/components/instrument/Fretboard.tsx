"use client";
import { type FC } from "react";

import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { twJoin } from "tailwind-merge";
import { Diamond, TriangleRight } from "lucide-react";

const Fretboard: FC<{ className: string }> = ({ className }) => {
  const fretQuantity = useInstrumentStore((s) => s.fretQuantity);

  return (
    <section
      className={twJoin(
        "size-full bg-(--fretboard-colour) px-1 flex border-b border-t border-white/10",
        className
      )}
    >
      <div className="min-w-12 -ml-1 h-full border-r-8 bg-(--headstock-bg) border-(--nut-colour)" />
      {Array.from({ length: fretQuantity }).map((_, i) => (
        <div
          key={i}
          className="min-w-11 w-11 md:min-w-12 xl:min-w-13 border-r-2 border-r-frets"
        />
      ))}

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

  const showFretMarkers = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];

  return (
    <div
      className={twJoin(
        "absolute flex items-center justify-between left-0",
        fretQuantity === 24 ? "right-0" : "right-2",
        isTop ? "-top-5.5 md:-top-7.5" : "-bottom-4.5 md:-bottom-5.5",
        isDiamond
          ? "pl-12 lg:pl-11.75 xl:pl-11.75 pr-1.5"
          : "pl-12 lg:pl-12 lg:pr-1 xl:pl-11.75"
      )}
    >
      {Array.from({ length: fretQuantity }).map((_, i) =>
        showFretMarkers.includes(i + 1) ? (
          <div
            key={i}
            className={twJoin(
              "h-5 md:h-6.5 xl:h-7 fret-spacing flex items-end text-frets/60",
              isDiamond ? "justify-center" : "justify-end"
            )}
          >
            {isDiamond ? (
              <Diamond className="size-4 md:size-5" />
            ) : (
              <TriangleRight className="scale-y-[-1] rotate-90 size-4 md:size-5" />
            )}
            <p
              className={twJoin(
                "absolute xl:text-sm text-xs",
                isTop ? "-top-2.25" : "xl:top-6.5 md:top-6 top-5",
                isDiamond ? "" : "mr-0.75"
              )}
            >
              {i + 1}
            </p>
          </div>
        ) : (
          <div key={i} className="w-7 h-5 lg:h-6 xl:h-7 fret-spacing" />
        )
      )}
    </div>
  );
};
