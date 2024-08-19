import { forwardRef, ReactNode } from "react";

type Props = {
  onClick?: () => void;
  children?: ReactNode; 
  icon?: ReactNode;
  className?: string;
  variant?: 'default' | 'tuners' | 'tunersMenu' | 'tunersAll' | 'toggle' | 'dropdown' | 'dropdownItem' | 'accordion' | 'accordionItem' | 'menu';
  active?: boolean;
  id?: string;
}

const ControlButton = forwardRef<HTMLButtonElement, Props>(({
  onClick,
  children,
  className = "",
  icon,
  variant = "default",
  active = false,
  id,
}, ref) => {
  const baseClass = "flex justify-center items-center text-center outline-none cursor-pointer transition-all duration-200";
  const variantClass = {
    default: "",
    //tune-string
    tuners: "bg-gray-600 hover:bg-gray-700 text-white h-[1rem] w-[1rem] rounded-sm transition-transform duration-300",
    //float-nav tuneAll - not used yet
    tunersAll: "bg-transparent text-gray-400 border-2 border-gray-400 hover:border-gray-100 hover:text-gray-100 h-[1.5rem] w-[1.5rem] rounded-md transition ",
    //intro-menu tuneAll
    tunersMenu: "bg-transparent text-gray-400 border-2 border-gray-400 hover:border-gray-100 hover:text-gray-100 text-md h-[2.5rem] w-[2.5rem] rounded-lg transition m-0.5 hover:bg-gray-900",
    //intro menu reset, info, ok buttons
    menu: "w-[4.5rem] text-gray-400 text-sm rounded-lg bg-gray-800 cursor-pointer hover:bg-gray-900 hover:text-gray-100 border-2 border-gray-200 rounded-lg",
    //switches
    toggle: "absolute -left-0.5 w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-gray-100 bg-transparent transition-transform duration-300",
    //float nav dropdown
    dropdown: "px-4 py-1 outline-none rounded-lg text-gray-400 font-medium text-xs font-semibold border-2 border-gray-300 bg-transparent cursor-pointer hover:border-gray-400 hover:text-gray-600 whitespace-nowrap",
    //float nav dropdown content
    dropdownItem: "px-2 py-1 flex items-center text-gray-400 hover:text-gray-100 hover:rounded-md",
    //intro menu dropdown
    accordion: "flex justify-between w-full items-center py-2 md:py-1 lg:py-2 rounded-lg text-gray-400 bg-gray-800 cursor-pointer hover:bg-gray-900 hover:text-gray-100 border-2 border-gray-200 rounded-lg",
    //intro menu dropdown content
    accordionItem: "flex justify-center items-center px-2 py-2 w-full text-gray-400 border-b border-gray-300 hover:bg-green-700 hover:text-gray-100",
  };
  //toggle
  const moveSwitch = active ? 'translate-x-full' : '';
  
  return (
    <button
      ref={ref}
      className={`${baseClass} ${variantClass[variant]} ${moveSwitch} ${className} cursor-pointer`}
      onClick={onClick}
      id={id}
    >
      {icon}
      {children}
    </button>
  );
});

ControlButton.displayName = "ControlButton";

export default ControlButton;