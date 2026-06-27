"use client";
import { useState, useEffect, ReactNode, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface FloatingNavItem {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface FloatingNavProps extends HTMLAttributes<HTMLDivElement> {
  items: FloatingNavItem[];
  /** Show above this scroll threshold (px); 0 = always visible */
  showAfter?: number;
  position?: "top" | "bottom";
}

export const FloatingNav = ({
  items,
  showAfter = 100,
  position = "top",
  className,
  ...props
}: FloatingNavProps) => {
  const [visible, setVisible] = useState(showAfter === 0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setVisible(y > showAfter);
      setScrolled(y > 20);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [showAfter]);

  return (
    <div
      className={cn(
        "fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-300",
        position === "top" ? "top-4" : "bottom-4",
        visible ? "opacity-100 translate-y-0" : position === "top" ? "opacity-0 -translate-y-4 pointer-events-none" : "opacity-0 translate-y-4 pointer-events-none",
        className
      )}
      {...props}
    >
      <nav
        className={cn(
          "flex items-center gap-1 px-4 py-2.5 rounded-full border transition-all duration-300",
          scrolled
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-gray-200/80 dark:border-gray-700/80 shadow-lg shadow-black/5"
            : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
        )}
      >
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {item.icon && <span className="w-4 h-4">{item.icon}</span>}
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
};
