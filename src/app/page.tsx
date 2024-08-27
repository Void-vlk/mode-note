"use client";

import { useEffect } from "react";
import { useOrientationStore } from "@/lib/stores/orientation-state";
import { useNavStore } from "@/lib/stores/nav-state";

import Nav from "@/components/nav";
import InstrumentFretboard from "@/components/instrument-fretboard";

export default function Home() {
  const { isLandscape } = useOrientationStore();
  const { isMenuOpen, isMetronomeOpen } = useNavStore();

  //scroll lock when menus open / in landscape mode
  useEffect(() => {
    const body = document.body;
    if (isMenuOpen || isMetronomeOpen || isLandscape) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }
  }, [isMenuOpen, isMetronomeOpen, isLandscape]);

  return (
    <main className="min-h-screen">
      <Nav />
      <div
        className={`transition-transform duration-300 mb-8 flex justify-center items-center w-full ${
          isLandscape ? "h-screen -rotate-90" : "h-full rotate-0"
        }`}
      >
        <InstrumentFretboard />
      </div>
    </main>
  );
}
