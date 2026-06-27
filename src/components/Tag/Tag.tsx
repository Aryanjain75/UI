"use client";
import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type TagColor = "default" | "primary" | "success" | "warning" | "danger" | "purple" | "cyan" | "pink";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  color?: TagColor;
  onClose?: () => void;
  icon?: ReactNode;
  bordered?: boolean;
}

const colorStyles: Record<TagColor, string> = {
  default: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
  primary: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  success: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
  warning: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800",
  danger:  "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  purple:  "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
  cyan:    "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800",
  pink:    "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950 dark:text-pink-300 dark:border-pink-800",
};

export const Tag = ({ color = "default", onClose, icon, bordered = true, className, children, ...props }: TagProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
      bordered && "border",
      colorStyles[color],
      className
    )}
    {...props}
  >
    {icon && <span className="shrink-0">{icon}</span>}
    {children}
    {onClose && (
      <button
        type="button"
        aria-label="Remove tag"
        onClick={e => { e.stopPropagation(); onClose(); }}
        className="ml-0.5 shrink-0 opacity-60 hover:opacity-100 transition-opacity leading-none text-sm"
      >×</button>
    )}
  </span>
);
