"use client";
import { X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, ReactNode, useEffect, useMemo, useRef } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { twJoin } from "tailwind-merge";

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
import { applySidebarOffset } from "@/resources/movement";

const ScaleInfoPopup: FC = () => {
  const container = useRef<HTMLDivElement>(null);

  const isScaleInfoOpen = useNavStore((s) => s.isScaleInfoOpen);
  const setHasScaleInfoContent = useNavStore((s) => s.setHasScaleInfoContent);
  const isSidebarOpen = useNavStore((s) => s.isSidebarOpen);
  const isMobile = useNavStore((s) => s.isMobile);
  const fretQuantity = useInstrumentStore((s) => s.fretQuantity);
  const isRightHanded = useInstrumentStore((s) => s.isRightHanded);
  const scalePattern = useInstrumentStore((s) => s.scale.scalePattern);
  const tonicNote = useInstrumentStore((s) => s.scale.tonicNote);
  const isSharp = useInstrumentStore((s) => s.isSharp);

  const directory = useMemo<RelativeModesDirectory | null>(() => {
    if (tonicNote === null) return null;
    return buildModesDirectoryForSelection(scalePattern, tonicNote);
  }, [scalePattern, tonicNote]);

  const hasScaleContent =
    directory && directory.baseScaleId !== Scales.Chromatic;

  useEffect(() => {
    setHasScaleInfoContent(isScaleInfoOpen && !!hasScaleContent);
  }, [isScaleInfoOpen, hasScaleContent, setHasScaleInfoContent]);

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
  const LEFT_OFFSET = isMobile ? 0 : 8;

  // Add sidebar offset logic
  useGSAP(
    () => {
      if (!container.current) return;
      applySidebarOffset(
        container.current,
        isSidebarOpen,
        fretQuantity,
        isRightHanded,
        0.3,
        LEFT_OFFSET
      );
    },
    { dependencies: [isSidebarOpen, fretQuantity, isRightHanded] }
  );

  useGSAP(() => {
    if (!container.current) return;
    const onResize = () => {
      applySidebarOffset(
        container.current!,
        isSidebarOpen,
        fretQuantity,
        isRightHanded,
        0.3,
        LEFT_OFFSET
      );
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isSidebarOpen, fretQuantity, isRightHanded]);

  const onEnter = contextSafe(() => {
    applySidebarOffset(
      container.current!,
      isSidebarOpen,
      fretQuantity,
      isRightHanded,
      0,
      LEFT_OFFSET
    );
    gsap
      .timeline()
      .fromTo(
        container.current!,
        { opacity: 0, xPercent: -100 },
        { opacity: 1, xPercent: 0, duration: 0.2, ease: "none" }
      )
      .fromTo(
        [".info-content", ".close"],
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.3,
          stagger: 0.04,
          ease: "power2.out",
        }
      );
  });

  const onExit = contextSafe(() => {
    gsap.to(container.current!, {
      duration: 0.2,
      opacity: 0,
      ease: "none",
    });
  });

  return (
    <SwitchTransition>
      <Transition
        key={
          !isScaleInfoOpen
            ? "unmounted"
            : directory && directory.baseScaleId !== Scales.Chromatic
              ? "scale-info"
              : "no-selection"
        }
        in={true}
        timeout={{ enter: 500, exit: 200 }}
        nodeRef={container}
        onEnter={onEnter}
        onExit={onExit}
        mountOnEnter
        unmountOnExit
        appear
      >
        {!isScaleInfoOpen ? (
          <div ref={container} className="hidden" />
        ) : hasScaleContent ? (
          <section
            ref={container}
            className="px-2 py-2 fixed top-16 md:top-18 left-0 lg:left-36 sm:max-w-sm md:max-w-xl w-full md:rounded-2xl bg-black/95 z-20"
          >
            <div className="grid grid-cols-2 md:gap-2 relative">
              <CloseButton className="-top-1.5 -mr-1.5 md:mr-0 md:top-0 close" />

              <section className="text-sm md:p-2 p-1 w-full flex flex-col md:py-6 pt-4 pb-1 md:pr-6">
                <h2 className="info-content text-xl text-white/90 border-b border-grey-light pb-0.5">
                  {getNoteName(tonicNote, isSharp)} {scaleName}
                </h2>
                <p className="mt-2 info-content">Notes:</p>
                <div className="space-x-1 flex info-content">
                  {scaleNotePitches.map((pitch, index) => (
                    <TextUnit key={index} pitch={pitch}>
                      {getNoteName(pitch, isSharp)}
                    </TextUnit>
                  ))}
                </div>
                <p className="mt-2 info-content">Intervals:</p>
                <div className="space-x-1 flex info-content">
                  {scaleIntervals.map((intervals, index) => (
                    <TextUnit key={index} pitch={scaleNotePitches[index]}>
                      {intervals}
                    </TextUnit>
                  ))}
                </div>
                <p className="mt-2 info-content">Steps:</p>
                <div className="space-x-1 flex info-content">
                  {scaleSteps.map((step, index) => (
                    <TextUnit key={index}>{step}</TextUnit>
                  ))}
                </div>
              </section>

              {/* SCALES */}
              <section className="text-sm grid grid-cols-2 md:py-6 pt-4 pb-1">
                <h3 className="info-content font-semibold col-span-full border-b border-grey-light w-full pt-1.5 pb-1 px-1 mb-0.5">
                  Relative Scales / Modes
                </h3>

                <ul className="space-y-1 text-sm pt-2 px-2">
                  {/* Show relative major if minor key */}
                  {showRelativeMajor && (
                    <li className="info-content">
                      {getNoteName(directory.relativeMajorPitch, isSharp)} Major
                    </li>
                  )}
                  {/* Show relative minor if major key */}
                  {showRelativeMinor && (
                    <li className="info-content">
                      {getNoteName(directory.relativeMinorPitch, isSharp)} Minor
                    </li>
                  )}
                </ul>

                {/* MODES */}
                <ul className="space-y-1 text-sm pt-2 px-1 text-nowrap info-content">
                  {directory.modes.map((mode) => (
                    <li key={mode.rotationIndex} className="info-content">
                      {getNoteName(mode.modalTonicPitch, isSharp)}
                      {"  "}
                      {mode.modeName}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </section>
        ) : (
          <section
            className="border px-2 py-2 fixed flex gap-1 items-center top-30 md:top-40 left-4 lg:left-32 rounded-2xl bg-black/95 z-20"
            ref={container}
          >
            <p className="info-content text-base text-white/90 pl-2">
              Select a Tonic note & Mode for info.
            </p>
            <CloseButton className="relative info-content" />
          </section>
        )}
      </Transition>
    </SwitchTransition>
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
