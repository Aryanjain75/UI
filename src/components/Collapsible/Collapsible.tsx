"use client";
import { useState, HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger: ReactNode;
  children: ReactNode;
  animated?: boolean;
}

export const Collapsible = ({
  open: controlledOpen, defaultOpen = false, onOpenChange, trigger, children, animated = true, className, ...props
}: CollapsibleProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const toggle = () => {
    const next = !isOpen;
    setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      <div onClick={toggle} className="cursor-pointer">{trigger}</div>
      <div
        className={cn(
          "overflow-hidden transition-all",
          animated && "duration-300 ease-in-out",
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="pt-1">{children}</div>
      </div>
    </div>
  );
};
