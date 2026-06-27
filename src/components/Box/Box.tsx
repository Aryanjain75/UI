import { ElementType, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface BoxProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  p?: string; m?: string;
  display?: "block" | "flex" | "grid" | "inline" | "inline-flex" | "hidden";
}

export const Box = ({ as: Tag = "div", p, m, display, className, ...props }: BoxProps) => (
  <Tag className={cn(p, m, display, className)} {...props} />
);
