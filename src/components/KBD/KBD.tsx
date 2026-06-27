import { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface KBDProps extends HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
}

const sizeStyles = { sm: "text-[10px] px-1 py-0.5", md: "text-xs px-1.5 py-0.5", lg: "text-sm px-2 py-1" };

export const KBD = ({ size = "md", className, children, ...props }: KBDProps) => (
  <kbd
    className={cn(
      "inline-flex items-center justify-center font-mono font-medium rounded border",
      "bg-gray-100 border-gray-300 text-gray-700",
      "dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300",
      "shadow-[0_2px_0_0_theme(colors.gray.300)] dark:shadow-[0_2px_0_0_theme(colors.gray.600)]",
      sizeStyles[size],
      className
    )}
    {...props}
  >
    {children}
  </kbd>
);

export const KBDGroup = ({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("inline-flex items-center gap-0.5", className)} {...props}>{children}</span>
);
