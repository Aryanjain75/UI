import { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type PaperVariant   = "elevated" | "outlined" | "filled";
export type PaperElevation = 0 | 1 | 2 | 3 | 4 | 5;

export interface PaperProps extends HTMLAttributes<HTMLDivElement> {
  variant?: PaperVariant;
  elevation?: PaperElevation;
  square?: boolean;
}

const elevationStyles: Record<PaperElevation, string> = {
  0: "shadow-none",
  1: "shadow-sm",
  2: "shadow",
  3: "shadow-md",
  4: "shadow-lg",
  5: "shadow-xl",
};

export const Paper = ({
  variant = "elevated", elevation = 1, square = false, className, children, ...props
}: PaperProps) => (
  <div
    className={cn(
      "bg-white dark:bg-gray-900 transition-shadow",
      !square && "rounded-lg",
      variant === "elevated"  && elevationStyles[elevation],
      variant === "outlined"  && "border border-gray-200 dark:border-gray-700",
      variant === "filled"    && "bg-gray-100 dark:bg-gray-800",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
