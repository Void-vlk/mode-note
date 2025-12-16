"use client";
import { type FC } from "react";
import WhiteKey from "@/components/keys/WhiteKey";
import BlackKey from "@/components/keys/BlackKey";
import { KEYBOARD_KEYS } from "@/resources/keyboard-controls";

type Props = {
  onPointerDown: (code: string) => void;
  onPointerUp: (code: string) => void;
};

const Keys: FC<Props> = ({ onPointerDown, onPointerUp }) => {
  const whiteKeys = KEYBOARD_KEYS.filter((k) => !k.isBlack);
  const blackKeys = KEYBOARD_KEYS.filter((k) => k.isBlack);

  const whiteKeyIndexMap: Record<string, number> = {};
  whiteKeys.forEach((key, index) => {
    whiteKeyIndexMap[`${key.octave}:${key.pitchIndex}`] = index;
  });

  return (
    <div className="relative rounded-b-md bg-neutral-800 px-2 pb-4 pt-3 max-h-[50vh]">
      <div
        className="relative z-[1] grid grid-cols-[repeat(58,minmax(14px,1fr))] gap-x-0.5"
        role="group"
        aria-label="Piano white keys"
      >
        {whiteKeys.map((key, whiteIndex) => (
          <WhiteKey
            key={key.id}
            code={key.code}
            label={key.label}
            pitchIndex={key.pitchIndex}
            gridColumnStart={1 + 2 * whiteIndex}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute left-2 right-2 top-3 z-[2] grid grid-cols-[repeat(58,minmax(14px,1fr))] gap-x-0.5"
        role="group"
        aria-label="Piano black keys"
      >
        {blackKeys.map((key) => {
          const anchorPitch = (key.pitchIndex + 11) % 12;
          const whiteIndex = whiteKeyIndexMap[`${key.octave}:${anchorPitch}`];
          if (whiteIndex == null) return null;

          return (
            <BlackKey
              key={key.id}
              code={key.code}
              label={key.label}
              pitchIndex={key.pitchIndex}
              gridColumnStart={1 + 2 * whiteIndex + 1}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Keys;
