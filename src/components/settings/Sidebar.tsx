"use client";
import { PanelLeftClose } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, useRef } from "react";
import { Transition } from "react-transition-group";

import Dropdown from "@/components/dropdowns/DropdownAccordion";
import { useNavStore } from "@/hooks/useNavStore";
import { MENU_CONTENT } from "@/resources/dropdown-content";
import BuyMeACoffee from "../cookies/BuyMeACoffee";

const Sidebar: FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const isSidebarOpen = useNavStore((s) => s.isSidebarOpen);
  const setIsSidebarOpen = useNavStore((s) => s.setIsSidebarOpen);

  const { contextSafe } = useGSAP({ scope: container });

  const onEnter = contextSafe(() => {
    if (container.current) {
      gsap.fromTo(
        container.current,
        { xPercent: -100 },
        { xPercent: 0, duration: 0.3, ease: "none" }
      );
    }
  });

  const onExit = contextSafe(() => {
    if (container.current) {
      gsap.to(container.current, {
        autoAlpha: 0,
        xPercent: -100,
        duration: 0.3,
      });
    }
  });

  return (
    <Transition
      in={isSidebarOpen}
      timeout={300}
      unmountOnExit
      mountOnEnter
      nodeRef={container}
      onEnter={onEnter}
      onExit={onExit}
    >
      {() => (
        // <section // overlay background
        //   ref={container}
        //   className="fixed inset-0 bg-black/20 z-20 overflow-hidden select-none touch-none"
        //   onClick={() => setIsSidebarOpen(false)}
        // >
        <div
          ref={container}
          className="z-30 fixed h-svh top-0 left-0 flex flex-col xl:w-80 w-72 bg-black border-r-2 border-grey-dark overscroll-contain touch-pan-y overflow-y-auto no-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-3 xl:top-4 right-1 p-2 cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          >
            <PanelLeftClose
              className="text-white/80 size-6 xl:size-8"
              strokeWidth={1.5}
            />
          </button>

          <section className="py-5 xl:py-6 px-4 flex flex-col justify-center items-left">
            <h2 className="text-base xl:text-xl font-bold text-grey-light pb-3 xl:pb-4 mb-2 capitalize tracking-wide border-b border-grey-dark">
              settings
            </h2>
            <Dropdown content={MENU_CONTENT} />
          </section>
          <section className="flex justify-items-end justify-end mx-4 mb-6 mt-auto">
            <BuyMeACoffee/>
          </section>
        </div>
        
        // </section>
      )}
    </Transition>
  );
};

export default Sidebar;
