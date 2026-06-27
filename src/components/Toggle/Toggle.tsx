"use client";
import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type ToggleSize    = "sm" | "md" | "lg";
export type ToggleVariant = "outline" | "ghost";

export interface ToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  size?: ToggleSize;
  variant?: ToggleVariant;
}

const sizeStyles: Record<ToggleSize, string>    = { sm: "h-8 px-3 text-sm", md: "h-9 px-4 text-sm", lg: "h-11 px-5 text-base" };
const variantStyles: Record<ToggleVariant, string> = {
  outline: "border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 data-[pressed=true]:bg-gray-100 data-[pressed=true]:border-gray-400 dark:data-[pressed=true]:bg-gray-700",
  ghost:   "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 data-[pressed=true]:bg-gray-100 dark:data-[pressed=true]:bg-gray-800",
};

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ pressed = false, onPressedChange, size = "md", variant = "outline", className, onClick, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-pressed={pressed}
      data-pressed={pressed}
      onClick={e => { onPressedChange?.(!pressed); onClick?.(e); }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "text-gray-700 dark:text-gray-300",
        sizeStyles[size],
        variantStyles[variant],
        pressed && "text-brand-600 dark:text-brand-400",
        className
      )}
      {...props}
    />
  )
);
Toggle.displayName = "Toggle";
