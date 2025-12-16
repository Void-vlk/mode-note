"use client";
import { type FC } from "react";
import { twJoin } from "tailwind-merge";

type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  displayValue?: string;
  className?: string;
};

const InputSlider: FC<Props> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
  displayValue,
  className,
}) => {
  return (
    <div className={twJoin("flex items-center gap-2 px-1", className)}>
      <label className="text-sm text-white/60 min-w-18">
        {label}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.currentTarget.value))}
        className="flex-1 accent-(--note-colour) cursor-pointer"
        aria-label={label}
      />
      {displayValue && (
        <span className="text-xs text-white/60 min-w-12 text-right">
          {displayValue}
        </span>
      )}
    </div>
  );
};

export default InputSlider;
