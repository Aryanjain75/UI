import { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type ProgressVariant = "line" | "circle";
export type ProgressColor   = "primary" | "success" | "warning" | "danger";
export type ProgressSize    = "sm" | "md" | "lg";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  variant?: ProgressVariant;
  color?: ProgressColor;
  size?: ProgressSize;
  showValue?: boolean;
  label?: string;
  strokeWidth?: number;
}

const colorMap: Record<ProgressColor, string> = {
  primary: "stroke-brand-600",
  success: "stroke-green-500",
  warning: "stroke-yellow-500",
  danger:  "stroke-red-500",
};
const trackMap: Record<ProgressColor, string> = {
  primary: "bg-brand-600",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  danger:  "bg-red-500",
};
const sizeMap: Record<ProgressSize, string> = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };
const circleSizeMap: Record<ProgressSize, number> = { sm: 48, md: 64, lg: 96 };

export const Progress = ({
  value, variant = "line", color = "primary", size = "md", showValue = false, label, strokeWidth = 8, className, ...props
}: ProgressProps) => {
  const pct = Math.min(100, Math.max(0, value));

  if (variant === "circle") {
    const dim = circleSizeMap[size];
    const r   = (dim - strokeWidth) / 2;
    const c   = 2 * Math.PI * r;
    return (
      <div className={cn("inline-flex flex-col items-center gap-1", className)} {...props}>
        <div className="relative" style={{ width: dim, height: dim }}>
          <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`} style={{ transform: "rotate(-90deg)" }}>
            <circle cx={dim / 2} cy={dim / 2} r={r} fill="none" className="stroke-gray-200 dark:stroke-gray-700" strokeWidth={strokeWidth} />
            <circle
              cx={dim / 2} cy={dim / 2} r={r} fill="none"
              className={cn("transition-all duration-500", colorMap[color])}
              strokeWidth={strokeWidth}
              strokeDasharray={c}
              strokeDashoffset={c - (pct / 100) * c}
              strokeLinecap="round"
            />
          </svg>
          {showValue && (
            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700 dark:text-gray-300">{pct}%</span>
          )}
        </div>
        {label && <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>}
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      {(label || showValue) && (
        <div className="flex justify-between mb-1 text-xs text-gray-600 dark:text-gray-400">
          {label && <span>{label}</span>}
          {showValue && <span>{pct}%</span>}
        </div>
      )}
      <div
        role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}
        className={cn("w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden", sizeMap[size])}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", trackMap[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};
