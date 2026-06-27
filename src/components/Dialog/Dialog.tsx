"use client";
import { useEffect, useRef, ReactNode, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type DialogSize = "sm" | "md" | "lg" | "xl" | "full";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  size?: DialogSize;
  closeOnBackdrop?: boolean;
}

const sizeStyles: Record<DialogSize, string> = {
  sm:   "max-w-sm",
  md:   "max-w-md",
  lg:   "max-w-lg",
  xl:   "max-w-2xl",
  full: "max-w-full m-4",
};

export const Dialog = ({
  open, onClose, title, description, children, size = "md", closeOnBackdrop = true,
}: DialogProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [open, onClose]);

  useEffect(() => { if (open) ref.current?.focus(); }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in"
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "dialog-title" : undefined}
        aria-describedby={description ? "dialog-desc" : undefined}
        tabIndex={-1}
        className={cn(
          "relative z-10 w-full bg-white dark:bg-gray-900 rounded-xl shadow-2xl outline-none",
          "animate-in fade-in zoom-in-95 duration-200",
          sizeStyles[size]
        )}
      >
        {/* Header */}
        {(title || description) && (
          <div className="px-6 pt-6 pb-0">
            {title && <h2 id="dialog-title" className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>}
            {description && <p id="dialog-desc" className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
          </div>
        )}
        {/* Body */}
        <div className="px-6 py-6">{children}</div>
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 rounded-md p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const DialogFooter = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800", className)} {...props}>
    {children}
  </div>
);
