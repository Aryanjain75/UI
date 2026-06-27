"use client";
import { useState, useRef, useEffect, ReactNode, HTMLAttributes, KeyboardEvent } from "react";
import { cn } from "../../utils/cn";

export interface DropdownItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  href?: string;
  onClick?: () => void;
  separator?: boolean;
  /** Optional keyboard shortcut hint shown at the end of the item (e.g. used by ContextMenu) */
  shortcut?: string;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
  className?: string;
}

export const Dropdown = ({ trigger, items, align = "left", className }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const actionable = items.filter(i => !i.disabled && !i.separator);
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, actionable.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
    if (e.key === "Escape")    { setOpen(false); }
    if (e.key === "Enter" && activeIdx >= 0) { actionable[activeIdx]?.onClick?.(); setOpen(false); }
  };

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)} onKeyDown={handleKey}>
      <div onClick={() => setOpen(o => !o)}>{trigger}</div>
      {open && (
        <div
          role="menu"
          className={cn(
            "absolute z-50 mt-1.5 min-w-[160px] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg py-1",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {items.map((item, i) => {
            if (item.separator) return <div key={item.id} className="my-1 h-px bg-gray-100 dark:bg-gray-800" />;
            const El = item.href ? "a" : "button";
            return (
              <El
                key={item.id}
                href={item.href}
                role="menuitem"
                tabIndex={0}
                disabled={El === "button" ? item.disabled : undefined}
                onClick={() => { if (!item.disabled) { item.onClick?.(); setOpen(false); } }}
                className={cn(
                  "flex items-center gap-2.5 w-full px-3.5 py-2 text-sm text-left transition-colors",
                  item.danger
                    ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
                  item.disabled && "opacity-40 pointer-events-none"
                )}
              >
                {item.icon && <span className="w-4 h-4 shrink-0">{item.icon}</span>}
                {item.label}
              </El>
            );
          })}
        </div>
      )}
    </div>
  );
};
