"use client";
import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface ToggleGroupItem { value: string; label: ReactNode; icon?: ReactNode; disabled?: boolean; }
export interface ToggleGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: ToggleGroupItem[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  type?: "single" | "multiple";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const sizeStyles = { sm: "h-8 px-3 text-xs", md: "h-9 px-4 text-sm", lg: "h-11 px-5 text-base" };

export const ToggleGroup = ({
  items, value, onChange, type = "single", size = "md", fullWidth = false, className, ...props
}: ToggleGroupProps) => {
  const selected = Array.isArray(value) ? value : value ? [value] : [];

  const toggle = (v: string) => {
    if (type === "single") {
      onChange?.(selected[0] === v ? "" : v);
    } else {
      const next = selected.includes(v) ? selected.filter(s => s !== v) : [...selected, v];
      onChange?.(next);
    }
  };

  return (
    <div
      role="group"
      className={cn(
        "inline-flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden divide-x divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900",
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {items.map(item => {
        const active = selected.includes(item.value);
        return (
          <button
            key={item.value}
            type="button"
            disabled={item.disabled}
            aria-pressed={active}
            onClick={() => !item.disabled && toggle(item.value)}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              sizeStyles[size],
              fullWidth && "flex-1",
              active
                ? "bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            )}
          >
            {item.icon && <span className="w-4 h-4">{item.icon}</span>}
            {item.label}
          </button>
        );
      })}
    </div>
  );
};
