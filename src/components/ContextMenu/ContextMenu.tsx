"use client";
import { useState, useRef, useEffect, ReactNode, HTMLAttributes } from "react";
import type * as React from "react";
import { cn } from "../../utils/cn";
import { DropdownItem } from "../Dropdown/Dropdown";

export interface ContextMenuProps extends HTMLAttributes<HTMLDivElement> {
  items: DropdownItem[];
  children: ReactNode;
}

export const ContextMenu = ({ items, children, className, ...props }: ContextMenuProps) => {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = () => setPos(null);
    document.addEventListener("click", close);
    document.addEventListener("keydown", e => e.key === "Escape" && close());
    return () => { document.removeEventListener("click", close); };
  }, []);

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onContextMenu={onContextMenu} className={cn("select-none", className)} {...props}>
      {children}
      {pos && (
        <div
          ref={menuRef}
          role="menu"
          style={{ top: pos.y, left: pos.x }}
          className="fixed z-[9999] min-w-[160px] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl py-1 animate-in fade-in zoom-in-95 duration-100"
          onClick={e => e.stopPropagation()}
        >
          {items.map(item => {
            if (item.separator) return <div key={item.id} className="my-1 h-px bg-gray-100 dark:bg-gray-800" />;
            return (
              <button
                key={item.id}
                role="menuitem"
                disabled={item.disabled}
                onClick={() => { item.onClick?.(); setPos(null); }}
                className={cn(
                  "flex items-center gap-2.5 w-full px-3.5 py-2 text-sm text-left transition-colors",
                  item.danger ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-950" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
                  item.disabled && "opacity-40 pointer-events-none"
                )}
              >
                {item.icon && <span className="w-4 h-4 shrink-0">{item.icon}</span>}
                {item.label}
                {item.shortcut && <span className="ml-auto text-xs text-gray-400 font-mono">{item.shortcut}</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
