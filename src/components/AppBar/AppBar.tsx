import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type AppBarPosition = "fixed" | "sticky" | "static" | "relative" | "absolute";
export type AppBarColor    = "default" | "primary" | "transparent";

export interface AppBarProps extends HTMLAttributes<HTMLElement> {
  position?: AppBarPosition;
  color?: AppBarColor;
  elevation?: boolean;
  bordered?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
}

const colorStyles: Record<AppBarColor, string> = {
  default:     "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
  primary:     "bg-brand-600 text-white",
  transparent: "bg-transparent text-gray-900 dark:text-gray-100",
};
const positionStyles: Record<AppBarPosition, string> = {
  fixed:    "fixed top-0 inset-x-0 z-50",
  sticky:   "sticky top-0 z-40",
  static:   "static",
  relative: "relative",
  absolute: "absolute top-0 inset-x-0 z-50",
};

export const AppBar = ({
  position = "sticky", color = "default", elevation = true, bordered = false,
  startContent, endContent, className, children, ...props
}: AppBarProps) => (
  <header
    className={cn(
      "flex items-center gap-4 w-full px-4 h-16",
      colorStyles[color],
      positionStyles[position],
      elevation && "shadow-sm",
      bordered && "border-b border-gray-200 dark:border-gray-700",
      className
    )}
    {...props}
  >
    {startContent && <div className="flex items-center gap-2 shrink-0">{startContent}</div>}
    <div className="flex-1 min-w-0">{children}</div>
    {endContent && <div className="flex items-center gap-2 shrink-0 ml-auto">{endContent}</div>}
  </header>
);

export const AppBarTitle = ({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("text-lg font-semibold truncate", className)} {...props}>{children}</span>
);
