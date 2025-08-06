"use client";
import Image from "next/image";
import { type FC } from "react";

import { useNavStore } from "@/hooks/useNavStore";
import modeNoteLogo from "@/assets/mode-note-logo.svg";
import React from "react";
import { Cog, SlidersHorizontal } from "lucide-react";
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
    <nav className="w-full fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-2 max-w-screen">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="cursor-pointer p-3 xl:p-4 bg-black rounded-full text-grey-light hover:text-white"
        aria-label="settings"
      >
        <SlidersHorizontal className="size-5 xl:size-6" strokeWidth={2} />
      </button>

      <Image
        src={modeNoteLogo}
        alt="Logo"
        className="w-auto h-7 xl:h-8 fixed left-1/2 top-4 -translate-x-1/2"
        priority
        quality={80}
      />
      <section className="rounded-full flex bg-black items-center justify-center">
        <div className="w-12 md:w-40 xl:w-48 ml-3 xl:ml-4">
          <MetronomeController />
        </div>

        <button
          onClick={() => setIsMetronomeOpen(true)}
          className="cursor-pointer rounded-full p-3 xl:p-4"
          aria-label="metronome"
        >
          <Cog
            className="size-6 xl:size-8 text-grey-light hover:text-white"
            strokeWidth={1.5}
          />
        </button>
      </section>
    </nav>
  );
};

export default Nav;
