import { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Internal padding */
  padding?: CardPadding;
  /** Adds a visible border */
  bordered?: boolean;
  /** Lifts the card with a shadow */
  shadow?: boolean;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardBodyProps   extends HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const paddingStyles: Record<CardPadding, string> = {
  none: "p-0",
  sm:   "p-3",
  md:   "p-5",
  lg:   "p-7",
};

// ─── Components ───────────────────────────────────────────────────────────────

export const Card = ({
  padding  = "md",
  bordered = true,
  shadow   = false,
  className,
  children,
  ...props
}: CardProps) => (
  <div
    className={cn(
      "bg-white rounded-lg",
      bordered && "border border-gray-200",
      shadow   && "shadow-md",
      paddingStyles[padding],
      className
    )}
    {...props}
  >
    {children}
  </div>
);

/** Optional sub-component for a card header with a bottom divider */
export const CardHeader = ({ className, children, ...props }: CardHeaderProps) => (
  <div
    className={cn("pb-4 mb-4 border-b border-gray-100 font-semibold text-gray-900", className)}
    {...props}
  >
    {children}
  </div>
);

/** Optional sub-component for the main card body */
export const CardBody = ({ className, children, ...props }: CardBodyProps) => (
  <div className={cn("text-gray-700", className)} {...props}>
    {children}
  </div>
);

/** Optional sub-component for a card footer with a top divider */
export const CardFooter = ({ className, children, ...props }: CardFooterProps) => (
  <div
    className={cn("pt-4 mt-4 border-t border-gray-100", className)}
    {...props}
  >
    {children}
  </div>
);
