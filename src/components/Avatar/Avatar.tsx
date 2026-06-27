import type * as React from "react";
import { HTMLAttributes, ImgHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "circle" | "square";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  /** Fallback initials (up to 2 chars) */
  initials?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarSize;
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const sizeStyles: Record<AvatarSize, string> = {
  "xs":  "w-6 h-6 text-[10px]",
  "sm":  "w-8 h-8 text-xs",
  "md":  "w-10 h-10 text-sm",
  "lg":  "w-12 h-12 text-base",
  "xl":  "w-16 h-16 text-xl",
  "2xl": "w-20 h-20 text-2xl",
};

const statusStyles: Record<AvatarStatus, string> = {
  online:  "bg-green-500",
  offline: "bg-gray-400",
  busy:    "bg-red-500",
  away:    "bg-yellow-500",
};

const statusSizes: Record<AvatarSize, string> = {
  "xs":  "w-1.5 h-1.5 ring-1",
  "sm":  "w-2 h-2 ring-1",
  "md":  "w-2.5 h-2.5 ring-2",
  "lg":  "w-3 h-3 ring-2",
  "xl":  "w-3.5 h-3.5 ring-2",
  "2xl": "w-4 h-4 ring-2",
};

// ─── Component ────────────────────────────────────────────────────────────────

export const Avatar = ({
  src,
  alt = "",
  initials,
  size = "md",
  shape = "circle",
  status,
  className,
  ...props
}: AvatarProps) => (
  <span
    className={cn(
      "relative inline-flex shrink-0 items-center justify-center font-medium bg-gray-200 text-gray-600 select-none overflow-hidden",
      "dark:bg-gray-700 dark:text-gray-300",
      sizeStyles[size],
      shape === "circle" ? "rounded-full" : "rounded-lg",
      className
    )}
    {...props}
  >
    {src ? (
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    ) : (
      <span aria-label={alt}>{initials?.slice(0, 2).toUpperCase() ?? "?"}</span>
    )}
    {status && (
      <span
        aria-label={status}
        className={cn(
          "absolute bottom-0 right-0 rounded-full ring-white dark:ring-gray-900",
          statusStyles[status],
          statusSizes[size]
        )}
      />
    )}
  </span>
);

export const AvatarGroup = ({
  children,
  max,
  size = "md",
  className,
  ...props
}: AvatarGroupProps & { children: React.ReactNode }) => {
  const arr = Array.isArray(children) ? children : [children];
  const visible = max ? arr.slice(0, max) : arr;
  const overflow = max ? arr.length - max : 0;
  return (
    <div className={cn("flex -space-x-2", className)} {...props}>
      {visible.map((child, i) => (
        <span key={i} className="ring-2 ring-white dark:ring-gray-900 rounded-full">
          {child}
        </span>
      ))}
      {overflow > 0 && (
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-full bg-gray-300 text-gray-700 font-medium ring-2 ring-white dark:ring-gray-900 dark:bg-gray-600 dark:text-gray-200",
            sizeStyles[size]
          )}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
};
