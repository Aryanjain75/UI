"use client";
import { useEffect, useRef, ReactNode, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type DrawerPlacement = "left" | "right" | "top" | "bottom";
export type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  placement?: DrawerPlacement;
  size?: DrawerSize;
  title?: ReactNode;
  children?: ReactNode;
  closeOnBackdrop?: boolean;
}

const placementStyles: Record<DrawerPlacement, string> = {
  left:   "inset-y-0 left-0 h-full",
  right:  "inset-y-0 right-0 h-full",
  top:    "inset-x-0 top-0 w-full",
  bottom: "inset-x-0 bottom-0 w-full",
};

const sizeMap: Record<DrawerSize, string> = {
  sm: "w-64",
  md: "w-80",
  lg: "w-96",
  xl: "w-[480px]",
  full: "w-full",
};

const heightMap: Record<DrawerSize, string> = {
  sm: "h-1/3",
  md: "h-1/2",
  lg: "h-2/3",
  xl: "h-3/4",
  full: "h-full",
};

export const Drawer = ({
  open, onClose, placement = "right", size = "md", title, children, closeOnBackdrop = true,
}: DrawerProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [open, onClose]);

  useEffect(() => { if (open) panelRef.current?.focus(); }, [open]);

  if (!open) return null;

  const isHorizontal = placement === "left" || placement === "right";

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : "Drawer"}
        tabIndex={-1}
        className={cn(
          "absolute z-10 bg-white dark:bg-gray-900 shadow-2xl outline-none flex flex-col",
          placementStyles[placement],
          isHorizontal ? sizeMap[size] : heightMap[size]
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          {title && <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h2>}
          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="ml-auto rounded-md p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
};
