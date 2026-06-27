"use client";
import { useState, useRef, useEffect } from "react";
import { cn } from "../../utils/cn";
import { Calendar } from "../Calendar/Calendar";

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  format?: (date: Date) => string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const defaultFormat = (d: Date) => d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
const sizeInput: Record<string, string> = { sm: "h-8 text-sm", md: "h-10 text-sm", lg: "h-11 text-base" };

export const DatePicker = ({
  value, onChange, placeholder = "Pick a date", label, hint, error, disabled,
  minDate, maxDate, format = defaultFormat, size = "md", className,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (!containerRef.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={containerRef} className={cn("flex flex-col gap-1.5", className)}>
      {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen(o => !o)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={cn(
            "w-full flex items-center gap-2 px-3 rounded-lg border bg-white dark:bg-gray-900 text-left transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error ? "border-red-500" : "border-gray-300 dark:border-gray-600",
            sizeInput[size]
          )}
        >
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span className={cn("flex-1 text-sm", value ? "text-gray-900 dark:text-gray-100" : "text-gray-400")}>
            {value ? format(value) : placeholder}
          </span>
          {value && (
            <button
              type="button"
              onClick={e => { e.stopPropagation(); onChange?.(undefined as any); }}
              className="text-gray-400 hover:text-gray-600 leading-none text-base shrink-0"
              aria-label="Clear date"
            >×</button>
          )}
        </button>
        {open && (
          <div className="absolute z-50 mt-1.5 left-0 animate-in fade-in zoom-in-95 duration-150">
            <Calendar
              value={value}
              onChange={d => { onChange?.(d); setOpen(false); }}
              minDate={minDate}
              maxDate={maxDate}
              size={size === "lg" ? "lg" : "md"}
            />
          </div>
        )}
      </div>
      {hint && !error && <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
      {error && <p className="text-xs text-red-500" role="alert">{error}</p>}
    </div>
  );
};
