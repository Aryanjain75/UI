import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  /** If true, this is the current page */
  current?: boolean;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Breadcrumb = ({
  items,
  separator = "/",
  className,
  ...props
}: BreadcrumbProps) => (
  <nav aria-label="Breadcrumb" className={cn("flex", className)} {...props}>
    <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-1.5">
          {i > 0 && (
            <span className="opacity-40 select-none" aria-hidden="true">
              {separator}
            </span>
          )}
          {item.current || !item.href ? (
            <span
              aria-current={item.current ? "page" : undefined}
              className={cn(item.current && "font-medium text-gray-900 dark:text-gray-100")}
            >
              {item.label}
            </span>
          ) : (
            <a
              href={item.href}
              className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors underline-offset-2 hover:underline"
            >
              {item.label}
            </a>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
