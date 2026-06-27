"use client";
import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  showCount?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, showCount = false, resize = "vertical", className, id, maxLength, value, defaultValue, onChange, ...props }, ref) => {
    const uid = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const len = typeof value === "string" ? value.length : typeof defaultValue === "string" ? defaultValue.length : 0;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={uid} className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        )}
        <textarea
          ref={ref}
          id={uid}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          aria-invalid={!!error}
          className={cn(
            "w-full rounded-lg border px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error ? "border-red-500" : "border-gray-300 dark:border-gray-600",
            resize === "none"       && "resize-none",
            resize === "vertical"   && "resize-y",
            resize === "horizontal" && "resize-x",
            resize === "both"       && "resize",
            className
          )}
          {...props}
        />
        <div className="flex items-center justify-between">
          <div>
            {hint && !error && <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
            {error && <p className="text-xs text-red-500" role="alert">{error}</p>}
          </div>
          {showCount && maxLength && (
            <p className="text-xs text-gray-400 ml-auto">{len}/{maxLength}</p>
          )}
        </div>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
