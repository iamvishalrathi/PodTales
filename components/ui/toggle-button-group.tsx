import { cn } from "@/lib/utils";
import { ToggleButton } from "./toggle-button";

interface ToggleButtonGroupProps {
  button1text: string;
  button2text: string;
  button1Active: boolean;
  button2Active: boolean;
  setButtonActive: (active: boolean) => void;
  className?: string;
  containerWidth?: string;
}

export function ToggleButtonGroup({
  containerWidth = "max-w-[600px]", // Default width
  button1text,
  button2text,
  button1Active,
  button2Active,
  setButtonActive
}: ToggleButtonGroupProps) {
  return (
    <div className={cn(
      "generate_thumbnail flex justify-between w-full mx-auto",
      containerWidth
    )}>
      <div className="w-[49%]">
        <ToggleButton
          isActive={button1Active}
          onClick={() => setButtonActive(true)}
          activeColor="orange"
        >
          <>
            <span className="sm:hidden">Use AI</span>
            <span className="hidden sm:flex">{button1text}</span>
          </>
        </ToggleButton>
      </div>
      
      <div className="w-[49%]">
        <ToggleButton
          isActive={button2Active}
          onClick={() => setButtonActive(false)}
          activeColor="blue"
        >
          <>
            <span className="sm:hidden">Upload Custom</span>
            <span className="hidden sm:flex">{button2text}</span>
          </>
        </ToggleButton>
      </div>
    </div>
  );
}