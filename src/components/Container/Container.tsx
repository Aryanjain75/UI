import { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type ContainerMaxWidth = "sm" | "md" | "lg" | "xl" | "2xl" | "full";
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: ContainerMaxWidth;
  disableGutters?: boolean;
  centered?: boolean;
}

const maxWidthStyles: Record<ContainerMaxWidth, string> = {
  sm: "max-w-sm", md: "max-w-md", lg: "max-w-4xl", xl: "max-w-6xl", "2xl": "max-w-screen-2xl", full: "max-w-full",
};

export const Container = ({ maxWidth = "lg", disableGutters = false, centered = true, className, ...props }: ContainerProps) => (
  <div className={cn("w-full", centered && "mx-auto", !disableGutters && "px-4 sm:px-6 lg:px-8", maxWidthStyles[maxWidth], className)} {...props} />
);
