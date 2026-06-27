import { AnchorHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type LinkVariant = "default" | "primary" | "muted" | "danger";
export type LinkUnderline = "always" | "hover" | "none";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkVariant;
  underline?: LinkUnderline;
  external?: boolean;
}

const variantStyles: Record<LinkVariant, string> = {
  default: "text-gray-900 dark:text-gray-100",
  primary: "text-brand-600 dark:text-brand-400",
  muted:   "text-gray-500 dark:text-gray-400",
  danger:  "text-red-600 dark:text-red-400",
};

export const Link = ({
  variant = "primary", underline = "hover", external = false, className, children, ...props
}: LinkProps) => (
  <a
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className={cn(
      "inline-flex items-center gap-0.5 transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm",
      variantStyles[variant],
      underline === "always" && "underline underline-offset-2",
      underline === "hover" && "hover:underline underline-offset-2",
      className
    )}
    {...props}
  >
    {children}
    {external && (
      <svg className="w-3 h-3 ml-0.5 opacity-60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    )}
  </a>
);
