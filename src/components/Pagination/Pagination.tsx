"use client";
import { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  total: number;
  page: number;
  pageSize?: number;
  siblings?: number;
  onChange: (page: number) => void;
  showEdges?: boolean;
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export const Pagination = ({
  total, page, pageSize = 10, siblings = 1, onChange, showEdges = true, className, ...props
}: PaginationProps) => {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const left  = Math.max(2, page - siblings);
  const right = Math.min(totalPages - 1, page + siblings);
  const pages: (number | "...")[] = [1];
  if (left > 2) pages.push("...");
  pages.push(...range(left, right));
  if (right < totalPages - 1) pages.push("...");
  if (totalPages > 1) pages.push(totalPages);

  const btn = (label: string | number, active: boolean, disabled: boolean, onClick: () => void) => (
    <button
      key={`${label}-${active}`}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center h-8 min-w-[2rem] px-2 rounded-md text-sm font-medium transition-colors",
        active
          ? "bg-brand-600 text-white"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none"
      )}
    >
      {label}
    </button>
  );

  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-1", className)} {...props}>
      {btn("‹", false, page === 1, () => onChange(page - 1))}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-1 text-gray-400 select-none">…</span>
        ) : (
          btn(p, p === page, false, () => onChange(p as number))
        )
      )}
      {btn("›", false, page === totalPages, () => onChange(page + 1))}
    </nav>
  );
};