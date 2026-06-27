"use client";
import { useState, useRef, useCallback, HTMLAttributes, ReactNode } from "react";
import type * as React from "react";
import { cn } from "../../utils/cn";

export type ResizableDirection = "horizontal" | "vertical" | "both";

export interface ResizableProps extends HTMLAttributes<HTMLDivElement> {
  direction?: ResizableDirection;
  defaultSize?: { width?: number | string; height?: number | string };
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  handleClassName?: string;
}

export const Resizable = ({
  direction = "horizontal",
  defaultSize = { width: 300, height: 200 },
  minWidth = 100, minHeight = 80, maxWidth = 1200, maxHeight = 800,
  handleClassName, className, children, ...props
}: ResizableProps) => {
  const [size, setSize] = useState({ width: Number(defaultSize.width) || 300, height: Number(defaultSize.height) || 200 });
  const dragging = useRef<{ dir: string; startX: number; startY: number; startW: number; startH: number } | null>(null);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging.current) return;
    const { dir, startX, startY, startW, startH } = dragging.current;
    if (dir === "e" || dir === "se") {
      const w = Math.min(maxWidth, Math.max(minWidth, startW + e.clientX - startX));
      setSize(s => ({ ...s, width: w }));
    }
    if (dir === "s" || dir === "se") {
      const h = Math.min(maxHeight, Math.max(minHeight, startH + e.clientY - startY));
      setSize(s => ({ ...s, height: h }));
    }
  }, [maxWidth, minWidth, maxHeight, minHeight]);

  const onMouseUp = useCallback(() => {
    dragging.current = null;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }, [onMouseMove]);

  const startDrag = (dir: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = { dir, startX: e.clientX, startY: e.clientY, startW: size.width, startH: size.height };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      className={cn("relative overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg", className)}
      style={{ width: size.width, height: size.height }}
      {...props}
    >
      {children}
      {(direction === "horizontal" || direction === "both") && (
        <div onMouseDown={startDrag("e")} className={cn("absolute right-0 top-0 bottom-0 w-1.5 cursor-ew-resize hover:bg-brand-300 dark:hover:bg-brand-600 transition-colors group", handleClassName)}>
          <div className="absolute inset-y-0 left-0 w-px bg-gray-200 dark:bg-gray-700 group-hover:bg-brand-500" />
        </div>
      )}
      {(direction === "vertical" || direction === "both") && (
        <div onMouseDown={startDrag("s")} className={cn("absolute bottom-0 left-0 right-0 h-1.5 cursor-ns-resize hover:bg-brand-300 dark:hover:bg-brand-600 transition-colors group", handleClassName)}>
          <div className="absolute inset-x-0 top-0 h-px bg-gray-200 dark:bg-gray-700 group-hover:bg-brand-500" />
        </div>
      )}
      {direction === "both" && (
        <div onMouseDown={startDrag("se")} className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end pr-1 pb-1">
          <svg className="w-2.5 h-2.5 text-gray-400" fill="currentColor" viewBox="0 0 6 6"><path d="M6 0L0 6h6V0z"/></svg>
        </div>
      )}
    </div>
  );
};
