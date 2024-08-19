type TooltipProps = {
  content: string;
  position: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
  isEnabled: boolean;
};

const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = "top",
  children,
  isEnabled,
}) => {
  if (!isEnabled) {
    return <>{children}</>;
  }

  const getPosition = (position: TooltipProps["position"]): string => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2 mr-2";
      case "right":
        return "left-full top-1/2 transform -translate-y-1/2 ml-2";
    }
  };

  return (
    <div className="relative inline-block group">
      {children}
      <div
        className={`absolute hidden group-hover:block z-[999] p-2 text-wrap w-40 text-sm text-white bg-gray-900 border-2 rounded-lg whitespace-nowrap  transition-opacity duration-300 ${getPosition(
          position
        )}`}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
