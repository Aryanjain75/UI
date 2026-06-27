"use client";
import { useState, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  showOutsideDays?: boolean;
  size?: "sm" | "md" | "lg";
}

const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export const Calendar = ({
  value, onChange, minDate, maxDate, disabledDates = [], showOutsideDays = true, size = "md", className, ...props
}: CalendarProps) => {
  const today = new Date();
  const [viewing, setViewing] = useState(() => value ? new Date(value.getFullYear(), value.getMonth(), 1) : new Date(today.getFullYear(), today.getMonth(), 1));

  const year  = viewing.getFullYear();
  const month = viewing.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev  = new Date(year, month, 0).getDate();

  const cells: { date: Date; outside: boolean }[] = [];
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ date: new Date(year, month - 1, daysInPrev - i), outside: true });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ date: new Date(year, month, d), outside: false });
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) cells.push({ date: new Date(year, month + 1, d), outside: true });

  const isDisabled = (d: Date) => {
    if (minDate && d < minDate) return true;
    if (maxDate && d > maxDate) return true;
    return disabledDates.some(dd => sameDay(dd, d));
  };

  const cellSize = size === "sm" ? "w-7 h-7 text-xs" : size === "lg" ? "w-10 h-10 text-sm" : "w-9 h-9 text-sm";

  return (
    <div className={cn("inline-flex flex-col gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900", className)} {...props}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setViewing(new Date(year, month - 1, 1))}
          className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
          aria-label="Previous month"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button
          type="button"
          className="text-sm font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-md transition-colors"
          onClick={() => setViewing(new Date(today.getFullYear(), today.getMonth(), 1))}
        >
          {MONTHS[month]} {year}
        </button>
        <button
          type="button"
          onClick={() => setViewing(new Date(year, month + 1, 1))}
          className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
          aria-label="Next month"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-0.5">
        {DAYS.map(d => (
          <div key={d} className={cn("flex items-center justify-center font-medium text-gray-400 dark:text-gray-500", cellSize)}>{d}</div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map(({ date, outside }, i) => {
          const disabled = isDisabled(date);
          const isToday  = sameDay(date, today);
          const selected = value && sameDay(date, value);

          if (outside && !showOutsideDays) return <div key={i} className={cellSize} />;

          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onChange?.(date)}
              className={cn(
                "flex items-center justify-center rounded-full font-medium transition-all duration-100",
                cellSize,
                selected  && "bg-brand-600 text-white hover:bg-brand-700",
                !selected && isToday && "border-2 border-brand-500 text-brand-600 dark:text-brand-400",
                !selected && !disabled && !outside && "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800",
                !selected && outside && "text-gray-300 dark:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800",
                disabled  && "opacity-30 cursor-not-allowed",
                !disabled && "cursor-pointer"
              )}
              aria-label={date.toDateString()}
              aria-pressed={!!selected}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
