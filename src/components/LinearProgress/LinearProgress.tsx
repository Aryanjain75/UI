import { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type LinearProgressColor  = "primary" | "success" | "warning" | "danger" | "default";
export type LinearProgressSize   = "xs" | "sm" | "md" | "lg";

export interface LinearProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  color?: LinearProgressColor;
  size?: LinearProgressSize;
  /** Show percentage label */
  showLabel?: boolean;
  label?: string;
  /** Animated indeterminate bar */
  indeterminate?: boolean;
  striped?: boolean;
}

const colorStyles: Record<LinearProgressColor, string> = {
  default: "bg-gray-500",
  primary: "bg-brand-600",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  danger:  "bg-red-500",
};

const sizeStyles: Record<LinearProgressSize, string> = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export const LinearProgress = ({
  value = 0, color = "primary", size = "md", showLabel = false, label, indeterminate = false, striped = false, className, ...props
}: LinearProgressProps) => {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("w-full flex flex-col gap-1", className)} {...props}>
      {(showLabel || label) && (
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>{label}</span>
          {showLabel && !indeterminate && <span>{pct}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn("w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700", sizeStyles[size])}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            colorStyles[color],
            indeterminate && "animate-[indeterminate_1.5s_ease-in-out_infinite] w-1/2",
            striped && "bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,rgba(255,255,255,.15)_8px,rgba(255,255,255,.15)_16px)]"
          )}
          style={indeterminate ? undefined : { width: `${pct}%` }}
        />
      </div>
    </div>
  );
};
