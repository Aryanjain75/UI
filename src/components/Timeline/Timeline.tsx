import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface TimelineItem {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  time?: string;
  icon?: ReactNode;
  color?: "default" | "primary" | "success" | "warning" | "danger";
}
export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  items: TimelineItem[];
  alternate?: boolean;
}

const dotColor: Record<string, string> = {
  default: "bg-gray-400 dark:bg-gray-500",
  primary: "bg-brand-600",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  danger:  "bg-red-500",
};

export const Timeline = ({ items, alternate = false, className, ...props }: TimelineProps) => (
  <ol className={cn("relative", className)} {...props}>
    {items.map((item, i) => (
      <li key={item.id} className={cn("relative flex gap-4 pb-8 last:pb-0", alternate && i % 2 !== 0 && "flex-row-reverse")}>
        {/* Line */}
        {i < items.length - 1 && (
          <span className="absolute left-[18px] top-8 bottom-0 w-px bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
        )}
        {/* Dot/Icon */}
        <div className={cn(
          "relative z-10 flex items-center justify-center shrink-0 w-9 h-9 rounded-full ring-4 ring-white dark:ring-gray-950 text-white text-xs",
          dotColor[item.color ?? "default"]
        )}>
          {item.icon ?? null}
        </div>
        {/* Content */}
        <div className="flex-1 pt-1.5 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{item.title}</p>
            {item.time && <time className="text-xs text-gray-400 dark:text-gray-500">{item.time}</time>}
          </div>
          {item.description && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>}
        </div>
      </li>
    ))}
  </ol>
);
