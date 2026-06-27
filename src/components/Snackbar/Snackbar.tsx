"use client";
import { useEffect, ReactNode, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type SnackbarPosition =
  | "top-left" | "top-center" | "top-right"
  | "bottom-left" | "bottom-center" | "bottom-right";

export interface SnackbarProps {
  open: boolean;
  onClose: () => void;
  message: ReactNode;
  action?: ReactNode;
  duration?: number;
  position?: SnackbarPosition;
  variant?: "default" | "success" | "error" | "warning" | "info";
  className?: string;
}

const positionStyles: Record<SnackbarPosition, string> = {
  "top-left":      "top-4 left-4",
  "top-center":    "top-4 left-1/2 -translate-x-1/2",
  "top-right":     "top-4 right-4",
  "bottom-left":   "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-right":  "bottom-4 right-4",
};
const variantStyles: Record<string, string> = {
  default: "bg-gray-800 dark:bg-gray-700 text-white",
  success: "bg-green-700 text-white",
  error:   "bg-red-700 text-white",
  warning: "bg-yellow-600 text-white",
  info:    "bg-blue-700 text-white",
};

export const Snackbar = ({
  open, onClose, message, action, duration = 4000, position = "bottom-left", variant = "default", className,
}: SnackbarProps) => {
  useEffect(() => {
    if (!open || !duration) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "fixed z-[9999] flex items-center gap-4 min-w-[280px] max-w-sm rounded-xl px-4 py-3 shadow-xl",
        "animate-in slide-in-from-bottom-2 fade-in duration-200",
        variantStyles[variant],
        positionStyles[position],
        className
      )}
    >
      <span className="flex-1 text-sm font-medium">{message}</span>
      {action && <div className="shrink-0">{action}</div>}
      <button
        onClick={onClose}
        aria-label="Close"
        className="shrink-0 opacity-70 hover:opacity-100 transition-opacity text-lg leading-none ml-1"
      >×</button>
    </div>
  );
};
