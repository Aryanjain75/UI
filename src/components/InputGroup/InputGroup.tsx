import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  size?: "sm" | "md" | "lg";
  error?: boolean;
}

const sizeStyles: Record<string, string> = { sm: "h-8", md: "h-10", lg: "h-11" };
const addonSize: Record<string, string>  = { sm: "px-2 text-xs", md: "px-3 text-sm", lg: "px-4 text-base" };

export const InputGroup = ({
  leftAddon, rightAddon, leftElement, rightElement, size = "md", error = false, children, className, ...props
}: InputGroupProps) => (
  <div className={cn("flex w-full", sizeStyles[size], className)} {...props}>
    {leftAddon && (
      <span className={cn(
        "inline-flex items-center border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 shrink-0",
        addonSize[size],
        error && "border-red-500"
      )}>
        {leftAddon}
      </span>
    )}
    <div className="relative flex-1 min-w-0">
      {leftElement && (
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">{leftElement}</div>
      )}
      {children}
      {rightElement && (
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">{rightElement}</div>
      )}
    </div>
    {rightAddon && (
      <span className={cn(
        "inline-flex items-center border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 shrink-0",
        addonSize[size],
        error && "border-red-500"
      )}>
        {rightAddon}
      </span>
    )}
  </div>
);
