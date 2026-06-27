"use client";
import { useState, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface SpeedDialAction {
  id: string;
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface SpeedDialProps {
  icon?: ReactNode;
  openIcon?: ReactNode;
  actions: SpeedDialAction[];
  direction?: "up" | "down" | "left" | "right";
  position?: "bottom-right" | "bottom-left" | "none";
  className?: string;
}

const directionStyles: Record<string, string> = {
  up:    "flex-col-reverse mb-16",
  down:  "flex-col mt-16",
  left:  "flex-row-reverse mr-16",
  right: "flex-row ml-16",
};

const positionStyles: Record<string, string> = {
  "bottom-right": "fixed bottom-6 right-6 z-50",
  "bottom-left":  "fixed bottom-6 left-6 z-50",
  "none": "",
};

export const SpeedDial = ({
  icon = "+", openIcon = "×", actions, direction = "up", position = "bottom-right", className,
}: SpeedDialProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative inline-flex items-end justify-end", positionStyles[position] || positionStyles["none"], className)}>
      {/* Actions */}
      {open && (
        <div className={cn("absolute flex gap-2 items-center", directionStyles[direction])}>
          {actions.map(action => (
            <div key={action.id} className="flex items-center gap-2 group">
              {(direction === "up" || direction === "down") && (
                <span className="hidden group-hover:block text-xs font-medium bg-gray-800 text-white px-2 py-0.5 rounded-md whitespace-nowrap absolute right-14 pointer-events-none">
                  {action.label}
                </span>
              )}
              <button
                type="button"
                disabled={action.disabled}
                aria-label={action.label}
                onClick={() => { action.onClick?.(); setOpen(false); }}
                className={cn(
                  "w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-gray-700 dark:text-gray-300",
                  "hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:scale-105",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "border border-gray-200 dark:border-gray-700"
                )}
              >
                {action.icon}
              </button>
            </div>
          ))}
        </div>
      )}
      {/* Main FAB */}
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close speed dial" : "Open speed dial"}
        onClick={() => setOpen(o => !o)}
        className={cn(
          "w-14 h-14 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-lg",
          "flex items-center justify-center text-2xl leading-none transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
          "hover:shadow-xl active:scale-95"
        )}
      >
        <span className={cn("transition-transform duration-200", open && "rotate-45")}>
          {open ? openIcon : icon}
        </span>
      </button>
    </div>
  );
};
