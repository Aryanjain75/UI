"use client";
import { useState, useRef, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";
export type TooltipColor     = "dark" | "light";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  placement?: TooltipPlacement;
  color?: TooltipColor;
  delay?: number;
  className?: string;
  maxWidth?: string;
}

const placementStyles: Record<TooltipPlacement, string> = {
  top:    "bottom-full mb-2 left-1/2 -translate-x-1/2",
  bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
  left:   "right-full mr-2 top-1/2 -translate-y-1/2",
  right:  "left-full ml-2 top-1/2 -translate-y-1/2",
};
const arrowPlacement: Record<TooltipPlacement, string> = {
  top:    "top-full left-1/2 -translate-x-1/2 border-t-gray-800 border-x-transparent border-b-transparent",
  bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-gray-800 border-x-transparent border-t-transparent",
  left:   "left-full top-1/2 -translate-y-1/2 border-l-gray-800 border-y-transparent border-r-transparent",
  right:  "right-full top-1/2 -translate-y-1/2 border-r-gray-800 border-y-transparent border-l-transparent",
};

export const Tooltip = ({
  content, children, placement = "top", color = "dark", delay = 0, className, maxWidth = "200px",
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = () => { timer.current = setTimeout(() => setVisible(true), delay); };
  const hide = () => { if (timer.current) clearTimeout(timer.current); setVisible(false); };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show} onMouseLeave={hide}
      onFocus={show} onBlur={hide}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          style={{ maxWidth }}
          className={cn(
            "absolute z-50 px-2.5 py-1.5 text-xs rounded-lg shadow-md whitespace-normal pointer-events-none",
            "animate-in fade-in zoom-in-95 duration-100",
            color === "dark"
              ? "bg-gray-800 text-white dark:bg-gray-700"
              : "bg-white text-gray-900 border border-gray-200 shadow-md dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700",
            placementStyles[placement],
            className
          )}
        >
          {content}
          {color === "dark" && (
            <span className={cn("absolute w-0 h-0 border-4", arrowPlacement[placement])} aria-hidden="true" />
          )}
        </span>
      )}
    </span>
  );
};