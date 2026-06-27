"use client";
import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AlertVariant = "info" | "success" | "warning" | "danger" | "default";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  icon?: ReactNode;
  /** Render a close button */
  onClose?: () => void;
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const variantStyles: Record<AlertVariant, string> = {
  default: "bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200",
  info:    "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200",
  success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-700 dark:text-yellow-200",
  danger:  "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200",
};

const defaultIcons: Record<AlertVariant, string> = {
  default: "ℹ",
  info:    "ℹ",
  success: "✓",
  warning: "⚠",
  danger:  "✕",
};

// ─── Component ────────────────────────────────────────────────────────────────

export const Alert = ({
  variant = "default",
  title,
  icon,
  onClose,
  className,
  children,
  ...props
}: AlertProps) => (
  <div
    role="alert"
    className={cn(
      "relative flex gap-3 rounded-lg border p-4",
      variantStyles[variant],
      className
    )}
    {...props}
  >
    <span className="mt-0.5 shrink-0 text-base leading-none" aria-hidden="true">
      {icon ?? defaultIcons[variant]}
    </span>
    <div className="flex-1 min-w-0">
      {title && <p className="font-semibold mb-0.5">{title}</p>}
      {children && <div className="text-sm opacity-90">{children}</div>}
    </div>
    {onClose && (
      <button
        onClick={onClose}
        aria-label="Dismiss alert"
        className="shrink-0 ml-auto opacity-60 hover:opacity-100 transition-opacity text-lg leading-none"
      >
        ×
      </button>
    )}
  </div>
);
