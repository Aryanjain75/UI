import { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type AspectRatioValue = "1/1" | "4/3" | "16/9" | "21/9" | "3/2" | "2/3" | "9/16" | "auto";

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: AspectRatioValue | number;
}

const ratioStyles: Record<string, string> = {
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-video",
  "21/9": "aspect-[21/9]",
  "3/2": "aspect-[3/2]",
  "2/3": "aspect-[2/3]",
  "9/16": "aspect-[9/16]",
  "auto": "",
};

export const AspectRatio = ({ ratio = "16/9", className, children, style, ...props }: AspectRatioProps) => {
  const cls = typeof ratio === "string" ? (ratioStyles[ratio] ?? "") : "";
  const inlineStyle = typeof ratio === "number" ? { aspectRatio: String(ratio), ...style } : style;
  return (
    <div
      className={cn("relative overflow-hidden w-full", cls, className)}
      style={inlineStyle}
      {...props}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
};
