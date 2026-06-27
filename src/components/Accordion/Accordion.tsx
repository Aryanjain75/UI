"use client";
import { HTMLAttributes, ReactNode, useState } from "react";
import { cn } from "../../utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AccordionItem {
  id: string;
  trigger: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  /** Allow multiple items open at once */
  multiple?: boolean;
  /** Default open item ids */
  defaultOpen?: string[];
  variant?: "default" | "bordered" | "flush";
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Accordion = ({
  items,
  multiple = false,
  defaultOpen = [],
  variant = "default",
  className,
  ...props
}: AccordionProps) => {
  const [open, setOpen] = useState<Set<string>>(new Set(defaultOpen));

  const toggle = (id: string) => {
    setOpen(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div
      className={cn(
        variant === "bordered" && "border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden divide-y divide-gray-200 dark:divide-gray-700",
        variant === "default" && "divide-y divide-gray-200 dark:divide-gray-700",
        variant === "flush" && "divide-y divide-gray-200 dark:divide-gray-700",
        className
      )}
      {...props}
    >
      {items.map(item => {
        const isOpen = open.has(item.id);
        return (
          <div key={item.id}>
            <button
              type="button"
              disabled={item.disabled}
              aria-expanded={isOpen}
              onClick={() => !item.disabled && toggle(item.id)}
              className={cn(
                "w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left font-medium text-gray-900 dark:text-gray-100",
                "transition-colors hover:bg-gray-50 dark:hover:bg-gray-800",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                variant !== "flush" && !isOpen && "rounded"
              )}
            >
              <span>{item.trigger}</span>
              <svg
                className={cn("shrink-0 w-4 h-4 text-gray-500 transition-transform duration-200", isOpen && "rotate-180")}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
