"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useCombiStore } from "@/lib/stores/combi-store";
import { useMetronomeStore } from "@/lib/stores/metronome-state";
import { useNavStore } from "@/lib/stores/nav-state";

// import { TbGuitarPick } from "react-icons/tb";
import { MdSettingsInputComponent } from "react-icons/md";
import { GiGuitarHead, GiGuitarBassHead } from "react-icons/gi";
import {
  IoPhoneLandscapeOutline,
  IoPhonePortraitOutline,
} from "react-icons/io5";
import {
  FaRobot,
  FaTree,
  FaVolumeHigh,
  FaVolumeXmark,
  FaPlay,
  FaStop,
} from "react-icons/fa6";
import { TbBulb, TbBulbOff } from "react-icons/tb";
import { PiMetronome } from "react-icons/pi";

import ControlButton from "@/components/control-button";
import Dropdown from "@/components/dropdown";
import Switch from "@/components/switch";
import TuneAll from "@/app/components/tune-all";
import BpmControls from "@/components/bpm-controls";
import MetronomeVisual from "@/components/metronome-visual";
import MetronomeAudio from "@/components/metronome-audio";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

const Nav = () => {
  const {
    showSharp,
    toggleSharp,
    showIntervals,
    toggleIntervals,
    selectedInstrument,
    isLandscape,
    toggleOrientation,
    resetSelection,
  } = useCombiStore();
  const {
    bpm,
    setBpm,
    selectedTimeSignature,
    isPlaying,
    togglePlay,
    isClick,
    toggleSoundType,
    isFlash,
    toggleFlash,
    isVolume,
    toggleVolume,
  } = useMetronomeStore();
  const { isMenuOpen, setIsMenuOpen, isMetronomeOpen, setIsMetronomeOpen } =
    useNavStore();

  //main menu
  const container = useRef<HTMLDivElement>(null);
  const [tl, setTl] = useState<gsap.core.Timeline>(() => gsap.timeline());
  //info menu
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [infoTl, setinfoTl] = useState<gsap.core.Timeline>(() =>
    gsap.timeline()
  );
  //metronome settings menu
  const [metronomeTl, setMetronomeTl] = useState<gsap.core.Timeline>(() =>
    gsap.timeline()
  );

  //main menu
  useGSAP(
    () => {
      const navMenu = gsap.utils.toArray("#item");
      tl.current = gsap
        .timeline()
        .fromTo(
          "#navbar",
          { y: 0, opacity: 1, visibility: "visible" },
          { y: 5, duration: 0.1, opacity: 0, visibility: "invisible" }
        )
        .fromTo(
          "#bg-overlay",
          { y: -1000, opacity: 0, visibility: "invisible" },
          {
            y: 0,
            opacity: 1,
            duration: 0.2,
            ease: "power2.inOut",
            visibility: "visible",
          }
        )
        .fromTo(
          navMenu,
          { y: -10, opacity: 0, visibility: "invisible" },
          {
            y: 0,
            opacity: 1,
            stagger: 0.04,
            ease: "power2.inOut",
            visibility: "visible",
          }
        )
        .reverse()
        .timeScale(2);
    },
    { scope: container, dependencies: [tl], revertOnUpdate: true }
  );

  useEffect(() => {
    tl.current?.reversed(!isMenuOpen);
  }, [isMenuOpen, tl]);

  //info menu
  useGSAP(
    () => {
      infoTl.current = gsap
        .timeline()
        .fromTo(
          "#info-overlay",
          { y: -1000, opacity: 0, visibility: "invisible" },
          {
            y: 0,
            opacity: 1,
            duration: 0.2,
            ease: "power2.inOut",
            visibility: "visible",
          }
        )
        .fromTo(
          ["#info", "p"],
          { y: -20, opacity: 0, visibility: "invisible" },
          {
            y: 0,
            opacity: 1,
            stagger: 0.04,
            ease: "power2.inOut",
            visibility: "visible",
          }
        )
        .reverse()
        .timeScale(2);
    },
    { scope: container, dependencies: [infoTl], revertOnUpdate: true }
  );

  useEffect(() => {
    infoTl.current?.reversed(!isInfoOpen);
  }, [isInfoOpen, infoTl]);

  //metronome menu
  useGSAP(
    () => {
      const metronomeMenu = gsap.utils.toArray("#metronome");
      metronomeTl.current = gsap
        .timeline()
        .fromTo(
          "#navbar",
          { opacity: 1, visibility: "visible" },
          { duration: 0.1, opacity: 0, visibility: "invisible" }
        )
        .fromTo(
          "#bg-metronome",
          { y: -1000, opacity: 0, visibility: "invisible" },
          {
            y: 0,
            opacity: 1,
            duration: 0.2,
            ease: "power2.inOut",
            visibility: "visible",
          }
        )
        .fromTo(
          metronomeMenu,
          { y: -10, opacity: 0, visibility: "invisible" },
          {
            y: 0,
            opacity: 1,
            stagger: 0.04,
            ease: "power2.inOut",
            visibility: "visible",
          }
        )
        .reverse()
        .timeScale(2);
    },
    { scope: container, dependencies: [metronomeTl], revertOnUpdate: true }
  );

  useEffect(() => {
    metronomeTl.current?.reversed(!isMetronomeOpen);
  }, [isMetronomeOpen, metronomeTl]);

  const headerIcon = () =>
    selectedInstrument.instrumentType === "guitar" ? (
      <GiGuitarHead className="text-white text-md" />
    ) : (
      <GiGuitarBassHead className="text-white text-md" />
    );

  return (
    <div
      ref={container}
      className="flex flex-col sticky top-0 items-center justify-center bg-gray-100 w-full sm:max-w-md mx-auto sm:rounded-b-2xl z-40"
    >
      {/* Header Nav */}
      <div className="w-full pb-2 gap-1">
        <div className="flex justify-between items-center text-center px-4">
          <ControlButton
            onClick={setIsMenuOpen}
            className="w-6 h-6 text-gray-500 hover:text-gray-800 cursor-pointer text-2xl mt-2 z-[90]"
            icon={<MdSettingsInputComponent />}
            id="navbar"
          />
          <Image
            src="/mode-note-gray.png"
            alt="mode note logo"
            width={100}
            height={40}
            className="mt-1"
            id="navbar"
          />
          <div
            id="navbar"
            className="flex flex-row justify-center items-center gap-2 mt-2"
          >
            <div className="flex justify-center items-center">
              {isFlash && (
                <MetronomeVisual
                  bpm={bpm}
                  isPlaying={isPlaying}
                  visualOn={isFlash}
                  timeSignature={selectedTimeSignature}
                />
              )}
              {isVolume && (
                <MetronomeAudio
                  bpm={bpm}
                  isPlaying={isPlaying}
                  timeSignature={selectedTimeSignature}
                />
              )}
            </div>
            <ControlButton
              onClick={togglePlay}
              icon={isPlaying ? <FaStop /> : <FaPlay />}
              className="flex justify-center items-center h-6 w-6 border-2 p-0 border-gray-500 rounded-full text-gray-500 hover:border-gray-800 hover:text-gray-800 cursor-pointer z-[90]"
              id="navbar"
            />
            <div id="navbar" className="font-bold text-xs text-gray-500">
              {bpm} bpm
            </div>
            <ControlButton
              // onClick={() => setIsMetronomeOpen(!isMetronomeOpen)}
              onClick={setIsMetronomeOpen}
              className="w-8 h-8 text-gray-500 hover:text-gray-700 cursor-pointer text-4xl z-[100]"
              icon={<PiMetronome />}
              id="navbar"
            />
          </div>
        </div>
      </div>
      {/* Main Settings Menu */}
      <div
        id="bg-overlay"
        className="fixed inset-0 min-h-screen w-full bg-gray-900 bg-opacity-80 transform -translate-y-full z-[70] overflow-auto"
      >
        <ControlButton
          onClick={setIsMenuOpen}
          className="w-6 h-6 text-gray-500 hover:text-gray-300 right-4 top-3 absolute cursor-pointer z-[90]"
          id="item"
        >
          <span className="text-4xl">&times;</span>
        </ControlButton>

        <div className="flex flex-col h-full w-full mx-auto text-center items-center justify-start gap-4 z-[80]">
          {/* <div className="item flex text-3xl lg:text-4xl font-bold text-gray-500 mt-2"><TbGuitarPick /></div> */}
          <Image
            priority
            src="/mode-note-white.png"
            alt="mode note logo"
            width={120}
            height={48}
            id="item"
          />
          <div id="item" className="text-5xl lg:text-7xl font-bold">
            {headerIcon()}
          </div>
          <div className="flex flex-col w-60 items-center justify-center gap-2">
            <Dropdown
              variant="instrument"
              buttonStyle="accordion"
              itemStyle="accordionItem"
              id="item"
            />
            <div
              id="item"
              className="flex flex-col text-center items-center border-2 border-gray-200 rounded-lg bg-gray-800 gap-2 w-full py-1"
            >
              <span id="item" className="text-gray-100 text-sm pt-1">
                Tune all strings up/down:
              </span>
              <TuneAll tunerStyle="tunersMenu" id="item" />

              <div className="flex flex-row">
                <Switch isActive={showSharp} onClick={toggleSharp} id="item">
                  {showSharp ? "#" : "b"}
                </Switch>
                <Switch
                  isActive={showIntervals}
                  onClick={toggleIntervals}
                  id="item"
                >
                  {showIntervals ? (
                    <span style={{ fontFamily: "Times New Roman" }}>III</span>
                  ) : (
                    <span>&#9835;</span>
                  )}
                </Switch>
                <Switch
                  isActive={isLandscape}
                  onClick={toggleOrientation}
                  id="item"
                >
                  {isLandscape ? (
                    <IoPhoneLandscapeOutline />
                  ) : (
                    <IoPhonePortraitOutline />
                  )}
                </Switch>
              </div>
            </div>
            <Dropdown
              variant="tonic"
              buttonStyle="accordion"
              itemStyle="accordionItem"
              id="item"
            />
            <Dropdown
              variant="scale"
              buttonStyle="accordion"
              itemStyle="accordionItem"
              id="item"
            />
            <div className="menu-item flex justify-between w-full">
              <ControlButton variant="menu" onClick={resetSelection} id="item">
                Reset
              </ControlButton>
              <ControlButton
                variant="menu"
                onClick={() => setIsInfoOpen(!isInfoOpen)}
                id="item"
              >
                <span className="text-2xl -mt-0.5">&#8505;</span>
              </ControlButton>
              <ControlButton variant="menu" onClick={setIsMenuOpen} id="item">
                OK
              </ControlButton>
            </div>
          </div>
        </div>
        {/* Info menu */}
        <div
          id="info-overlay"
          className="invisible fixed inset-0 flex items-center justify-center w-full bg-gray-900 bg-opacity-80 z-[150]"
        >
          <div
            className="flex flex-col justify-center items-center my-16 w-80 rounded-2xl text-white text-sm p-4 gap-2 border-2 bg-gray-900 z-[200]"
            id="info"
          >
            <Image
              src="/mode-note-white.png"
              alt="mode note logo"
              width={100}
              height={40}
              className="-mt-0.5"
              id="info"
            />
            <h2 className="text-lg text-center font-bold mt-2" id="info">
              How To Use
            </h2>
            <div className="w-full h-0.5 bg-gray-300" id="info"></div>
            <p>
              Start by selecting an Instrument, the Tonic note you want your
              scale to begin on, and the musical scale of your choice, to view
              the note positions on the instrument`&#39;`s fretboard.
            </p>
            <p>
              Choose between sharps or flats, musical note names or interval
              positions (roman numerals) and portrait or landscape view, with
              the toggle switches on the main menu.
            </p>
            <p>
              Adapt your instrument to your chosen tuning, using either the
              individual string tuners or by tuning all strings at once - each
              have tuning controls for plus and minus semitone (-/+1) & whole
              tone (-/+2).
            </p>
            <p>
              Play along with the built-in metronome, with bpm and time
              signature controls, plus a choice of sounds and visuals.
            </p>
            <ControlButton
              onClick={() => setIsInfoOpen(!isInfoOpen)}
              className="flex mt-2 text-gray-800 text-md bg-gray-300 hover:bg-green-600 hover:text-white hover:scale-105 rounded-lg px-2 font-bold z-50"
              id="info"
            >
              OK, LET&#39;S GO!
            </ControlButton>
          </div>
        </div>
      </div>

      {/* Metronome Settings */}
      <div
        id="bg-metronome"
        className="invisible fixed inset-0 min-h-screen w-full bg-gray-900 bg-opacity-80 transform -translate-y-full z-[70] overflow-auto"
      >
        <ControlButton
          onClick={setIsMetronomeOpen}
          className="w-6 h-6 text-gray-500 hover:text-gray-300 right-4 top-3 absolute cursor-pointer z-[90]"
          id="metronome"
        >
          <span className="text-4xl">&times;</span>
        </ControlButton>

        <div
          className="flex flex-col h-full w-full mx-auto text-center items-center justify-start z-[80]"
          id="metronome"
        >
          <div className="flex flex-col w-80 pb-8 px-16 items-center justify-center rounded-b-lg border-2 border-t-0 gap-2 bg-gray-800 bg-opacity-90">
            <Image
              src="/mode-note-white.png"
              alt="mode note logo"
              width={140}
              height={60}
              className="-mt-0.5"
              id="metronome"
            />
            <h2 className="font-semibold tracking-wide" id="metronome">
              Metronome
            </h2>
            <div
              className="h-10 w-10 flex justify-center items-center"
              id="metronome"
            >
              {isFlash && (
                <MetronomeVisual
                  bpm={bpm}
                  isPlaying={isPlaying}
                  visualOn={isFlash}
                  timeSignature={selectedTimeSignature}
                />
              )}
            </div>
            <PiMetronome
              className="text-gray-300 hover:text-gray-100 h-16 w-16 cursor-pointer"
              id="metronome"
              onClick={togglePlay}
            />

            <BpmControls bpm={bpm} setBpm={setBpm} id="metronome" />
            <p className="-mb-2 text-white" id="metronome">
              Time Signature:
            </p>
            <Dropdown
              variant="timeSignature"
              buttonStyle="accordion"
              itemStyle="accordionItem"
              id="metronome"
            />
            <p className="text-white" id="metronome">
              Sound & Visual Controls:
            </p>
            <div className="flex flex-row -mt-2">
              {/* sound type toggle */}
              <Switch
                isActive={isClick}
                onClick={toggleSoundType}
                id="metronome"
              >
                {isClick ? (
                  <FaTree className="text-sm" />
                ) : (
                  <FaRobot className="text-sm" />
                )}
              </Switch>

              {/* sound on/off */}
              <Switch isActive={isVolume} onClick={toggleVolume} id="metronome">
                {isVolume ? (
                  <FaVolumeHigh className="text-sm" />
                ) : (
                  <FaVolumeXmark className="text-sm" />
                )}
              </Switch>

              {/* flash on/off */}
              <Switch isActive={isFlash} onClick={toggleFlash} id="metronome">
                {isFlash ? (
                  <TbBulb className="text-sm" />
                ) : (
                  <TbBulbOff className="text-sm" />
                )}
              </Switch>
            </div>
            <ControlButton
              onClick={togglePlay}
              icon={isPlaying ? <FaStop /> : <FaPlay />}
              id="metronome"
              className="flex justify-center items-center h-10 w-10 border-2 mb-2 border-gray-300 rounded-full text-gray-300 hover:bg-gray-900 hover:border-white hover:text-white"
            />
            <ControlButton
              variant="menu"
              onClick={setIsMetronomeOpen}
              id="metronome"
              className="bg-transparent hover:bg-green-600 hover:text-white"
            >
              OK
            </ControlButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
