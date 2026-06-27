import { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes, TableHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  size?: "sm" | "md" | "lg";
  stickyHeader?: boolean;
}

const cellPadding = { sm: "px-3 py-1.5", md: "px-4 py-3", lg: "px-6 py-4" };

export const Table = ({ striped = false, bordered = false, hoverable = true, size = "md", stickyHeader = false, className, children, ...props }: TableProps) => (
  <div className="w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
    <table
      className={cn("w-full text-sm text-left", bordered && "border-collapse", className)}
      data-striped={striped}
      data-hoverable={hoverable}
      data-size={size}
      {...props}
    >
      {children}
    </table>
  </div>
);

export const TableHead   = ({ className, children, ...p }: HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn("bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide", className)} {...p}>{children}</thead>
);
export const TableBody   = ({ className, children, ...p }: HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn("divide-y divide-gray-100 dark:divide-gray-800", className)} {...p}>{children}</tbody>
);
export const TableRow    = ({ className, children, ...p }: HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={cn("transition-colors odd:bg-white dark:odd:bg-transparent even:bg-gray-50/50 dark:even:bg-gray-800/30 hover:bg-gray-50 dark:hover:bg-gray-800", className)} {...p}>{children}</tr>
);
export const TableHeader = ({ className, children, ...p }: ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={cn("px-4 py-3 font-semibold text-left", className)} {...p}>{children}</th>
);
export const TableCell   = ({ className, children, ...p }: TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn("px-4 py-3 text-gray-700 dark:text-gray-300", className)} {...p}>{children}</td>
);
export const TableCaption = ({ className, children, ...p }: HTMLAttributes<HTMLTableCaptionElement>) => (
  <caption className={cn("py-2 text-xs text-gray-500 dark:text-gray-400 text-left", className)} {...p}>{children}</caption>
);
