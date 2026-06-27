"use client";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type SwitchSize  = "sm" | "md" | "lg";
export type SwitchColor = "primary" | "success" | "danger" | "warning";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: ReactNode;
  hint?: string;
  size?: SwitchSize;
  color?: SwitchColor;
  labelPlacement?: "start" | "end";
}

const trackSize: Record<SwitchSize, string> = {
  sm: "w-8 h-4",
  md: "w-11 h-6",
  lg: "w-14 h-7",
};
const thumbSize: Record<SwitchSize, string> = {
  sm: "w-3 h-3 peer-checked:translate-x-4",
  md: "w-4 h-4 peer-checked:translate-x-5",
  lg: "w-5 h-5 peer-checked:translate-x-7",
};
const trackColor: Record<SwitchColor, string> = {
  primary: "peer-checked:bg-brand-600",
  success: "peer-checked:bg-green-600",
  danger:  "peer-checked:bg-red-600",
  warning: "peer-checked:bg-yellow-500",
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, hint, size = "md", color = "primary", labelPlacement = "end", className, disabled, id, ...props }, ref) => {
    const inputId = id ?? (typeof label === "string" ? `switch-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
    const track = (
      <span className="relative shrink-0 inline-flex items-center cursor-pointer">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          disabled={disabled}
          className={cn("peer sr-only", className)}
          {...props}
        />
        <span className={cn(
          "block rounded-full transition-colors bg-gray-300 dark:bg-gray-600",
          trackSize[size], trackColor[color],
          "peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500 peer-focus-visible:ring-offset-1"
        )} />
        <span className={cn(
          "absolute left-0.5 top-1/2 -translate-y-1/2 rounded-full bg-white shadow transition-transform",
          thumbSize[size]
        )} />
      </span>
    );
    if (!label) return track;
    return (
      <label
        htmlFor={inputId}
        className={cn("inline-flex items-start gap-3 cursor-pointer", disabled && "opacity-50 cursor-not-allowed")}
      >
        {labelPlacement === "start" && <span className="flex flex-col"><span className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</span>{hint && <span className="text-xs text-gray-500 dark:text-gray-400">{hint}</span>}</span>}
        {track}
        {labelPlacement === "end" && <span className="flex flex-col"><span className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</span>{hint && <span className="text-xs text-gray-500 dark:text-gray-400">{hint}</span>}</span>}
      </label>
    );
  }
);
Switch.displayName = "Switch";
