"use client";
import { useState, useRef, useEffect, ReactNode, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface MenubarItem {
  id: string;
  label: string;
  items: MenubarSubItem[];
}
export interface MenubarSubItem {
  id: string;
  label: ReactNode;
  shortcut?: string;
  icon?: ReactNode;
  separator?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface MenubarProps extends HTMLAttributes<HTMLDivElement> {
  menus: MenubarItem[];
}

export const Menubar = ({ menus, className, ...props }: MenubarProps) => {
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(null); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div
      ref={ref}
      role="menubar"
      className={cn(
        "flex items-center h-9 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-1 gap-0.5",
        className
      )}
      {...props}
    >
      {menus.map(menu => (
        <div key={menu.id} className="relative">
          <button
            type="button"
            role="menuitem"
            aria-haspopup="menu"
            aria-expanded={open === menu.id}
            onClick={() => setOpen(o => o === menu.id ? null : menu.id)}
            onMouseEnter={() => open && setOpen(menu.id)}
            className={cn(
              "px-3 py-1 rounded-md text-sm font-medium transition-colors",
              open === menu.id
                ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            {menu.label}
          </button>
          {open === menu.id && (
            <div
              role="menu"
              className="absolute left-0 top-full mt-1 min-w-[200px] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg py-1 z-50"
            >
              {menu.items.map(item => {
                if (item.separator) return <div key={item.id} className="my-1 h-px bg-gray-100 dark:bg-gray-800" />;
                return (
                  <button
                    key={item.id}
                    role="menuitem"
                    disabled={item.disabled}
                    onClick={() => { item.onClick?.(); setOpen(null); }}
                    className={cn(
                      "w-full flex items-center justify-between gap-4 px-3 py-1.5 text-sm text-left transition-colors",
                      "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
                      item.disabled && "opacity-40 pointer-events-none"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon && <span className="w-4 h-4 text-gray-500">{item.icon}</span>}
                      {item.label}
                    </span>
                    {item.shortcut && <span className="text-xs text-gray-400 font-mono">{item.shortcut}</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
