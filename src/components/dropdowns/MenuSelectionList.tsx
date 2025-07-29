import { Instrument, StringQty, NotePitch } from "@/resources/types";
import { type FC } from "react";
import { twMerge } from "tailwind-merge";

type OptionValue = Instrument | StringQty | NotePitch | string;

type ListOption = {
  value: OptionValue;
  label: string;
  checked: boolean;
  onSelect: () => void;
};

type Props = {
  options: ListOption[];
  className?: string;
  canDeselect?: boolean;
  contentHeader?: string;
};

const MenuSelectionList: FC<Props> = ({
  canDeselect = false,
  className,
  options,
  contentHeader,
}) => (
  <>
    <h4 className="sub-header">{contentHeader}</h4>
    <div
      className={twMerge(
        "grid items-stretch grid-cols-2 gap-1.5 w-full mb-1.5 px-2",
        className
      )}
    >
      {options.map((option) => (
        <label
          key={`${option.value}`}
          className="flex justify-left text-[13px] lg:text-sm pt-0.5"
        >
          <input
            type={canDeselect ? "checkbox" : "radio"}
            value={String(option.value)}
            checked={option.checked}
            onChange={option.onSelect}
            className="peer absolute opacity-0 size-0"
          />
          <span className="items-center text-center justify-center px-1 flex select-none peer-checked:bg-green-700 border peer-checked:border-green-700 py-0.75 min-w-full cursor-pointer rounded-md text-white/90 hover:text-white">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  </>
);
export default MenuSelectionList;
