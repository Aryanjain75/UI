import { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type StackDirection = "row" | "column" | "row-reverse" | "column-reverse";
export type StackAlign     = "start" | "center" | "end" | "stretch" | "baseline";
export type StackJustify   = "start" | "center" | "end" | "between" | "around" | "evenly";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection;
  spacing?: number;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  divider?: boolean;
}

const dirMap: Record<StackDirection, string> = {
  "row": "flex-row", "column": "flex-col", "row-reverse": "flex-row-reverse", "column-reverse": "flex-col-reverse",
};
const alignMap: Record<StackAlign, string>   = {
  start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch", baseline: "items-baseline",
};
const justifyMap: Record<StackJustify, string> = {
  start: "justify-start", center: "justify-center", end: "justify-end", between: "justify-between", around: "justify-around", evenly: "justify-evenly",
};

export const Stack = ({
  direction = "column", spacing = 4, align = "stretch", justify = "start", wrap = false, divider = false, className, ...props
}: StackProps) => (
  <div
    className={cn(
      "flex",
      dirMap[direction],
      alignMap[align],
      justifyMap[justify],
      wrap && "flex-wrap",
      divider && (direction === "column" || direction === "column-reverse")
        ? "divide-y divide-gray-200 dark:divide-gray-700"
        : divider ? "divide-x divide-gray-200 dark:divide-gray-700" : "",
      className
    )}
    style={{ gap: `${spacing * 4}px` }}
    {...props}
  />
);
