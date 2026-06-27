"use client";
import { forwardRef, InputHTMLAttributes, useId } from "react";
import { cn } from "../../utils/cn";

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  showValue?: boolean;
  valueSuffix?: string;
  color?: "primary" | "success" | "danger" | "warning";
  hint?: string;
}

const trackColor: Record<string, string> = {
  primary: "accent-brand-600",
  success: "accent-green-600",
  danger:  "accent-red-600",
  warning: "accent-yellow-500",
};

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ label, showValue = true, valueSuffix = "", color = "primary", hint, className, id, min = 0, max = 100, value, defaultValue, ...props }, ref) => {
    const uid = useId();
    const inputId = id ?? uid;
    const display = value ?? defaultValue ?? 0;
    return (
      <div className="flex flex-col gap-1.5">
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
            {showValue && <span className="text-sm text-gray-500 dark:text-gray-400">{display}{valueSuffix}</span>}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type="range"
          min={min}
          max={max}
          value={value}
          defaultValue={defaultValue}
          className={cn(
            "w-full h-2 rounded-full cursor-pointer appearance-none bg-gray-200 dark:bg-gray-700",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            trackColor[color],
            className
          )}
          {...props}
        />
        {hint && <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
      </div>
    );
  }
);
Slider.displayName = "Slider";
