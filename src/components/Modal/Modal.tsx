"use client";
import { useEffect, useRef, ReactNode, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  size?: ModalSize;
  centered?: boolean;
  scrollBehavior?: "inside" | "outside";
  children: ReactNode;
  className?: string;
}

const sizeStyles: Record<ModalSize, string> = {
  xs:   "max-w-xs",
  sm:   "max-w-sm",
  md:   "max-w-md",
  lg:   "max-w-lg",
  xl:   "max-w-2xl",
  "2xl":"max-w-4xl",
  full: "max-w-full mx-4 my-4 min-h-[80vh]",
};

export const Modal        = ({ open, onClose, size = "md", centered = true, scrollBehavior = "outside", children, className }: ModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [open, onClose]);
  useEffect(() => { if (open) panelRef.current?.focus(); }, [open]);
  if (!open) return null;
  return (
    <div className={cn("fixed inset-0 z-50 p-4 flex", centered ? "items-center justify-center" : "items-start justify-center pt-16", scrollBehavior === "outside" && "overflow-y-auto")}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef} tabIndex={-1} role="dialog" aria-modal="true"
        className={cn("relative z-10 w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl outline-none", sizeStyles[size], scrollBehavior === "inside" && "flex flex-col max-h-[90vh]", className)}
      >
        {children}
      </div>
    </div>
  );
};
export const ModalHeader  = ({ className, children, ...p }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 shrink-0", className)} {...p}>{children}</div>
);
export const ModalBody    = ({ className, children, ...p }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-6 py-5 flex-1 overflow-y-auto", className)} {...p}>{children}</div>
);
export const ModalFooter  = ({ className, children, ...p }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800 shrink-0", className)} {...p}>{children}</div>
);
