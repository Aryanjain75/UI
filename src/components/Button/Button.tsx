"use client";
import type * as React from "react";
import {
  forwardRef,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
  useRef,
  useCallback,
} from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ─── Utility ──────────────────────────────────────────────────────────────────

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "danger"
  | "danger-solid"
  | "success"
  | "success-subtle"
  | "link";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonShape = "default" | "pill" | "icon";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Button text content */
  label?: ReactNode;
  /** Visual style */
  variant?: ButtonVariant;
  /** Size tier */
  size?: ButtonSize;
  /** Shape modifier — 'icon' produces a square button */
  shape?: ButtonShape;
  /** Shows a spinner and prevents interaction */
  isLoading?: boolean;
  /** Text shown next to the spinner when loading */
  loadingText?: string;
  /** Icon rendered before the label */
  leftIcon?: ReactNode;
  /** Icon rendered after the label */
  rightIcon?: ReactNode;
  /** Stretches button to fill its container */
  fullWidth?: boolean;
  /** Render as an <a> tag (polymorphic) */
  as?: "button" | "a";
  /** href — activates polymorphic <a> render */
  href?: string;
  /** Accessible label required when shape="icon" */
  "aria-label"?: string;
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const base =
  "inline-flex items-center justify-center font-medium leading-none select-none " +
  "transition-[background-color,color,border-color,box-shadow,transform] duration-150 ease-in-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "active:scale-[0.97] " +
  "disabled:opacity-45 disabled:cursor-not-allowed disabled:pointer-events-none " +
  "relative overflow-hidden";

const variantMap: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 " +
    "focus-visible:ring-blue-500 " +
    "dark:bg-blue-500 dark:hover:bg-blue-400 dark:active:bg-blue-300 dark:text-white",

  secondary:
    "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 active:bg-gray-100 " +
    "focus-visible:ring-gray-400 " +
    "dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:border-gray-600",

  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 " +
    "focus-visible:ring-gray-400 " +
    "dark:text-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700",

  outline:
    "bg-transparent text-blue-600 border border-blue-500 hover:bg-blue-50 hover:border-blue-600 active:bg-blue-100 " +
    "focus-visible:ring-blue-500 " +
    "dark:text-blue-400 dark:border-blue-500 dark:hover:bg-blue-950 dark:hover:border-blue-400",

  danger:
    "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 hover:border-red-300 active:bg-red-200 " +
    "focus-visible:ring-red-400 " +
    "dark:bg-red-950 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900 dark:hover:border-red-700",

  "danger-solid":
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 " +
    "focus-visible:ring-red-500 " +
    "dark:bg-red-500 dark:hover:bg-red-400",

  success:
    "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 " +
    "focus-visible:ring-green-500 " +
    "dark:bg-green-500 dark:hover:bg-green-400",

  "success-subtle":
    "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 hover:border-green-300 active:bg-green-200 " +
    "focus-visible:ring-green-400 " +
    "dark:bg-green-950 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900",

  link:
    "bg-transparent text-blue-600 underline-offset-4 hover:underline p-0 h-auto rounded " +
    "focus-visible:ring-blue-500 " +
    "dark:text-blue-400",
};

const sizeMap: Record<ButtonSize, string> = {
  xs: "h-7 px-2.5 text-xs gap-1 rounded-md",
  sm: "h-8 px-3 text-sm gap-1.5 rounded-md",
  md: "h-9 px-4 text-sm gap-2 rounded-lg",
  lg: "h-11 px-5 text-base gap-2 rounded-lg",
  xl: "h-13 px-6 text-base gap-2.5 rounded-xl",
};

const iconSizeMap: Record<ButtonSize, string> = {
  xs: "h-7 w-7 rounded-md",
  sm: "h-8 w-8 rounded-md",
  md: "h-9 w-9 rounded-lg",
  lg: "h-11 w-11 rounded-lg",
  xl: "h-13 w-13 rounded-xl",
};

const pillMap: Record<ButtonSize, string> = {
  xs: "rounded-full",
  sm: "rounded-full",
  md: "rounded-full",
  lg: "rounded-full",
  xl: "rounded-full",
};

const spinnerSizeMap: Record<ButtonSize, string> = {
  xs: "w-3 h-3",
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-4.5 h-4.5",
  xl: "w-5 h-5",
};

// ─── Ripple ───────────────────────────────────────────────────────────────────

function createRipple(
  event: React.MouseEvent<HTMLButtonElement>,
  el: HTMLButtonElement
) {
  const existing = el.querySelectorAll(".btn-ripple");
  existing.forEach((r) => r.remove());

  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  const ripple = document.createElement("span");
  ripple.className = "btn-ripple";
  ripple.style.cssText = `
    position:absolute; border-radius:50%; pointer-events:none;
    width:${size}px; height:${size}px; left:${x}px; top:${y}px;
    background:rgba(255,255,255,0.28); transform:scale(0);
    animation:btn-ripple-anim 0.55s linear forwards;
  `;
  el.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

// Inject keyframes once
if (typeof document !== "undefined") {
  const styleId = "__btn_ripple_styles__";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent =
      "@keyframes btn-ripple-anim{to{transform:scale(1);opacity:0}}";
    document.head.appendChild(style);
  }
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

interface SpinnerProps {
  size: ButtonSize;
  className?: string;
}

export function ButtonSpinner({ size, className }: SpinnerProps) {
  return (
    <svg
      className={cn("animate-spin", spinnerSizeMap[size], className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      data-testid="button-spinner"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="31.4"
        strokeDashoffset="10"
        strokeLinecap="round"
        className="opacity-30"
      />
      <path
        className="opacity-80"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
      />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      shape = "default",
      isLoading = false,
      loadingText,
      label,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      onClick,
      as: Tag = "button",
      href,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLButtonElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLButtonElement>) ?? internalRef;

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (resolvedRef.current && variant !== "link") {
          createRipple(e, resolvedRef.current);
        }
        onClick?.(e);
      },
      [onClick, variant, resolvedRef]
    );

    const isIconOnly = shape === "icon";
    const isPill = shape === "pill";

    const classes = cn(
      base,
      variantMap[variant],
      isIconOnly ? iconSizeMap[size] : sizeMap[size],
      isPill && pillMap[size],
      fullWidth && "w-full",
      (isLoading) && "cursor-wait",
      className
    );

    const content = isLoading ? (
      <>
        <ButtonSpinner size={size} />
        {loadingText ?? (isIconOnly ? null : label)}
      </>
    ) : (
      <>
        {leftIcon && (
          <span className="shrink-0 inline-flex" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {!isIconOnly && label}
        {rightIcon && (
          <span className="shrink-0 inline-flex" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          className={classes}
          aria-disabled={disabled}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={resolvedRef}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={classes}
        onClick={handleClick}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

// ─── ButtonGroup ──────────────────────────────────────────────────────────────

export interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  /** Orientation of the group */
  orientation?: "horizontal" | "vertical";
}

export function ButtonGroup({
  children,
  className,
  orientation = "horizontal",
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={cn(
        "inline-flex",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        "[&>button]:rounded-none",
        orientation === "horizontal" && [
          "[&>button:first-child]:rounded-l-lg",
          "[&>button:last-child]:rounded-r-lg",
          "[&>button:not(:first-child)]:-ml-px",
        ],
        orientation === "vertical" && [
          "[&>button:first-child]:rounded-t-lg",
          "[&>button:last-child]:rounded-b-lg",
          "[&>button:not(:first-child)]:-mt-px",
        ],
        className
      )}
    >
      {children}
    </div>
  );
}