"use client";

import ControlButton from "./control-button";

interface SwitchProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  id: string;
}

const Switch = ({ isActive, onClick, children, id }: SwitchProps) => {
  return (
    <div
      className="relative flex flex-shrink-0 justify-center items-center w-12 h-6 rounded-full bg-transparent border-2 border-gray-300 group hover:border-gray-100 text-gray-400 hover:text-gray-100 hover:bg-gray-900 cursor-pointer mx-2 my-2"
      onClick={onClick}
      id={id}
    >
      <ControlButton variant="toggle" active={isActive} icon={children} />
    </div>
  );
};

export default Switch;
