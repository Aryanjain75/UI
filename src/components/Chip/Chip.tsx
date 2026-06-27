"use client";
import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ChipVariant = "filled" | "outlined" | "soft";
export type ChipColor   = "default" | "primary" | "success" | "warning" | "danger";
export type ChipSize    = "sm" | "md" | "lg";

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  icon?: ReactNode;
  avatar?: ReactNode;
  onDelete?: () => void;
  clickable?: boolean;
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const filledColor: Record<ChipColor, string> = {
  default: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  primary: "bg-brand-600 text-white",
  success: "bg-green-600 text-white",
  warning: "bg-yellow-500 text-white",
  danger:  "bg-red-600 text-white",
};
const outlinedColor: Record<ChipColor, string> = {
  default: "border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300",
  primary: "border border-brand-500 text-brand-600 dark:text-brand-400",
  success: "border border-green-500 text-green-700 dark:text-green-400",
  warning: "border border-yellow-500 text-yellow-700 dark:text-yellow-400",
  danger:  "border border-red-500 text-red-700 dark:text-red-400",
};
const softColor: Record<ChipColor, string> = {
  default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  primary: "bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300",
  success: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  warning: "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  danger:  "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
};
const sizeStyles: Record<ChipSize, string> = {
  sm: "h-6 px-2 text-xs gap-1",
  md: "h-7 px-2.5 text-sm gap-1.5",
  lg: "h-8 px-3 text-sm gap-2",
};

// ─── Component ────────────────────────────────────────────────────────────────

export const Chip = ({
  variant = "filled",
  color = "default",
  size = "md",
  icon,
  avatar,
  onDelete,
  clickable,
  className,
  children,
  onClick,
  ...props
}: ChipProps) => {
  const colorMap = variant === "filled" ? filledColor : variant === "outlined" ? outlinedColor : softColor;
  return (
    <span
      role={clickable || onClick ? "button" : undefined}
      tabIndex={clickable || onClick ? 0 : undefined}
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full font-medium leading-none select-none",
        colorMap[color],
        sizeStyles[size],
        (clickable || onClick) && "cursor-pointer hover:opacity-80 transition-opacity",
        className
      )}
      {...props}
    >
      {avatar && <span className="-ml-1 shrink-0">{avatar}</span>}
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {onDelete && (
        <button
          type="button"
          aria-label="Remove"
          onClick={e => { e.stopPropagation(); onDelete(); }}
          className="shrink-0 ml-0.5 -mr-1 rounded-full opacity-60 hover:opacity-100 transition-opacity leading-none"
        >
          ×
        </button>
      )}
    </span>
  );
};
