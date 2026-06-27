"use client";
import { useState, useRef, useEffect, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type PopoverPlacement = "top" | "bottom" | "left" | "right";

export interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  placement?: PopoverPlacement;
  className?: string;
}

const placementStyles: Record<PopoverPlacement, string> = {
  top:    "bottom-full mb-2 left-1/2 -translate-x-1/2",
  bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
  left:   "right-full mr-2 top-1/2 -translate-y-1/2",
  right:  "left-full ml-2 top-1/2 -translate-y-1/2",
};

export const Popover = ({ trigger, children, placement = "bottom", className }: PopoverProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen(o => !o)}>{trigger}</div>
      {open && (
        <div className={cn(
          "absolute z-50 w-72 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg p-4",
          "animate-in fade-in zoom-in-95 duration-150",
          placementStyles[placement], className
        )}>
          {children}
        </div>
      )}
    </div>
  );
};
