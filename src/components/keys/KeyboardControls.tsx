"use client";
import { type FC } from "react";
import MenuSelectionList from "@/components/dropdowns/MenuSelectionList";
import InputSlider from "@/components/keys/InputSlider";
import OctaveRange from "@/components/keys/OctaveRange";
import { SoundWave } from "@/resources/soundwave";
import SharpToggle from "@/components/dropdowns/SharpToggle";
import useKeysStore from "@/stores/useKeysStore";
import { useInstrumentStore } from "@/stores/useInstrumentStore";
import { Scales } from "@/resources/scales";
import { getNoteName } from "@/hooks/getNoteValues";
import { FilterType } from "@/resources/soundwave";

type Props = {
  noteNowPlaying: string;
};

const KeyboardControls: FC<Props> = ({ noteNowPlaying }) => {
  const volume = useKeysStore((s) => s.volume);
  const setVolume = useKeysStore((s) => s.setVolume);
  const soundwave = useKeysStore((s) => s.soundwave);
  const setSoundwave = useKeysStore((s) => s.setSoundwave);
  const tonicNote = useInstrumentStore((s) => s.scale.tonicNote);
  const currentScale = useInstrumentStore((s) => s.scale.scalePattern);
  const isSharp = useInstrumentStore((s) => s.isSharp);
  const filterType = useKeysStore((s) => s.filterType);
  const setFilterType = useKeysStore((s) => s.setFilterType);
  const filterCutoff = useKeysStore((s) => s.filterCutoff);
  const setFilterCutoff = useKeysStore((s) => s.setFilterCutoff);
  const filterResonance = useKeysStore((s) => s.filterResonance);
  const setFilterResonance = useKeysStore((s) => s.setFilterResonance);
  const attack = useKeysStore((s) => s.attack);
  const setAttack = useKeysStore((s) => s.setAttack);
  const decay = useKeysStore((s) => s.decay);
  const setDecay = useKeysStore((s) => s.setDecay);
  const sustain = useKeysStore((s) => s.sustain);
  const setSustain = useKeysStore((s) => s.setSustain);
  const release = useKeysStore((s) => s.release);
  const setRelease = useKeysStore((s) => s.setRelease);
  const lfoRate = useKeysStore((s) => s.lfoRate);
  const setLfoRate = useKeysStore((s) => s.setLfoRate);
  const lfoDepth = useKeysStore((s) => s.lfoDepth);
  const setLfoDepth = useKeysStore((s) => s.setLfoDepth);
  const detune = useKeysStore((s) => s.detune);
  const setDetune = useKeysStore((s) => s.setDetune);
  const resetSynth = useKeysStore((s) => s.resetSynth);

  // Logarithmic conversion helpers
  const toLog = (value: number, min: number, max: number) => {
    const minLog = Math.log(min);
    const maxLog = Math.log(max);
    return (Math.log(value) - minLog) / (maxLog - minLog);
  };

  const fromLog = (normalized: number, min: number, max: number) => {
    const minLog = Math.log(min);
    const maxLog = Math.log(max);
    return Math.exp(minLog + normalized * (maxLog - minLog));
  };

  const tonicNoteName =
    tonicNote != null ? getNoteName(tonicNote, isSharp) : "";

  return (
    <section className="grid grid-cols-2 w-full gap-3">
      
      <div className="col-start-1 rounded-lg bg-neutral-900 flex flex-col justify-between py-3 px-3">
        <div className="flex items-center w-full gap-2">
          {currentScale === Scales.Chromatic || !tonicNoteName ? (
            <div className="border w-28 md:w-38 h-7 border-neutral-700 rounded-lg" />
          ) : (
            <h2 className="text-base md:text-lg w-28 md:min-w-38 font-medium capitalize text-white/80 border border-neutral-700 px-2 max-h-7 rounded truncate">
              {tonicNoteName} {currentScale}
            </h2>
          )}
          <div
            aria-live="polite"
            className="rounded border border-neutral-700 py-1 w-28 md:w-38 px-2 text-sm font-medium text-white/70 truncate"
            title="currently playing note(s)"
          >
            {noteNowPlaying}
          </div>
          <div className="flex items-center justify-end w-9 ml-auto">
            <SharpToggle />
          </div>
        </div>

        <OctaveRange />
        <InputSlider
          label="Volume"
          value={volume}
          onChange={setVolume}
          min={0}
          max={1}
          step={0.01}
        />
        <MenuSelectionList
          options={Object.values(SoundWave).map((value) => ({
            value,
            label: value,
            checked: soundwave === value,
            onSelect: () => setSoundwave(value),
          }))}
          className="grid-cols-4 -my-2 capitalize px-1"
        />
        <MenuSelectionList
          options={Object.values(FilterType).map((type) => ({
            label: type,
            value: type,
            checked: filterType === type,
            onSelect: () => setFilterType(type),
          }))}
          className="grid-cols-4 -mt-1 capitalize px-1"
        />
        <button
          onClick={resetSynth}
          className="text-xs py-1 cursor-pointer font-medium text-white/80 bg-neutral-800 hover:bg-neutral-700 rounded transition-colors"
        >
          Reset
        </button>
      </div>
      <div className="col-start-2 rounded-md bg-neutral-900 flex flex-col gap-1 py-2 px-3">
        <InputSlider
          label="Cutoff"
          value={toLog(filterCutoff, 20, 10000)}
          onChange={(v: number) => setFilterCutoff(fromLog(v, 20, 10000))}
          displayValue={`${Math.round(filterCutoff)}Hz`}
        />
        <InputSlider
          label="Resonance"
          value={filterResonance}
          onChange={setFilterResonance}
          min={0}
          max={10}
          step={0.1}
          displayValue={filterResonance.toFixed(1)}
        />
        <InputSlider
          label="Attack"
          value={toLog(attack, 0.001, 2)}
          onChange={(v: number) => setAttack(fromLog(v, 0.001, 2))}
          displayValue={`${attack.toFixed(3)}s`}
        />
        <InputSlider
          label="Decay"
          value={toLog(decay, 0.001, 2)}
          onChange={(v: number) => setDecay(fromLog(v, 0.001, 2))}
          displayValue={`${decay.toFixed(3)}s`}
        />
        <InputSlider
          label="Sustain"
          value={sustain}
          onChange={setSustain}
          displayValue={`${Math.round(sustain * 100)}%`}
        />
        <InputSlider
          label="Release"
          value={toLog(release, 0.01, 5)}
          onChange={(v: number) => setRelease(fromLog(v, 0.01, 5))}
          displayValue={`${release.toFixed(2)}s`}
        />
        <InputSlider
          label="LFO Rate"
          value={lfoRate}
          onChange={setLfoRate}
          min={0}
          max={20}
          step={0.1}
          displayValue={`${lfoRate.toFixed(1)}Hz`}
        />
        <InputSlider
          label="LFO Depth"
          value={lfoDepth}
          onChange={setLfoDepth}
          min={0}
          max={50}
          step={0.5}
          displayValue={lfoDepth.toFixed(1)}
        />
        <InputSlider
          label="Detune"
          value={detune}
          onChange={setDetune}
          min={0}
          max={20}
          step={0.5}
          displayValue={`${detune.toFixed(1)}cts`}
        />
      </div>
    </section>
  );
};

export default KeyboardControls;
