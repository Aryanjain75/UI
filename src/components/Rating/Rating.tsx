"use client";
import { useState, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
}

const sizeStyles = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-8 h-8" };

export const Rating = ({
  value = 0, onChange, max = 5, readOnly = false, size = "md", color = "text-yellow-400", className, ...props
}: RatingProps) => {
  const [hover, setHover] = useState(-1);
  const display = hover >= 0 ? hover + 1 : value;

  return (
    <div
      role={readOnly ? "img" : "radiogroup"}
      aria-label={`Rating: ${value} out of ${max}`}
      className={cn("inline-flex items-center gap-0.5", className)}
      {...props}
    >
      {Array.from({ length: max }, (_, i) => (
        <button
          key={i}
          type="button"
          disabled={readOnly}
          onClick={() => !readOnly && onChange?.(i + 1)}
          onMouseEnter={() => !readOnly && setHover(i)}
          onMouseLeave={() => !readOnly && setHover(-1)}
          aria-label={`${i + 1} star${i !== 0 ? "s" : ""}`}
          aria-pressed={value === i + 1}
          className={cn(
            "transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded",
            !readOnly && "hover:scale-110 cursor-pointer",
            readOnly && "cursor-default"
          )}
        >
          <svg
            className={cn(sizeStyles[size], i < display ? color : "text-gray-300 dark:text-gray-600")}
            fill="currentColor" viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </button>
      ))}
    </div>
  );
};
