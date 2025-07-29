"use client";
import { type FC } from "react";
import { twJoin } from "tailwind-merge";
import { useNavStore } from "@/hooks/useNavStore";

import { ArrowLeft } from "lucide-react";
import DropdownAccordion from "../dropdowns/DropdownAccordion";

const Sidebar: FC = () => {
  const isSidebarOpen = useNavStore((s) => s.isSidebarOpen);
  const setIsSidebarOpen = useNavStore((s) => s.setIsSidebarOpen);

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={twJoin(
          "z-40 fixed h-full top-0 left-0 xl:w-80 w-72 bg-black transition-all transform will-change-transform duration-300 ease-in-out border-r-2",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          className="absolute top-1 right-2 xl:right-1 p-1 xl:p-2 cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        >
          <ArrowLeft className="size-6 xl:size-8" strokeWidth={1.5} />
        </button>

        <section className="py-2 md:py-3 xl:py-4 px-4 flex flex-col justify-center items-left">
          <h2 className="text-base xl:text-xl font-bold text-white pb-1 xl:pb-2 mb-2 xl:mb-4 uppercase border-b">
            settings
          </h2>
          <DropdownAccordion />
        </section>
      </div>
    </>
  );
};

export default Sidebar;
