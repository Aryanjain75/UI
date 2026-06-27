"use client";
import { useState, ReactNode, HTMLAttributes, KeyboardEvent } from "react";
import { cn } from "../../utils/cn";

export interface TabItem { id: string; label: ReactNode; content: ReactNode; disabled?: boolean; icon?: ReactNode; }
export type TabVariant = "underline" | "pills" | "bordered" | "soft";
export type TabSize    = "sm" | "md" | "lg";

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: TabItem[];
  defaultTab?: string;
  variant?: TabVariant;
  size?: TabSize;
  fullWidth?: boolean;
  onChange?: (id: string) => void;
}

const sizeStyles: Record<TabSize, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2",
  lg: "text-base px-5 py-2.5",
};

const activeStyles: Record<TabVariant, string> = {
  underline: "border-b-2 border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400",
  pills:     "bg-brand-600 text-white rounded-full shadow-sm",
  bordered:  "border border-gray-200 dark:border-gray-700 border-b-white dark:border-b-gray-900 rounded-t-lg text-brand-600",
  soft:      "bg-white dark:bg-gray-800 text-brand-600 dark:text-brand-400 rounded-lg shadow-sm",
};
const inactiveStyles: Record<TabVariant, string> = {
  underline: "border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300",
  pills:     "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full",
  bordered:  "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 border border-transparent",
  soft:      "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg",
};
const listStyles: Record<TabVariant, string> = {
  underline: "border-b border-gray-200 dark:border-gray-700",
  pills:     "bg-gray-100 dark:bg-gray-800 rounded-full p-1 gap-1",
  bordered:  "border-b border-gray-200 dark:border-gray-700 gap-1",
  soft:      "bg-gray-100 dark:bg-gray-800 rounded-xl p-1 gap-1",
};

export const Tabs = ({
  items, defaultTab, variant = "underline", size = "md", fullWidth = false, onChange, className, ...props
}: TabsProps) => {
  const [active, setActive] = useState(defaultTab ?? items[0]?.id);

  const select = (id: string) => { setActive(id); onChange?.(id); };

  const handleKey = (e: KeyboardEvent, idx: number) => {
    const enabled = items.filter(i => !i.disabled);
    const cur = enabled.findIndex(i => i.id === active);
    if (e.key === "ArrowRight") { const next = enabled[(cur + 1) % enabled.length]; select(next.id); }
    if (e.key === "ArrowLeft")  { const prev = enabled[(cur - 1 + enabled.length) % enabled.length]; select(prev.id); }
  };

  const panel = items.find(i => i.id === active);

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <div role="tablist" aria-orientation="horizontal" className={cn("flex items-center", listStyles[variant])}>
        {items.map((item, idx) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${item.id}`}
              disabled={item.disabled}
              onClick={() => !item.disabled && select(item.id)}
              onKeyDown={e => handleKey(e, idx)}
              className={cn(
                "inline-flex items-center gap-2 font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                "disabled:opacity-40 disabled:cursor-not-allowed",
                sizeStyles[size],
                isActive ? activeStyles[variant] : inactiveStyles[variant],
                fullWidth && "flex-1 justify-center"
              )}
            >
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              {item.label}
            </button>
          );
        })}
      </div>
      {panel && (
        <div
          id={`tabpanel-${panel.id}`}
          role="tabpanel"
          aria-labelledby={panel.id}
          className="pt-4 focus-visible:outline-none"
        >
          {panel.content}
        </div>
      )}
    </div>
  );
};