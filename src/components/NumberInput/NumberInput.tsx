"use client";
import { forwardRef, InputHTMLAttributes, useId } from "react";
import { cn } from "../../utils/cn";

export interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: string;
  hint?: string;
  error?: string;
  value?: number;
  onChange?: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ label, hint, error, value, onChange, step = 1, min, max, prefix, suffix, className, id, disabled, ...props }, ref) => {
    const uid = useId();
    const inputId = id ?? uid;

    const clamp = (v: number) => {
      if (min !== undefined && v < min) return min;
      if (max !== undefined && v > max) return max;
      return v;
    };
    const increment = () => onChange?.(clamp((value ?? 0) + step));
    const decrement = () => onChange?.(clamp((value ?? 0) - step));

    return (
      <div className="flex flex-col gap-1.5">
        {label && <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
        <div className={cn(
          "flex items-center rounded-lg border overflow-hidden transition-colors",
          error ? "border-red-500" : "border-gray-300 dark:border-gray-600",
          "focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-transparent"
        )}>
          <button
            type="button"
            disabled={disabled || (min !== undefined && (value ?? 0) <= min)}
            onClick={decrement}
            className="px-3 py-2 text-lg text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed border-r border-gray-200 dark:border-gray-700"
            aria-label="Decrease"
          >−</button>
          <div className="flex flex-1 items-center">
            {prefix && <span className="pl-3 text-gray-500 text-sm select-none">{prefix}</span>}
            <input
              ref={ref}
              id={inputId}
              type="number"
              value={value ?? ""}
              disabled={disabled}
              step={step}
              min={min}
              max={max}
              onChange={e => onChange?.(clamp(Number(e.target.value)))}
              className={cn(
                "flex-1 min-w-0 px-3 py-2 text-sm text-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
                "focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                "disabled:opacity-50",
                className
              )}
              aria-invalid={!!error}
              {...props}
            />
            {suffix && <span className="pr-3 text-gray-500 text-sm select-none">{suffix}</span>}
          </div>
          <button
            type="button"
            disabled={disabled || (max !== undefined && (value ?? 0) >= max)}
            onClick={increment}
            className="px-3 py-2 text-lg text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed border-l border-gray-200 dark:border-gray-700"
            aria-label="Increase"
          >+</button>
        </div>
        {hint && !error && <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
        {error && <p className="text-xs text-red-500" role="alert">{error}</p>}
      </div>
    );
  }
);
NumberInput.displayName = "NumberInput";
