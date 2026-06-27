import { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type SpinnerSize    = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerVariant = "border" | "dots" | "grow";
export type SpinnerColor   = "primary" | "white" | "gray" | "success" | "danger" | "warning";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  color?: SpinnerColor;
  label?: string;
}

const sizeMap: Record<SpinnerSize, string> = {
  xs: "w-3 h-3 border",
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-8 h-8 border-[3px]",
  xl: "w-12 h-12 border-4",
};
const dotSizeMap: Record<SpinnerSize, string> = {
  xs: "w-1 h-1", sm: "w-1.5 h-1.5", md: "w-2 h-2", lg: "w-3 h-3", xl: "w-4 h-4",
};
const colorMap: Record<SpinnerColor, string> = {
  primary: "border-brand-600 border-t-transparent",
  white:   "border-white border-t-transparent",
  gray:    "border-gray-400 border-t-transparent",
  success: "border-green-500 border-t-transparent",
  danger:  "border-red-500 border-t-transparent",
  warning: "border-yellow-500 border-t-transparent",
};
const dotColorMap: Record<SpinnerColor, string> = {
  primary: "bg-brand-600", white: "bg-white", gray: "bg-gray-400",
  success: "bg-green-500", danger: "bg-red-500", warning: "bg-yellow-500",
};

export const Spinner = ({
  size = "md", variant = "border", color = "primary", label = "Loading…", className, ...props
}: SpinnerProps) => {
  if (variant === "dots") {
    return (
      <span role="status" aria-label={label} className={cn("inline-flex items-center gap-1", className)} {...props}>
        {[0, 150, 300].map(delay => (
          <span key={delay} className={cn("rounded-full animate-bounce", dotSizeMap[size], dotColorMap[color])} style={{ animationDelay: `${delay}ms` }} />
        ))}
        <span className="sr-only">{label}</span>
      </span>
    );
  }
  if (variant === "grow") {
    return (
      <span role="status" aria-label={label} className={cn("inline-block rounded-full animate-ping", sizeMap[size].split(" ").slice(0, 2).join(" "), dotColorMap[color], className)} {...props}>
        <span className="sr-only">{label}</span>
      </span>
    );
  }
  return (
    <span
      role="status"
      aria-label={label}
      className={cn("inline-block animate-spin rounded-full", sizeMap[size], colorMap[color], className)}
      {...props}
    >
      <span className="sr-only">{label}</span>
    </span>
  );
};
