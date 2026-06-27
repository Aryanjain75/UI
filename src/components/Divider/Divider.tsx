import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerAlign = "start" | "center" | "end";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
  align?: DividerAlign;
  label?: ReactNode;
  dashed?: boolean;
}

export const Divider = ({
  orientation = "horizontal",
  align = "center",
  label,
  dashed = false,
  className,
  ...props
}: DividerProps) => {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn("inline-block self-stretch w-px bg-gray-200 dark:bg-gray-700", dashed && "border-l border-dashed border-gray-200 dark:border-gray-700 bg-transparent w-0", className)}
        {...props}
      />
    );
  }
  if (label) {
    return (
      <div
        role="separator"
        className={cn("flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400", className)}
        {...props}
      >
        {align !== "start" && <span className={cn("flex-1 h-px", dashed ? "border-t border-dashed border-gray-200 dark:border-gray-700" : "bg-gray-200 dark:bg-gray-700")} />}
        <span className="shrink-0">{label}</span>
        {align !== "end" && <span className={cn("flex-1 h-px", dashed ? "border-t border-dashed border-gray-200 dark:border-gray-700" : "bg-gray-200 dark:bg-gray-700")} />}
      </div>
    );
  }
  return (
    <hr
      className={cn("border-0 h-px bg-gray-200 dark:bg-gray-700", dashed && "border-t border-dashed border-gray-200 dark:border-gray-700 bg-transparent h-0", className)}
      {...(props as HTMLAttributes<HTMLHRElement>)}
    />
  );
};
