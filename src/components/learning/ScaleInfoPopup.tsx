"use client";
import { X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, ReactNode, useMemo, useRef } from "react";
import { Transition } from "react-transition-group";

import { useNavStore } from "@/hooks/useNavStore";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { Scales, SCALES } from "@/resources/scales";
import type { NotePitch } from "@/resources/themes";
import { getNoteName } from "@/hooks/getNoteValues";
import {
  buildModesDirectoryForSelection,
  getStepsFromPattern,
  MODE_ROTATION_INDEX,
  type RelativeModesDirectory,
  rotatePatternForMode,
} from "@/resources/relative-scales";
import { twJoin } from "tailwind-merge";

const ScaleInfoPopup: FC = () => {
  const container = useRef<HTMLDivElement>(null);

  const isScaleInfoOpen = useNavStore((s) => s.isScaleInfoOpen);
  const setIsScaleInfoOpen = useNavStore((s) => s.setIsScaleInfoOpen);
  const scalePattern = useInstrumentStore((s) => s.scale.scalePattern);
  const tonicNote = useInstrumentStore((s) => s.scale.tonicNote);
  const isSharp = useInstrumentStore((s) => s.isSharp);

  const directory = useMemo<RelativeModesDirectory | null>(() => {
    if (tonicNote === null) return null;
    return buildModesDirectoryForSelection(scalePattern, tonicNote);
  }, [scalePattern, tonicNote]);

  const showRelativeMajor = scalePattern !== Scales.Major;
  const showRelativeMinor = scalePattern !== Scales.Minor;

  const scaleName = SCALES[scalePattern].name;
  const selectedMode = MODE_ROTATION_INDEX[scalePattern]!;
  const majorScalePattern = SCALES[Scales.Major].pattern; // 0,2,4,5,7,9,11
  const { rotatedPattern: selectedPattern } = rotatePatternForMode(
    majorScalePattern,
    selectedMode
  );
  const scaleSteps = getStepsFromPattern(selectedPattern);
  const scaleIntervals = SCALES[scalePattern].intervals;
  const scaleNotePitches = selectedPattern.map(
    (offset) => ((tonicNote! + offset) % 12) as NotePitch
  );

  const { contextSafe } = useGSAP({ scope: container });

  const onEnter = contextSafe(() => {
    gsap.fromTo(
      container.current!,
      { opacity: 0, xPercent: -120 },
      { opacity: 1, xPercent: 0, duration: 0.4, ease: "none" }
    );
  });

  const onExit = contextSafe(() => {
    gsap.to(container.current!, {
      xPercent: -120,
      duration: 0.4,
      opacity: 0,
      ease: "none",
      onComplete: () => setIsScaleInfoOpen(false),
    });
  });

  return (
    <Transition
      in={isScaleInfoOpen}
      timeout={400}
      nodeRef={container}
      onEnter={onEnter}
      onExit={onExit}
      mountOnEnter
      unmountOnExit
      appear
    >
      <section
        ref={container}
        className="border px-2 pt-2 fixed top-16 left-0 md:left-34 max-w-sm md:max-w-xl w-full rounded-2xl bg-black/95 z-20"
      >
        {directory && directory.baseScaleId !== Scales.Chromatic ? (
          <div className="grid grid-cols-2 md:gap-2 relative">
            <CloseButton className="-top-1 md:top-0" />

            <section className="text-sm md:p-2 p-1 w-full flex flex-col py-6 md:py-1 md:pr-6">
              <h2 className="text-xl text-white/90 border-b border-grey-light pb-0.5">
                {getNoteName(tonicNote, isSharp)} {scaleName}
              </h2>
              <p className="mt-2">Notes:</p>
              <div className="space-x-1 flex">
                {scaleNotePitches.map((pitch, index) => (
                  <TextUnit key={index} pitch={pitch}>
                    {getNoteName(pitch, isSharp)}
                  </TextUnit>
                ))}
              </div>
              <p className="mt-2">Intervals:</p>
              <div className="space-x-1 flex">
                {scaleIntervals.map((intervals, index) => (
                  <TextUnit key={index} pitch={scaleNotePitches[index]}>
                    {intervals}
                  </TextUnit>
                ))}
              </div>
              <p className="mt-2">Steps:</p>
              <div className="space-x-1 flex">
                {scaleSteps.map((step, index) => (
                  <TextUnit key={index}>{step}</TextUnit>
                ))}
              </div>
            </section>

            {/* SCALES */}
            <div className="text-sm grid grid-cols-2 py-6 md:py-1">
              <h3 className="font-semibold col-span-full border-b border-grey-light w-full pt-1.5 pb-1 px-1 mb-0.5">
                Relative Scales / Modes
              </h3>

              <ul className="space-y-1 text-sm pt-2 px-2">
                {/* Show relative major if minor key */}
                {showRelativeMajor && (
                  <li>
                    {getNoteName(directory.relativeMajorPitch, isSharp)} Major
                  </li>
                )}
                {/* Show relative minor if major key */}
                {showRelativeMinor && (
                  <li>
                    {getNoteName(directory.relativeMinorPitch, isSharp)} Minor
                  </li>
                )}
              </ul>

              {/* MODES */}
              <ul className="space-y-1 text-sm pt-2 px-1 text-nowrap">
                {directory.modes.map((mode) => (
                  <li key={mode.rotationIndex}>
                    {getNoteName(mode.modalTonicPitch, isSharp)}
                    {"  "}
                    {mode.modeName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-base text-white/90 px-2 pb-2">
            Select a Tonic note & Mode for info.
            <CloseButton className="top-1 right-2" />
          </p>
        )}
      </section>
    </Transition>
  );
};

export default ScaleInfoPopup;

type Props = {
  children: ReactNode;
  pitch?: NotePitch | string;
};

const TextUnit: FC<Props> = ({ children, pitch }) => {
  const tonic = useInstrumentStore((s) => s.scale.tonicNote);

  const fifth = ((tonic! + 7) % 12) as NotePitch;
  const bgColour =
    pitch == null
      ? "bg-white/10"
      : pitch === tonic
        ? "bg-(--tonic-colour)"
        : pitch === fifth
          ? "bg-(--note-colour)"
          : "bg-white/10";
  return (
    <p
      className={twJoin(
        "rounded w-7 h-5 flex justify-center items-center",
        bgColour
      )}
    >
      {children}
    </p>
  );
};

const CloseButton: FC<{ className: string }> = ({ className }) => {
  const setIsScaleInfoOpen = useNavStore((s) => s.setIsScaleInfoOpen);
  return (
    <button
      className={twJoin(
        "absolute right-0.5 p-1 cursor-pointer group",
        className
      )}
      onClick={() => setIsScaleInfoOpen(false)}
    >
      <X
        className="text-white/80 size-6 xl:size-7 hover:text-white"
        strokeWidth={1.5}
      />
    </button>
  );
};
