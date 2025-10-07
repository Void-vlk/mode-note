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
  if (!isRightHanded) {
    gsap.set(element, { clearProps: "transform" });
    return;
  }

  const varName = fretQuantity === 24 ? "--sidebar-w-24" : "--sidebar-w-oth";
  const sidebarWidth = readPxVar(varName);

  gsap.to(element, {
    x: isSidebarOpen ? sidebarWidth + leftOffset : 0,
    duration,
    ease: "none",
  });
};