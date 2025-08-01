"use client";
import Image from "next/image";
import { type FC } from "react";

import { useNavStore } from "@/hooks/useNavStore";
import modeNoteLogo from "@/assets/mode-note-logo.svg";
import React from "react";
import { SlidersHorizontal, Timer } from "lucide-react";
import dynamic from "next/dynamic";

const MetronomeController = dynamic(
  () => import("@/components/metronome/MetronomeController"),
  {
    ssr: false,
  }
);

const Nav: FC = () => {
  const setIsSidebarOpen = useNavStore((s) => s.setIsSidebarOpen);
  const setIsMetronomeOpen = useNavStore((s) => s.setIsMetronomeOpen);

  return (
    <nav className="fixed top-0 bg-black/90 left-0 right-0 z-10 flex w-full items-center justify-between border-b-2 px-4 py-1 md:py-1.5 xl:py-2">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="cursor-pointer p-1"
        aria-label="settings"
      >
        <SlidersHorizontal className="size-5 xl:size-6" strokeWidth={1.5} />
      </button>
      <Image
        src={modeNoteLogo}
        alt="Logo"
        className="w-auto h-6 md:h-7 xl:h-8"
        priority
        quality={80}
      />
      <section className="gap-2 flex">
        <MetronomeController />
        <button
          onClick={() => setIsMetronomeOpen(true)}
          className="cursor-pointer p-1"
          aria-label="metronome"
        >
          <Timer className="size-5 xl:size-8" strokeWidth={1.5} />
        </button>
      </section>
    </nav>
  );
};

export default Nav;
