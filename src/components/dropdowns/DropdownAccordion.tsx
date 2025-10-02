"use client";
import { ChevronDown } from "lucide-react";
import { type FC, ReactNode, useState } from "react";
import { twJoin } from "tailwind-merge";

import { type MenuContent } from "@/resources/dropdown-content";

type Props = {
  heading: string;
  content: ReactNode;
  isOpen: boolean;
  onClick: () => void;
};

const AccordionItem: FC<Props> = ({ heading, content, isOpen, onClick }) => {
  return (
    <div
      className={twJoin("rounded-lg w-full", isOpen && "bg-white/10 max-h-fit")}
    >
      <button
        className="flex w-full items-center border-b border-grey-dark text-white/90 px-3 cursor-pointer justify-between py-2 text-left font-bold focus:outline-none md:py-3"
        onClick={onClick}
      >
        {heading}
        <ChevronDown
          className={twJoin(
            "size-4 shrink-0 transition-transform duration-300 md:size-6",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={twJoin(
          "transition-all duration-250 ease-in-out",
          isOpen
            ? "py-1.5 opacity-100 pointer-events-auto overflow-y-auto no-scrollbar pb-4"
            : "h-0 max-h-0 opacity-0 overflow-hidden pointer-events-none"
        )}
      >
        {content}
      </div>
    </div>
  );
};

const Dropdown: FC<{ content: MenuContent[] }> = ({ content }) => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  return (
    <div className="w-full space-y-3 text-left">
      {content.map((item, index) => (
        <AccordionItem
          key={item.id}
          heading={item.heading}
          content={item.content}
          isOpen={openMenuIndex === index}
          onClick={() =>
            setOpenMenuIndex(openMenuIndex === index ? null : index)
          }
        />
      ))}
    </div>
  );
};

export default Dropdown;
