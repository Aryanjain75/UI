import { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "rectangular" | "circular" | "rounded";
  width?: string | number;
  height?: string | number;
  lines?: number;
  animate?: boolean;
}

export const Skeleton = ({
  variant = "rounded", width, height, lines = 1, animate = true, className, style, ...props
}: SkeletonProps) => {
  const base = cn(
    "bg-gray-200 dark:bg-gray-700",
    animate && "animate-pulse",
    variant === "circular"    && "rounded-full",
    variant === "rectangular" && "rounded-none",
    variant === "rounded"     && "rounded-md",
    variant === "text"        && "rounded h-4",
    className
  );
  if (variant === "text" && lines > 1) {
    return (
      <div className="flex flex-col gap-2" {...props}>
        {Array.from({ length: lines }, (_, i) => (
          <div key={i} className={cn(base, i === lines - 1 && "w-3/4")} style={{ width: i === lines - 1 ? undefined : (typeof width === "number" ? `${width}px` : width), height: typeof height === "number" ? `${height}px` : height }} />
        ))}
      </div>
    );
  }
  return (
    <div
      className={base}
      style={{ width: typeof width === "number" ? `${width}px` : width, height: typeof height === "number" ? `${height}px` : height, ...style }}
      {...props}
    />
  );
};
