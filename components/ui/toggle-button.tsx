import { cn } from "@/lib/utils";
import { Button } from "./button";

interface ToggleButtonProps {
  isActive: boolean;
  onClick: () => void;
  activeColor?: "orange" | "blue";
  children: React.ReactNode;
}

export function ToggleButton({
  isActive,
  onClick,
  activeColor = "orange",
  children
}: ToggleButtonProps) {
  const colorStyles = {
    orange: {
      active: "bg-gradient-to-r from-orange-1 to-orange-400 text-white shadow-lg hover:shadow-orange-1/20",
      inactive: "text-orange-1 border-orange-1/20 hover:bg-orange-1/10",
      dot: "bg-orange-1"
    },
    blue: {
      active: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-blue-500/20",
      inactive: "text-blue-500 border-blue-500/20 hover:bg-blue-500/10",
      dot: "bg-blue-500"
    }
  };

  return (
    <Button
      type="button"
      variant={isActive ? "default" : "outline"}
      onClick={onClick}
      className={cn(
        'w-full text-xs sm:text-base font-medium',
        'transition-all duration-300 hover:scale-[1.02]',
        'rounded-xl h-10 sm:h-12 px-2 sm:px-6',
        isActive ? colorStyles[activeColor].active : colorStyles[activeColor].inactive
      )}
    >
      <div className="flex items-center justify-center gap-1 sm:gap-2">
        <div className={cn(
          "hidden sm:block size-1.5 sm:size-2 rounded-full", // Added hidden sm:block to hide on mobile
          isActive ? "bg-white" : colorStyles[activeColor].dot,
          "transition-all duration-300",
          isActive && "animate-pulse"
        )} />
        {children}
      </div>
    </Button>
  );
}