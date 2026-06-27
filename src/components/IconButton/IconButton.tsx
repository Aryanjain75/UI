import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type IconButtonVariant = "solid" | "ghost" | "outline" | "soft";
export type IconButtonSize    = "xs" | "sm" | "md" | "lg" | "xl";
export type IconButtonColor   = "default" | "primary" | "danger" | "success" | "warning";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  color?: IconButtonColor;
  /** Tooltip label (also used for aria-label) */
  label: string;
  rounded?: boolean;
}

const sizeStyles: Record<IconButtonSize, string> = {
  xs: "w-6 h-6 text-xs",
  sm: "w-7 h-7 text-sm",
  md: "w-9 h-9 text-base",
  lg: "w-11 h-11 text-lg",
  xl: "w-12 h-12 text-xl",
};

const variantColor: Record<IconButtonVariant, Record<IconButtonColor, string>> = {
  solid: {
    default: "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
    primary: "bg-brand-600 text-white hover:bg-brand-700",
    danger:  "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
  },
  ghost: {
    default: "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
    primary: "text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950",
    danger:  "text-red-600 hover:bg-red-50 dark:hover:bg-red-950",
    success: "text-green-600 hover:bg-green-50 dark:hover:bg-green-950",
    warning: "text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950",
  },
  outline: {
    default: "border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
    primary: "border border-brand-500 text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950",
    danger:  "border border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950",
    success: "border border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950",
    warning: "border border-yellow-500 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950",
  },
  soft: {
    default: "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
    primary: "bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-950 dark:text-brand-300",
    danger:  "bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950 dark:text-red-300",
    success: "bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:text-green-300",
    warning: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-950 dark:text-yellow-300",
  },
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, variant = "ghost", size = "md", color = "default", rounded = true, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center shrink-0 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeStyles[size],
        variantColor[variant][color],
        rounded ? "rounded-full" : "rounded-md",
        className
      )}
      {...props}
    >
      {icon}
    </button>
  )
);
IconButton.displayName = "IconButton";
