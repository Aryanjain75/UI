"use client";
import { useState, ReactNode, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface NavItem {
  id: string;
  label: ReactNode;
  href?: string;
  children?: NavItem[];
  icon?: ReactNode;
  description?: string;
}
export interface NavigationMenuProps extends HTMLAttributes<HTMLElement> {
  items: NavItem[];
  orientation?: "horizontal" | "vertical";
}

export const NavigationMenu = ({ items, orientation = "horizontal", className, ...props }: NavigationMenuProps) => {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <nav className={cn("relative", className)} {...props}>
      <ul className={cn("flex gap-1", orientation === "vertical" && "flex-col")}>
        {items.map(item => (
          <li key={item.id} className="relative">
            {item.children ? (
              <>
                <button
                  type="button"
                  aria-expanded={open === item.id}
                  onClick={() => setOpen(o => o === item.id ? null : item.id)}
                  onBlur={() => setTimeout(() => setOpen(null), 150)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                    open === item.id && "bg-gray-100 dark:bg-gray-800"
                  )}
                >
                  {item.icon}
                  {item.label}
                  <svg className={cn("w-3 h-3 transition-transform", open === item.id && "rotate-180")} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {open === item.id && (
                  <div className={cn(
                    "absolute z-50 mt-1.5 min-w-[220px] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg p-1.5",
                    orientation === "horizontal" ? "top-full left-0" : "top-0 left-full ml-1"
                  )}>
                    {item.children.map(child => (
                      <a
                        key={child.id}
                        href={child.href ?? "#"}
                        className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        {child.icon && <span className="mt-0.5 text-gray-500">{child.icon}</span>}
                        <span>
                          <span className="block text-sm font-medium text-gray-900 dark:text-gray-100">{child.label}</span>
                          {child.description && <span className="text-xs text-gray-500 dark:text-gray-400">{child.description}</span>}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <a
                href={item.href ?? "#"}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {item.icon}{item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
