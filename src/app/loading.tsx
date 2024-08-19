"use client";

import { useRef } from "react";
import { Transition } from "react-transition-group";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Loading = () => {
  const waveRef = useRef<SVGPathElement>(null);
  const container = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: container });

  const onEnter = contextSafe(() => {
    const wave = waveRef.current;
    if (!wave) return;
    const pathLength = wave?.getTotalLength() || 300;

    gsap
      .timeline()
      .fromTo(
        "#image",
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.3 }
      )
      .fromTo(
        "svg,h3",
        { opacity: 0, scale: 2 },
        { opacity: 1, scale: 1, duration: 0.5 }
      )
      .to("h3", {
        duration: 1.5,
        text: { value: "Loading...", type: "diff" },
        ease: "none",
        repeat: 1,
      })
      .fromTo(
        wave,
        {
          strokeDashoffset: pathLength,
          strokeDasharray: pathLength,
        },
        {
          duration: 1.5,
          strokeDashoffset: 0,
          ease: "none",
          repeat: 1,
        },
        "<"
      );
  });

  // Animate the container out...
  const onExit = contextSafe(() => {
    gsap.to(["#image", "svg", "h3", container.current], {
      opacity: 0,
      duration: 0.5,
    });
  });

  return (
    <Transition
      timeout={1000}
      appear={true}
      onEnter={onEnter}
      onExit={onExit}
      unmountOnExit
      mountOnEnter
    >
      <div
        ref={container}
        className="fixed inset-0 z-[0] flex flex-col items-center gap-4 justify-center h-screen bg-gray-900 overflow-hidden"
      >
        <Image
          priority
          src="/mode-note-white.png"
          alt="mode note logo"
          width={150}
          height={60}
          id="image"
        />
        <svg
          className="mx-auto"
          width="200"
          height="100"
          viewBox="0 0 200 100"
          fill="none"
          stroke="green"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="300"
          strokeDashoffset="300"
        >
          <path ref={waveRef} d="M0 50 Q 50 0, 100 50 T 200 50" />
        </svg>
        <h3 className="text-lg text-white/40 text-center opacity-0">Loading</h3>
      </div>
    </Transition>
  );
};

export default Loading;
