"use client";

import { useState, useEffect } from "react";
import { useCombiStore } from "@/lib/stores/combi-store";
import { useNavStore } from "@/lib/stores/nav-state";

import Nav from "@/components/nav";
import InstrumentFretboard from "@/components/instrument-fretboard";
// import Loading from "./loading";

export default function Home() {
  const { isLandscape } = useCombiStore();
  const { isMenuOpen, isMetronomeOpen } = useNavStore();
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, []);

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
      {/* {isLoading && <Loading />}
      {!isLoading && (
        <> */}
      <Nav />
      <div
        className={`transition-transform duration-300 mb-8 flex justify-center items-center w-full ${
          isLandscape ? "h-screen -rotate-90" : "h-full rotate-0"
        }`}
      >
        <InstrumentFretboard />
      </div>
      {/* </>
      )} */}
    </main>
  );
}
