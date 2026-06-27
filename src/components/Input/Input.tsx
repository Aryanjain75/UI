import type * as React from "react";
import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export type InputSize = "sm" | "md" | "lg";

// Omit native "size" (it's a number in HTML) so we can redefine it as a string union
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Label shown above the input */
  label?: string;
  /** Helper text shown below the input */
  hint?: string;
  /** Error message — turns the border red */
  error?: string;
  /** Size of the input */
  size?: InputSize;
  /** Icon on the left inside the input */
  leftIcon?: React.ReactNode;
  /** Icon on the right inside the input */
  rightIcon?: React.ReactNode;
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const sizeStyles: Record<InputSize, string> = {
  sm: "h-8  px-3 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
};

// ─── Component ────────────────────────────────────────────────────────────────

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      size      = "md",
      leftIcon,
      rightIcon,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1 w-full">

        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
            {props.required && <span className="text-danger-500 ml-1">*</span>}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-gray-400 pointer-events-none">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded border bg-white",
              "transition-colors duration-150",
              "placeholder:text-gray-400 text-gray-900",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              error
                ? "border-danger-500 focus:ring-danger-500"
                : "border-gray-300 focus:ring-brand-500 focus:border-brand-500",
              "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
              sizeStyles[size],
              leftIcon  && "pl-9",
              rightIcon && "pr-9",
              className
            )}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3 text-gray-400 pointer-events-none">
              {rightIcon}
            </span>
          )}
        </div>

        {/* Error */}
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-danger-500">
            {error}
          </p>
        )}

        {/* Hint */}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="text-sm text-gray-500">
            {hint}
          </p>
        )}

      </div>
    );
  }
);
Input.displayName = "Input";
