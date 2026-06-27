import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type FABSize    = "sm" | "md" | "lg" | "xl";
export type FABVariant = "primary" | "secondary" | "success" | "danger" | "surface";
export type FABShape   = "circle" | "rounded" | "extended";

export interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label?: string;
  size?: FABSize;
  variant?: FABVariant;
  shape?: FABShape;
  position?: "bottom-right" | "bottom-left" | "bottom-center" | "none";
  elevation?: boolean;
}

const sizeStyles: Record<FABSize, string> = {
  sm: "w-10 h-10 text-sm",
  md: "w-14 h-14 text-base",
  lg: "w-16 h-16 text-lg",
  xl: "w-20 h-20 text-xl",
};
const variantStyles: Record<FABVariant, string> = {
  primary:   "bg-brand-600 hover:bg-brand-700 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white",
  success:   "bg-green-600 hover:bg-green-700 text-white",
  danger:    "bg-red-600 hover:bg-red-700 text-white",
  surface:   "bg-white hover:bg-gray-50 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white",
};
const positionStyles: Record<string, string> = {
  "bottom-right":  "fixed bottom-6 right-6 z-50",
  "bottom-left":   "fixed bottom-6 left-6 z-50",
  "bottom-center": "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
  "none":          "",
};

export const FAB = forwardRef<HTMLButtonElement, FABProps>(
  ({ icon, label, size = "md", variant = "primary", shape = "circle", position = "bottom-right", elevation = true, className, ...props }, ref) => {
    const isExtended = shape === "extended" && label;
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label ?? "Floating action button"}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "active:scale-95",
          elevation && "shadow-lg hover:shadow-xl",
          variantStyles[variant],
          isExtended ? "rounded-full px-5 h-14" : sizeStyles[size],
          shape === "circle"  && "rounded-full",
          shape === "rounded" && "rounded-2xl",
          positionStyles[position] || positionStyles["none"],
          className
        )}
        {...props}
      >
        <span className={cn(isExtended ? "text-lg" : "")}>{icon}</span>
        {isExtended && <span>{label}</span>}
      </button>
    );
  }
);
FAB.displayName = "FAB";
