"use client";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  hint?: string;
  error?: string;
  /** Indeterminate visual state */
  indeterminate?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, hint, error, indeterminate, className, id, disabled, ...props }, ref) => {
    const inputId = id ?? (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    return (
      <div className="flex flex-col gap-0.5">
        <label
          htmlFor={inputId}
          className={cn("flex items-start gap-2.5 cursor-pointer", disabled && "cursor-not-allowed opacity-50")}
        >
          <span className="relative flex items-center justify-center shrink-0 mt-0.5">
            <input
              ref={ref}
              id={inputId}
              type="checkbox"
              disabled={disabled}
              aria-invalid={!!error}
              className={cn(
                "peer w-4 h-4 rounded border-2 appearance-none cursor-pointer transition-colors",
                "border-gray-300 bg-white checked:bg-brand-600 checked:border-brand-600",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1",
                "disabled:cursor-not-allowed",
                error && "border-red-500",
                className
              )}
              {...props}
            />
            {/* Checkmark */}
            <svg
              className="pointer-events-none absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
              viewBox="0 0 12 12" fill="none"
            >
              {indeterminate
                ? <path d="M2 6h8" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
                : <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
              }
            </svg>
          </span>
          {label && (
            <span className="flex flex-col">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</span>
              {hint && <span className="text-xs text-gray-500 dark:text-gray-400">{hint}</span>}
            </span>
          )}
        </label>
        {error && <p className="text-xs text-red-500 ml-6">{error}</p>}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";
