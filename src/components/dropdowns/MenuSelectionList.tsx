import type { OptionValue } from "@/resources/themes";
import { type FC } from "react";
import { twMerge } from "tailwind-merge";

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
}) => {
  return (
    <>
      <p className="sub-header">{contentHeader}</p>
      <div
        className={twMerge(
          "grid items-stretch grid-cols-2 gap-1.5 w-full mb-1.5 px-2",
          className
        )}
      >
        {options.map((option) => {
          const key = optionKey(option.value);
          return (
            <label
              key={key}
              className="flex justify-left text-[13px] lg:text-sm pt-0.5"
            >
              <input
                type={canDeselect ? "checkbox" : "radio"}
                value={String(option.value)}
                checked={option.checked}
                onChange={option.onSelect}
                className="peer absolute opacity-0 size-0"
              />
              <span className="will-change-transform items-center text-center justify-center px-1 flex select-none peer-checked:bg-(--note-colour) border peer-checked:border-(--note-colour) peer-checked:text-(--note-text) py-0.75 min-w-full cursor-pointer rounded-md text-grey-light hover:text-white peer-checked:hover:text-(--hover-text) peer-checked:font-semibold leading-4">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </>
  );
};

export default MenuSelectionList;

export const optionKey = (optionValue: OptionValue): string =>
  typeof optionValue === "object" && optionValue !== null && "id" in optionValue
    ? optionValue.id
    : String(optionValue);

// check value type, if type is object (guard against null, null is also object)
// check if object has id, if so use id as key, otherwise convert value to string
