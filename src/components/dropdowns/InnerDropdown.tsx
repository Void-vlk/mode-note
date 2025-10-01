"use client";
import { type FC, ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";
import { twJoin } from "tailwind-merge";

type Props = {
  heading: string;
  children: ReactNode;
};

const InnerDropdown: FC<Props> = ({
  heading,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border-b border-grey-dark">
      <button
        onClick={() => setIsOpen((isOpen) => !isOpen)}
        className="cursor-pointer flex w-full items-center justify-between px-3 py-1 text-sm text-grey-light border-b border-grey-dark"
        aria-expanded={isOpen}
      >
        {heading}
        <ChevronDown
          className={twJoin(
            "size-4 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <div
        className={twJoin(
          "transition-all duration-200 ease-in-out overflow-hidden",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="py-2">{children}</div>
      </div>
    </div>
  );
};

export default InnerDropdown;
