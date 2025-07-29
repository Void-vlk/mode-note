"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, useRef } from "react";
import { twJoin } from "tailwind-merge";
import { useNavStore } from "@/hooks/useNavStore";
import { Transition } from "react-transition-group";

const MetronomeMenu: FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const isMetronomeOpen = useNavStore((state) => state.isMetronomeOpen);
  const setIsMetronomeOpen = useNavStore((state) => state.setIsMetronomeOpen);

  return (
    <Transition
      in={isMetronomeOpen}
      timeout={300}
      unmountOnExit
      mountOnEnter
      nodeRef={container}
      // onEnter={onEnter}
      // onExit={onExit}
    >
      {() => (
        <section
          ref={container}
          className="fixed inset-0 bg-black/80 z-30"
          onClick={() => setIsMetronomeOpen(false)}
        >
          <div className="absolute transition right-0 top-10 z-40 w-80 h-24 flex bg-white justify-center items-center text-red text-xl">
            Metronome Menu
          </div>
        </section>
      )}
    </Transition>
  );
};

export default MetronomeMenu;
