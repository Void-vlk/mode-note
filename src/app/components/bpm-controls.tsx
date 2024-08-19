"use client";

import ControlButton from "@/components/control-button";

type BpmControlsProps = {
  bpm: number;
  setBpm: (bpm: number) => void;
  id: string;
};

const BpmControls = ({ bpm, setBpm, id }: BpmControlsProps) => {
  const minBpm = 40;
  const maxBpm = 400;

  const increaseBpm = (amount: number) => {
    const newBpm = bpm + amount;
    if (newBpm <= maxBpm) {
      setBpm(newBpm);
    }
  };

  const decreaseBpm = (amount: number) => {
    const newBpm = bpm - amount;
    if (newBpm >= minBpm) {
      setBpm(newBpm);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full text-sm"
      id={id}
    >
      <span className="flex flex-row text-lg text-white w-full justify-center items-center select-none">
        {bpm} bpm
      </span>
      <div className="flex flex-row items-center justify-center gap-1">
        <ControlButton onClick={() => decreaseBpm(10)} variant="tunersMenu">
          <span className="font-bold tracking-tight">&lsaquo;-10</span>
        </ControlButton>
        <ControlButton onClick={() => decreaseBpm(5)} variant="tunersMenu">
          <span className="font-bold tracking-tight">&lsaquo;-5</span>
        </ControlButton>
        <ControlButton onClick={() => increaseBpm(5)} variant="tunersMenu">
          <span className="font-bold tracking-tight">&rsaquo;+5</span>
        </ControlButton>
        <ControlButton onClick={() => increaseBpm(10)} variant="tunersMenu">
          <span className="font-bold tracking-tight">&rsaquo;+10</span>
        </ControlButton>
      </div>
    </div>
  );
};

export default BpmControls;
