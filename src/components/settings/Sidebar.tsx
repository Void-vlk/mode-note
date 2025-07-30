"use client";
import { ArrowLeft } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, useRef } from "react";
import { Transition } from "react-transition-group";

import Dropdown from "@/components/dropdowns/DropdownAccordion";
import { useNavStore } from "@/hooks/useNavStore";
import { MENU_CONTENT } from "@/resources/dropdown-content";

const Sidebar: FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);
  const isSidebarOpen = useNavStore((s) => s.isSidebarOpen);
  const setIsSidebarOpen = useNavStore((s) => s.setIsSidebarOpen);

  const { contextSafe } = useGSAP({ scope: container });

  const onEnter = contextSafe(() => {
    if (container.current) {
      gsap
        .timeline()
        .fromTo(
          container.current,
          { autoAlpha: 0 },
          { autoAlpha: 100, duration: 0.3, ease: "none" }
        )
        .fromTo(
          sidebar.current,
          { xPercent: -100 },
          { xPercent: 0, duration: 0.3, ease: "none" },
          "<"
        );
    }
  });

  const onExit = contextSafe(() => {
    if (container.current) {
      gsap
        .timeline()
        .to(container.current, { autoAlpha: 0, duration: 0.3 })
        .to(sidebar.current, { xPercent: -100, duration: 0.3 }, "<");
    }
  });

  return (
    <Transition
      in={isSidebarOpen}
      timeout={500}
      unmountOnExit
      mountOnEnter
      nodeRef={container}
      onEnter={onEnter}
      onExit={onExit}
    >
      {() => (
        <section
          ref={container}
          className="fixed inset-0 bg-black/20 z-20"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            ref={sidebar}
            className="z-30 fixed h-full top-0 left-0 xl:w-80 w-72 bg-black border-r-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-1 right-2 xl:right-1 p-1 xl:p-2 cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            >
              <ArrowLeft
                className="text-white/80 size-6 xl:size-8"
                strokeWidth={1.5}
              />
            </button>

            <section className="py-2 md:py-3 xl:py-4 px-4 flex flex-col justify-center items-left">
              <h2 className="text-base xl:text-xl font-bold text-white pb-1 xl:pb-2 mb-2 xl:mb-4 uppercase border-b">
                settings
              </h2>
              <Dropdown content={MENU_CONTENT} />
            </section>
          </div>
        </section>
      )}
    </Transition>
  );
};

export default Sidebar;
