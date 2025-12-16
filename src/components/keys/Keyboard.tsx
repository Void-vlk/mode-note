"use client";
import { type FC, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Transition } from "react-transition-group";

import Keys from "@/components/keys/Keys";
import SynthPads from "@/components/keys/SynthPads";
import KeyboardControls from "@/components/keys/KeyboardControls";
import { getNoteName } from "@/hooks/getNoteValues";
import { useKeyboardInput } from "@/hooks/getUserInput";
import {
  KEYBOARD_KEYS,
  type KeyDefinition,
} from "@/resources/keyboard-controls";
import { useInstrumentStore } from "@/stores/useInstrumentStore";
import useKeysStore from "@/stores/useKeysStore";

const Keyboard: FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const isSharp = useInstrumentStore((s) => s.isSharp);
  const pressedKeys = useKeysStore((s) => s.pressedKeys);
  const pressedPads = useKeysStore((s) => s.pressedPads);
  const octaveShift = useKeysStore((s) => s.octaveShift);

  const {
    onPianoPointerDown,
    onPianoPointerUp,
    onPadPointerDown,
    onPadPointerUp,
  } = useKeyboardInput();

  const { contextSafe } = useGSAP({ scope: container });

  const onEnter = contextSafe(() => {
    if (!container.current) return;

    const controls = container.current.querySelector(
      ".keyboard-section:nth-child(1)"
    );
    const pads = container.current.querySelector(
      ".keyboard-section:nth-child(2)"
    );
    const keys = Array.from(container.current.querySelectorAll("[data-key]"));

    // Sort keys by their gridColumnStart position to animate left to right
    // if a is smaller, key a goes first, if b is smaller, key b goes first.
    const sortedKeys = keys.sort((a, b) => {
      const aColumn = parseInt((a as HTMLElement).style.gridColumnStart || "0");
      const bColumn = parseInt((b as HTMLElement).style.gridColumnStart || "0");
      return aColumn - bColumn;
    });

    gsap.set([controls, pads, ...sortedKeys], { y: 4, opacity: 0 });

    gsap
      .timeline({ defaults: { ease: "none" } })
      .to([controls, pads], {
        y: 0,
        opacity: 1,
        duration: 0.2,
      })
      .to(
        sortedKeys,
        {
          y: 0,
          opacity: 1,
          duration: 0.2,
          stagger: 0.02,
          clearProps: "transform",
        },
        "-=0.1"
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

  const noteNowPlaying =
    Array.from(pressedKeys)
      .map((code): KeyDefinition | undefined =>
        KEYBOARD_KEYS.find((key) => key.code === code)
      )
      .filter((key): key is KeyDefinition => key !== undefined)
      .map((key) => {
        const noteName = getNoteName(key.pitchIndex, isSharp);
        return `${noteName}${key.octave + octaveShift}`;
      })
      .join(" · ") || " - ";

  return (
    <Transition
      in={true}
      timeout={300}
      nodeRef={container}
      onEnter={onEnter}
      onExit={onExit}
      appear
    >
      {() => (
        <div
          ref={container}
          className="mx-auto w-full max-w-[1200px] px-1 overflow-x-auto custom-scrollbar select-none"
        >
          <div className="rounded-xl bg-neutral-700 p-3 min-w-[1040px]">
            <div className="mb-4 grid grid-cols-[1fr_auto] gap-4">
              <div className="keyboard-section">
                <KeyboardControls noteNowPlaying={noteNowPlaying} />
              </div>
              <div className="keyboard-section">
                <SynthPads
                  pressedPads={pressedPads}
                  onPointerDown={onPadPointerDown}
                  onPointerUp={onPadPointerUp}
                />
              </div>
            </div>
            <div className="keyboard-section">
              <Keys
                onPointerDown={onPianoPointerDown}
                onPointerUp={onPianoPointerUp}
              />
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default Keyboard;
