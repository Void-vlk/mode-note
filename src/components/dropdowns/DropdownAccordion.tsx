"use client";
import { ChevronDown } from "lucide-react";
import { type FC, useState } from "react";
import { twJoin } from "tailwind-merge";
import { DROPDOWN_CONTENT } from "@/resources/dropdown-content";

const DropdownAccordion: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full space-y-3 text-left">
      {DROPDOWN_CONTENT.map(({ heading, content }, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={heading}
            className={twJoin(
              "text-light rounded-lg w-full",
              isOpen && "shadow-darkest bg-white/15 shadow-lg max-h-fit"
            )}
          >
            <button
              className={twJoin(
                "paragraph-md flex w-full items-center border-b px-3 cursor-pointer justify-between py-2 text-left font-bold focus:outline-none md:py-3",
                isOpen ? "text-darkest border-b" : "text-light"
              )}
              onClick={() => {
                setOpenIndex(openIndex === index ? null : index);
              }}
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
                "paragraph-sm text-darkest transition-all duration-250 ease-in-out",
                isOpen
                  ? "max-h-96 md:max-h-[28rem] py-1.5 opacity-100 pointer-events-auto overflow-y-auto custom-scrollbar pb-4"
                  : "h-0 max-h-0 opacity-0 overflow-hidden pointer-events-none"
              )}
            >
              {content}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DropdownAccordion;
