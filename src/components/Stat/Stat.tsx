import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type StatTrend = "up" | "down" | "neutral";

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: ReactNode;
  delta?: string;
  trend?: StatTrend;
  icon?: ReactNode;
  description?: string;
}

const trendStyles: Record<StatTrend, string> = {
  up:      "text-green-600 dark:text-green-400",
  down:    "text-red-600 dark:text-red-400",
  neutral: "text-gray-500 dark:text-gray-400",
};
const trendIcon: Record<StatTrend, string> = { up: "↑", down: "↓", neutral: "→" };

export const Stat = ({ label, value, delta, trend = "neutral", icon, description, className, ...props }: StatProps) => (
  <div
    className={cn(
      "flex flex-col gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5",
      className
    )}
    {...props}
  >
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      {icon && <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">{icon}</span>}
    </div>
    <p className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{value}</p>
    {(delta || description) && (
      <div className="flex items-center gap-1.5">
        {delta && trend && (
          <span className={cn("inline-flex items-center gap-0.5 text-sm font-semibold", trendStyles[trend])}>
            <span>{trendIcon[trend]}</span>
            <span>{delta}</span>
          </span>
        )}
        {description && <span className="text-xs text-gray-500 dark:text-gray-400">{description}</span>}
      </div>
    )}
  </div>
);
