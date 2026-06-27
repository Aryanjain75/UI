"use client";
import { useState, useRef, ReactNode, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface DockItem {
  id: string;
  icon: ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface FloatingDockProps extends HTMLAttributes<HTMLDivElement> {
  items: DockItem[];
  position?: "bottom" | "left" | "right";
  magnification?: boolean;
}

export const FloatingDock = ({
  items, position = "bottom", magnification = true, className, ...props
}: FloatingDockProps) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const isHorizontal = position === "bottom";

  const getScale = (id: string) => {
    if (!magnification || !hovered) return 1;
    const hovIdx = items.findIndex(i => i.id === hovered);
    const curIdx = items.findIndex(i => i.id === id);
    const dist = Math.abs(hovIdx - curIdx);
    return dist === 0 ? 1.5 : dist === 1 ? 1.2 : 1;
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 p-2 rounded-2xl",
        "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-xl",
        isHorizontal ? "flex-row fixed bottom-5 left-1/2 -translate-x-1/2 z-50" : "flex-col fixed z-50",
        position === "left"  && "left-5 top-1/2 -translate-y-1/2",
        position === "right" && "right-5 top-1/2 -translate-y-1/2",
        className
      )}
      {...props}
    >
      {items.map(item => {
        const scale = getScale(item.id);
        const El = item.href ? "a" : "button";
        return (
          <div key={item.id} className="relative group flex items-center justify-center">
            <El
              href={item.href}
              type={!item.href ? "button" : undefined}
              aria-label={item.label}
              onClick={item.onClick}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              style={{ transform: `scale(${scale})`, transition: "transform 0.15s ease" }}
            >
              {item.icon}
            </El>
            <span className={cn(
              "absolute pointer-events-none px-2 py-1 text-xs font-medium rounded-lg whitespace-nowrap",
              "bg-gray-900 dark:bg-white text-white dark:text-gray-900",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-150",
              isHorizontal ? "bottom-full mb-2" : position === "left" ? "left-full ml-2" : "right-full mr-2"
            )}>
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
