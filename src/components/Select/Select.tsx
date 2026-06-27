import { forwardRef, SelectHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface SelectOption { value: string; label: string; disabled?: boolean; }
export interface SelectGroup  { group: string; options: SelectOption[]; }
export type SelectOption_ = SelectOption | SelectGroup;

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  options: SelectOption_[];
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
  leftIcon?: ReactNode;
}

const sizeStyles = { sm: "h-8 text-sm px-3", md: "h-10 text-sm px-3", lg: "h-11 text-base px-4" };

function isGroup(o: SelectOption_): o is SelectGroup { return "group" in o; }

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, placeholder, label, hint, error, size = "md", leftIcon, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">{leftIcon}</span>
          )}
          <select
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            className={cn(
              "w-full appearance-none rounded-lg border bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "pr-8",
              leftIcon ? "pl-9" : "",
              error ? "border-red-500" : "border-gray-300 dark:border-gray-600",
              sizeStyles[size],
              className
            )}
            {...props}
          >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((o, i) =>
              isGroup(o)
                ? <optgroup key={i} label={o.group}>{o.options.map(opt => <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>)}</optgroup>
                : <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
            )}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
        {hint && !error && <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
        {error && <p className="text-xs text-red-500" role="alert">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
