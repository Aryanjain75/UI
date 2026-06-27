"use client";
import { useState, useRef, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type HoverCardAlign = "left" | "center" | "right";

export interface HoverCardProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: HoverCardAlign;
  openDelay?: number;
  closeDelay?: number;
  className?: string;
}

const alignStyles: Record<HoverCardAlign, string> = {
  left:   "left-0",
  center: "left-1/2 -translate-x-1/2",
  right:  "right-0",
};

export const HoverCard = ({
  trigger, children, align = "center", openDelay = 200, closeDelay = 150, className,
}: HoverCardProps) => {
  const [visible, setVisible] = useState(false);
  const openTimer  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const open  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); openTimer.current  = setTimeout(() => setVisible(true),  openDelay);  };
  const close = () => { if (openTimer.current) clearTimeout(openTimer.current);  closeTimer.current = setTimeout(() => setVisible(false), closeDelay); };

  return (
    <div className="relative inline-block" onMouseEnter={open} onMouseLeave={close}>
      {trigger}
      {visible && (
        <div
          className={cn(
            "absolute z-50 top-full mt-2 w-64 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg p-4 animate-in fade-in zoom-in-95 duration-150",
            alignStyles[align],
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};