"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, useMemo, useRef } from "react";
import { SwitchTransition, Transition } from "react-transition-group";

import { useInstrumentStore } from "@/stores/useInstrumentStore";
import { getScalePositionFretRange } from "@/hooks/getScalePositions";
import Fretboard from "@/components/instrument/Fretboard";
import Strings from "@/components/instrument/Strings";
import { Scales, SCALES, SCALE_POSITIONS } from "@/resources/scales";
import type { NotePitch } from "@/resources/themes";
import { ScalePosition } from "@/resources/types";
import { useThemeStore } from "@/stores/useThemeStore";

type Props = { show?: boolean };

const Instrument: FC<Props> = ({}) => {
  const container = useRef<HTMLDivElement>(null);

  const instrument = useInstrumentStore((s) => s.instrument);
  const currentTuning = useInstrumentStore((s) => s.currentTuning);
  const scale = useInstrumentStore((s) => s.scale);
  const scalePosition = useInstrumentStore((s) => s.scalePosition);
  const scalePositionMode = useInstrumentStore((s) => s.scalePositionMode);
  const fretQuantity = useInstrumentStore((s) => s.fretQuantity);
  const stringQty = useInstrumentStore((s) => s.stringQty);
  const isRightHanded = useInstrumentStore((s) => s.isRightHanded);
  const customSelectionMode = useThemeStore((s) => s.customSelectionMode);

  const instrumentKey = `${instrument}-${stringQty}-${fretQuantity}-${isRightHanded}-${customSelectionMode}`;

  const { contextSafe } = useGSAP({ scope: container });

  const onEnter = contextSafe(() => {
    if (!container.current) return;

    gsap.fromTo(
      container.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.3,
        ease: "none",
        delay: 0.1,
      }
    );
  });

  const onExit = contextSafe(() => {
    if (!container.current) return;
    gsap.to(container.current, {
      opacity: 0,
      duration: 0.3,
      ease: "none",
    });
  });

  const isCustomSelectionMode = () => {
    // Always show all notes in custom mode, not just selected ones
    return { show: true, isPosition: false };
  };

  const isNoteInScale = useMemo(() => {
    const scalePattern = SCALES[scale.scalePattern as Scales];
    if (!scalePattern) return () => false;

    const tonicNote = scale.tonicNote ?? 0;

    // used Set for faster lookup of scale notes
    const scaleNotes = new Set(
      scalePattern.pattern.map((interval) => (interval + tonicNote) % 12)
    );

    return (notePitch: NotePitch) => scaleNotes.has(notePitch);
  }, [scale.scalePattern, scale.tonicNote]);

  const getPositionFretRange = useMemo(() => {
    if (scalePosition === ScalePosition.All) return [];

    return SCALE_POSITIONS[scalePosition]?.fretRange || [];
  }, [scalePosition]);

  const isNoteInPositionFretRange = useMemo(() => {
    if (scalePosition === ScalePosition.All) return null;

    const scalePattern = SCALES[scale.scalePattern as Scales];
    if (!scalePattern) return null;

    const positionData = SCALE_POSITIONS[scalePosition];
    if (!positionData) return null;

    const stringFrets = getScalePositionFretRange(
      scalePattern.pattern,
      currentTuning,
      positionData.fretRange,
      scale.tonicNote!,
      scalePositionMode
    );

    const fretLookup = new Map<number, Set<number>>();
    stringFrets.forEach((frets, stringIndex) => {
      fretLookup.set(stringIndex, new Set(frets));
    });

    return fretLookup;
  }, [scale, scalePosition, scalePositionMode, currentTuning]);

  const isNoteInScalePosition = useMemo(() => {
    return (
      notePitch: NotePitch,
      stringIndex?: number,
      fretNumber?: number
    ): { show: boolean; isPosition: boolean } => {
      if (customSelectionMode) {
        return isCustomSelectionMode();
      }

      if (!isNoteInScale(notePitch)) {
        return { show: false, isPosition: false };
      }

      // if showing all positions, always show
      if (scalePosition === ScalePosition.All) {
        return { show: true, isPosition: true };
      }

      if (
        isNoteInPositionFretRange &&
        stringIndex !== undefined &&
        fretNumber !== undefined
      ) {
        const stringFrets = isNoteInPositionFretRange.get(stringIndex);
        const isInPositionRange = stringFrets
          ? stringFrets.has(fretNumber)
          : false;

        return {
          show: true,
          isPosition: isInPositionRange,
        };
      }

      // if specific position, check if fret is in range
      if (fretNumber !== undefined && getPositionFretRange) {
        const isInPositionRange = getPositionFretRange.includes(fretNumber);
        return {
          show: true,
          isPosition: isInPositionRange,
        };
      }

      return { show: true, isPosition: false };
    };
  }, [
    isNoteInScale,
    scalePosition,
    getPositionFretRange,
    isNoteInPositionFretRange,
    customSelectionMode,
  ]);

  return (
    <SwitchTransition>
      <Transition
        key={instrumentKey}
        timeout={{ enter: 400, exit: 300 }}
        nodeRef={container}
        onEnter={onEnter}
        onExit={onExit}
        unmountOnExit
        mountOnEnter
        appear
      >
        <div
          ref={container}
          className="relative grid w-max lg:max-w-none lg:mx-auto ml-1"
        >
          <Fretboard className="row-start-1 col-start-1 w-full" />
          <Strings
            currentTuning={currentTuning}
            isNoteInScale={isNoteInScalePosition}
            tonicNote={scale.tonicNote}
            instrument={instrument}
          />
        </div>
      </Transition>
    </SwitchTransition>
  );
};

export default Instrument;
