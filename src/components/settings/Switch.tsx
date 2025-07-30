import { forwardRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  isChecked?: boolean;
  isDisabled?: boolean;
  onChange?: () => void;
  iconLeft?: ReactNode | string;
  iconRight?: ReactNode | string;
  className?: string;
};

const Switch = forwardRef<HTMLInputElement, Props>(
  (
    {
      isChecked = false,
      isDisabled = false,
      onChange,
      iconLeft,
      iconRight,
      className,
    },
    ref
  ) => {
    return (
      <label
        className={twMerge(
          "pointer-events-auto relative inline-flex h-4.5 w-7.5 lg:h-5 lg:w-9 bg-white/90 hover:bg-white rounded-full border-none transition cursor-pointer",
          isChecked ? "" : "",
          isDisabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          className="absolute h-0 w-0 opacity-0"
          checked={isChecked}
          disabled={isDisabled}
          onChange={onChange}
        />
        <span
          className={twMerge(
            "inline-flex items-center justify-center text-sm lg:text-base font-bold absolute top-1/2 text-white select-none -translate-y-1/2 size-3.5 lg:size-4 rounded-full bg-black/80 shadow transition duration-200 ease-in-out transform",
            isChecked ? "translate-x-3.5 lg:translate-x-4.5" : "translate-x-0.5"
          )}
        >
          {isChecked ? iconRight : iconLeft}
        </span>
      </label>
    );
  }
);

Switch.displayName = "Switch";
export default Switch;
