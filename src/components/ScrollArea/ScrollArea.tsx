import { forwardRef, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  maxHeight?: string;
  maxWidth?: string;
  scrollbarWidth?: "thin" | "auto" | "none";
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ maxHeight = "300px", maxWidth, scrollbarWidth = "thin", className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "overflow-auto",
        scrollbarWidth === "thin" && "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent",
        scrollbarWidth === "none" && "scrollbar-hide",
        className
      )}
      style={{ maxHeight, maxWidth, ...style }}
      {...props}
    >
      {children}
    </div>
  )
);
ScrollArea.displayName = "ScrollArea";
