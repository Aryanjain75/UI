import { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type TypographyVariant =
  | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  | "subtitle1" | "subtitle2"
  | "body1" | "body2"
  | "caption" | "overline" | "label"
  | "lead" | "muted" | "code" | "blockquote";

export type TypographyAlign = "left" | "center" | "right" | "justify";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: ElementType;
  align?: TypographyAlign;
  noWrap?: boolean;
  gutterBottom?: boolean;
  color?: "default" | "muted" | "primary" | "success" | "danger" | "warning";
}

const variantDefaults: Record<TypographyVariant, { tag: ElementType; cls: string }> = {
  h1:         { tag: "h1", cls: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" },
  h2:         { tag: "h2", cls: "scroll-m-20 text-3xl font-semibold tracking-tight" },
  h3:         { tag: "h3", cls: "scroll-m-20 text-2xl font-semibold tracking-tight" },
  h4:         { tag: "h4", cls: "scroll-m-20 text-xl font-semibold tracking-tight" },
  h5:         { tag: "h5", cls: "text-lg font-semibold" },
  h6:         { tag: "h6", cls: "text-base font-semibold" },
  subtitle1:  { tag: "p",  cls: "text-base font-medium leading-7" },
  subtitle2:  { tag: "p",  cls: "text-sm font-medium leading-6" },
  body1:      { tag: "p",  cls: "text-base leading-7" },
  body2:      { tag: "p",  cls: "text-sm leading-6" },
  caption:    { tag: "span", cls: "text-xs text-gray-500 dark:text-gray-400" },
  overline:   { tag: "span", cls: "text-xs font-semibold uppercase tracking-widest" },
  label:      { tag: "label", cls: "text-sm font-medium" },
  lead:       { tag: "p",  cls: "text-xl text-gray-600 dark:text-gray-400 leading-8" },
  muted:      { tag: "p",  cls: "text-sm text-gray-500 dark:text-gray-400" },
  code:       { tag: "code", cls: "relative rounded bg-gray-100 dark:bg-gray-800 px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium" },
  blockquote: { tag: "blockquote", cls: "mt-6 border-l-4 border-gray-300 dark:border-gray-600 pl-6 italic text-gray-700 dark:text-gray-300" },
};

const colorStyles: Record<string, string> = {
  default: "text-gray-900 dark:text-gray-100",
  muted:   "text-gray-500 dark:text-gray-400",
  primary: "text-brand-600 dark:text-brand-400",
  success: "text-green-600 dark:text-green-400",
  danger:  "text-red-600 dark:text-red-400",
  warning: "text-yellow-600 dark:text-yellow-400",
};

const alignStyles: Record<TypographyAlign, string> = {
  left: "text-left", center: "text-center", right: "text-right", justify: "text-justify",
};

export const Typography = ({
  variant = "body1", as, align, noWrap = false, gutterBottom = false, color = "default",
  className, children, ...props
}: TypographyProps) => {
  const { tag: DefaultTag, cls } = variantDefaults[variant];
  const Tag = as ?? DefaultTag;
  return (
    <Tag
      className={cn(
        cls,
        colorStyles[color],
        align && alignStyles[align],
        noWrap && "truncate",
        gutterBottom && "mb-4",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};
