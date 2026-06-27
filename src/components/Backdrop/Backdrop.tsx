"use client";
import { HTMLAttributes, ReactNode, useEffect } from "react";
import { cn } from "../../utils/cn";

export interface BackdropProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  invisible?: boolean;
  children?: ReactNode;
}

export const Backdrop = ({ open, onClose, invisible = false, className, children, ...props }: BackdropProps) => {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 flex items-center justify-center",
        !invisible && "bg-black/50 backdrop-blur-sm",
        "animate-in fade-in duration-200",
        className
      )}
      onClick={onClose}
      aria-hidden={!children}
      {...props}
    >
      {children && (
        <div onClick={e => e.stopPropagation()}>{children}</div>
      )}
    </div>
  );
};
