import gsap from "gsap";

export const readPxVar = (name: string) =>
  parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(name)
  ) || 0;

export const applySidebarOffset = (
  element: HTMLElement,
  isSidebarOpen: boolean,
  fretQuantity: number,
  isRightHanded: boolean,
  duration = 0.3,
  leftOffset = 0
) => {
  // Remove transform completely for left-handed mode
  if (!isRightHanded) {
    gsap.set(element, { clearProps: "transform" });
    return;
  }
  // calc using CSS var so it works with zoom / different screen sizes
  // keep it in sync if window size / zoom changes
  const varName = fretQuantity === 24 ? "--sidebar-w-24" : "--sidebar-w-oth";
  const sidebarWidth = readPxVar(varName);

  gsap.to(element, {
    x: isSidebarOpen ? sidebarWidth + leftOffset : 0,
    duration,
    ease: "none",
  });
};
