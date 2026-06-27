"use client";
import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface BottomNavItem {
  id: string;
  label: string;
  icon: ReactNode;
  badge?: string | number;
  href?: string;
}

export interface BottomNavigationProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  items: BottomNavItem[];
  value?: string;
  onChange?: (id: string) => void;
  showLabels?: boolean;
}

export const BottomNavigation = ({
  items, value, onChange, showLabels = true, className, ...props
}: BottomNavigationProps) => (
  <nav
    className={cn(
      "fixed bottom-0 inset-x-0 z-50 flex items-stretch h-16",
      "bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700",
      "safe-area-pb",
      className
    )}
    {...props}
  >
    {items.map(item => {
      const isActive = item.id === value;
      const El = item.href ? "a" : "button";
      return (
        <El
          key={item.id}
          href={item.href}
          type={!item.href ? "button" : undefined}
          onClick={() => onChange?.(item.id)}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-xs font-medium transition-colors relative",
            isActive
              ? "text-brand-600 dark:text-brand-400"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          )}
        >
          <span className="relative">
            <span className={cn("text-xl", isActive && "text-brand-600 dark:text-brand-400")}>{item.icon}</span>
            {item.badge !== undefined && (
              <span className="absolute -top-1 -right-2 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold px-0.5">
                {item.badge}
              </span>
            )}
          </span>
          {showLabels && <span>{item.label}</span>}
        </El>
      );
    })}
  </nav>
);