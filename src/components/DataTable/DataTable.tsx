"use client";
import { useState, useMemo, ReactNode, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type SortDirection = "asc" | "desc" | null;

export interface DataTableColumn<T = any> {
  key: string;
  header: ReactNode;
  cell?: (row: T, index: number) => ReactNode;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
}

export interface DataTableProps<T = any> extends HTMLAttributes<HTMLDivElement> {
  columns: DataTableColumn<T>[];
  data: T[];
  keyField?: string;
  loading?: boolean;
  emptyMessage?: string;
  selectable?: boolean;
  selectedKeys?: Set<string>;
  onSelectionChange?: (keys: Set<string>) => void;
  striped?: boolean;
  stickyHeader?: boolean;
  caption?: string;
  pageSize?: number;
}

export function DataTable<T extends Record<string, any>>({
  columns, data, keyField = "id", loading = false, emptyMessage = "No data available",
  selectable = false, selectedKeys, onSelectionChange,
  striped = false, stickyHeader = false, caption, pageSize,
  className, ...props
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [page, setPage] = useState(1);

  const handleSort = (key: string) => {
    if (sortKey !== key) { setSortKey(key); setSortDir("asc"); }
    else if (sortDir === "asc") setSortDir("desc");
    else { setSortKey(null); setSortDir(null); }
  };

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return [...data];
    return [...data].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const paginated = pageSize ? sorted.slice((page - 1) * pageSize, page * pageSize) : sorted;
  const totalPages = pageSize ? Math.ceil(sorted.length / pageSize) : 1;

  const toggleAll = () => {
    if (!onSelectionChange) return;
    if (selectedKeys?.size === data.length) onSelectionChange(new Set());
    else onSelectionChange(new Set(data.map(r => String(r[keyField]))));
  };

  const toggleRow = (key: string) => {
    if (!onSelectionChange || !selectedKeys) return;
    const next = new Set(selectedKeys);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    onSelectionChange(next);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm text-left">
          {caption && <caption className="px-4 py-2 text-xs text-gray-500 text-left">{caption}</caption>}
          <thead className={cn("bg-gray-50 dark:bg-gray-800", stickyHeader && "sticky top-0 z-10")}>
            <tr>
              {selectable && (
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedKeys?.size === data.length && data.length > 0}
                    onChange={toggleAll}
                    className="rounded border-gray-300 dark:border-gray-600 accent-brand-600"
                  />
                </th>
              )}
              {columns.map(col => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 whitespace-nowrap",
                    col.sortable && "cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200",
                    col.align === "center" && "text-center",
                    col.align === "right"  && "text-right"
                  )}
                  style={{ width: col.width }}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {col.sortable && (
                      <span className="text-gray-300 dark:text-gray-600">
                        {sortKey === col.key ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {selectable && <td className="px-4 py-3"><div className="w-4 h-4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" /></td>}
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-3">
                      <div className="h-4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-12 text-center text-sm text-gray-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : paginated.map((row, idx) => {
              const key = String(row[keyField] ?? idx);
              const isSelected = selectedKeys?.has(key);
              return (
                <tr
                  key={key}
                  className={cn(
                    "transition-colors",
                    striped && idx % 2 === 1 && "bg-gray-50/50 dark:bg-gray-800/30",
                    isSelected && "bg-brand-50/60 dark:bg-brand-950/40",
                    "hover:bg-gray-50 dark:hover:bg-gray-800/60"
                  )}
                >
                  {selectable && (
                    <td className="w-10 px-4 py-3">
                      <input type="checkbox" checked={!!isSelected} onChange={() => toggleRow(key)} className="rounded border-gray-300 dark:border-gray-600 accent-brand-600" />
                    </td>
                  )}
                  {columns.map(col => (
                    <td
                      key={col.key}
                      className={cn(
                        "px-4 py-3 text-gray-700 dark:text-gray-300",
                        col.align === "center" && "text-center",
                        col.align === "right"  && "text-right"
                      )}
                    >
                      {col.cell ? col.cell(row, idx) : row[col.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pageSize && totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, sorted.length)} of {sorted.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button" disabled={page === 1} onClick={() => setPage(p => p - 1)}
              className="px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 transition-colors"
            >‹ Prev</button>
            <span className="px-3 py-1 rounded-md bg-brand-600 text-white text-xs font-semibold">{page}</span>
            <button
              type="button" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
              className="px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 transition-colors"
            >Next ›</button>
          </div>
        </div>
      )}
    </div>
  );
}
