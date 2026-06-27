"use client";
import { HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface RadioOption {
  value: string;
  label: ReactNode;
  hint?: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLFieldSetElement>, "onChange"> {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  orientation?: "horizontal" | "vertical";
  error?: string;
}

export const RadioGroup = ({
  options, value, onChange, name, orientation = "vertical", error, className, ...props
}: RadioGroupProps) => (
  <fieldset className={cn("border-0 p-0 m-0", className)} {...props}>
    <div className={cn("flex gap-3", orientation === "horizontal" ? "flex-row flex-wrap" : "flex-col")}>
      {options.map(opt => (
        <label
          key={opt.value}
          className={cn(
            "flex items-start gap-2.5 cursor-pointer group",
            opt.disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <span className="relative flex items-center justify-center mt-0.5 shrink-0">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              disabled={opt.disabled}
              onChange={() => onChange?.(opt.value)}
              className={cn(
                "peer w-4 h-4 rounded-full border-2 appearance-none cursor-pointer transition-colors",
                "border-gray-300 bg-white checked:border-brand-600",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1",
                "disabled:cursor-not-allowed",
                error && "border-red-500"
              )}
            />
            <span className="pointer-events-none absolute w-2 h-2 rounded-full bg-brand-600 opacity-0 peer-checked:opacity-100 transition-opacity" />
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{opt.label}</span>
            {opt.hint && <span className="text-xs text-gray-500 dark:text-gray-400">{opt.hint}</span>}
          </span>
        </label>
      ))}
    </div>
    {error && <p className="mt-1.5 text-xs text-red-500" role="alert">{error}</p>}
  </fieldset>
);
