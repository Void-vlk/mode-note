import { ReactNode, type FC } from "react";
import { twJoin } from "tailwind-merge";

import Switch from "@/components/settings/Switch";

type ToggleProps = {
  onChange: () => void;
  isInSetup: boolean;
  isChecked: boolean;
  optionHeader: string;
  leftOption: string | ReactNode;
  rightOption: string | ReactNode;
};

const ContentToggle: FC<ToggleProps> = ({
  isChecked,
  isInSetup,
  onChange,
  leftOption,
  rightOption,
  optionHeader,
}) => {
  return (
    <div className="flex flex-col">
      {optionHeader && <h3 className="sub-header">{optionHeader}</h3>}
      <section
        className={twJoin(
          isInSetup ? "justify-center" : "justify-start ml-3",
          "flex gap-2 pb-2 text-[13px] lg:text-sm"
        )}
      >
        <div className="text-grey-light">{leftOption}</div>
        <Switch isChecked={isChecked} onChange={onChange} />
        <div className="text-grey-light">{rightOption}</div>
      </section>
    </div>
  );
};

export default ContentToggle;
