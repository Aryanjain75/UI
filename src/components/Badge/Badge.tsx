import { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger";
export type BadgeSize    = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?:    BadgeSize;
  /** Adds a colored dot before the label */
  dot?: boolean;
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-100  text-gray-700",
  primary: "bg-brand-100 text-brand-700",
  success: "bg-success-50 text-success-600",
  warning: "bg-warning-50 text-warning-600",
  danger:  "bg-danger-50  text-danger-600",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-gray-400",
  primary: "bg-brand-500",
  success: "bg-success-500",
  warning: "bg-warning-500",
  danger:  "bg-danger-500",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-xs px-2   py-0.5",
  md: "text-sm px-2.5 py-1",
};

// ─── Component ────────────────────────────────────────────────────────────────

export const Badge = ({
  variant  = "default",
  size     = "sm",
  dot      = false,
  className,
  children,
  ...props
}: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 font-medium rounded-full",
      variantStyles[variant],
      sizeStyles[size],
      className
    )}
    {...props}
  >
    {dot && (
      <span className={cn("w-1.5 h-1.5 rounded-full", dotColors[variant])} />
    )}
    {children}
  </span>
);
