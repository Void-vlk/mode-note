"use client";

import ControlButton from "./control-button";

interface SwitchProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  id: string;
  disabled?: boolean;
  className?: string;
}

const Switch = ({
  isActive,
  onClick,
  children,
  id,
  disabled,
  className,
}: SwitchProps) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const isDisabled = disabled && isMobile;
  const switchClass = `relative flex flex-shrink-0 justify-center items-center w-12 h-6 rounded-full bg-transparent border-2 border-gray-300 group hover:border-gray-100 text-gray-400 hover:text-gray-100 hover:bg-gray-900 cursor-pointer select-none ${
    isDisabled ? "cursor-not-allowed opacity-30" : "cursor-pointer"
  }`;

  return (
    <div
      className={switchClass}
      onClick={!isDisabled ? onClick : undefined}
      id={id}
    >
      <ControlButton variant="toggle" active={isActive} icon={children} />
    </div>
  );
};

export default Switch;
