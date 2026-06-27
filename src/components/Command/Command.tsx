"use client";
import { useState, useEffect, useRef, KeyboardEvent, ReactNode, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface CommandItem {
  id: string;
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  group?: string;
  onSelect?: () => void;
  disabled?: boolean;
}

export interface CommandProps {
  open: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
  className?: string;
  emptyMessage?: string;
}

export const Command = ({
  open, onClose, items, placeholder = "Type a command or search…", className, emptyMessage = "No results found.",
}: CommandProps) => {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (open) { setQuery(""); setActiveIdx(0); setTimeout(() => inputRef.current?.focus(), 50); } }, [open]);
  useEffect(() => { const h = (e: globalThis.KeyboardEvent) => e.key === "Escape" && onClose(); document.addEventListener("keydown", h); return () => document.removeEventListener("keydown", h); }, [onClose]);

  const filtered = items.filter(i => i.label.toLowerCase().includes(query.toLowerCase()));
  const grouped: Record<string, CommandItem[]> = {};
  filtered.forEach(i => { const g = i.group ?? ""; (grouped[g] = grouped[g] || []).push(i); });

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && filtered[activeIdx]) { filtered[activeIdx].onSelect?.(); onClose(); }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-label="Command menu"
        className={cn(
          "relative z-10 w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden",
          "animate-in fade-in zoom-in-95 duration-150",
          className
        )}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z"/></svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveIdx(0); }}
            onKeyDown={handleKey}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none"
          />
          {query && <button type="button" onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600 text-lg leading-none shrink-0">×</button>}
        </div>
        <div className="max-h-80 overflow-y-auto py-1">
          {filtered.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-gray-400">{emptyMessage}</p>
          ) : (
            Object.entries(grouped).map(([group, groupItems]) => (
              <div key={group}>
                {group && <p className="px-3 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">{group}</p>}
                {groupItems.map(item => {
                  const flatIdx = filtered.indexOf(item);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={item.disabled}
                      onClick={() => { item.onSelect?.(); onClose(); }}
                      onMouseEnter={() => setActiveIdx(flatIdx)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors",
                        flatIdx === activeIdx ? "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300" : "text-gray-700 dark:text-gray-300",
                        item.disabled && "opacity-40 pointer-events-none"
                      )}
                    >
                      {item.icon && <span className="w-4 h-4 text-gray-500 shrink-0">{item.icon}</span>}
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.shortcut && <kbd className="text-[11px] font-mono text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">{item.shortcut}</kbd>}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
