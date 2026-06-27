"use client";
import { useState, useRef, useEffect, KeyboardEvent, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface AutocompleteOption { value: string; label: string; group?: string; disabled?: boolean; }

export interface AutocompleteProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: AutocompleteOption[];
  value?: string;
  onChange?: (value: string, option?: AutocompleteOption) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  clearable?: boolean;
  loading?: boolean;
  freeSolo?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeInput: Record<string, string> = { sm: "h-8 text-sm", md: "h-10 text-sm", lg: "h-11 text-base" };

export const Autocomplete = ({
  options, value = "", onChange, placeholder, label, hint, error, disabled, clearable = true,
  loading = false, freeSolo = false, size = "md", className, ...props
}: AutocompleteProps) => {
  const [inputVal, setInputVal] = useState(value);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = options.filter(o =>
    !inputVal || o.label.toLowerCase().includes(inputVal.toLowerCase())
  );

  // Group by group key
  const grouped: Record<string, AutocompleteOption[]> = {};
  filtered.forEach(o => { const g = o.group ?? ""; (grouped[g] = grouped[g] || []).push(o); });

  useEffect(() => { setInputVal(value); }, [value]);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (!containerRef.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const select = (opt: AutocompleteOption) => {
    if (opt.disabled) return;
    setInputVal(opt.label);
    onChange?.(opt.value, opt);
    setOpen(false);
    setActiveIdx(-1);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!open && e.key === "ArrowDown") { setOpen(true); return; }
    if (e.key === "Escape") { setOpen(false); return; }
    if (e.key === "ArrowDown") { setActiveIdx(i => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp")   { setActiveIdx(i => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && activeIdx >= 0) { select(filtered[activeIdx]); }
  };

  const handleInput = (v: string) => {
    setInputVal(v);
    setOpen(true);
    setActiveIdx(-1);
    if (freeSolo) onChange?.(v);
  };

  return (
    <div ref={containerRef} className={cn("flex flex-col gap-1.5", className)} {...props}>
      {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          value={inputVal}
          disabled={disabled}
          placeholder={placeholder}
          onChange={e => handleInput(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKey}
          aria-invalid={!!error}
          className={cn(
            "w-full rounded-lg border px-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error ? "border-red-500" : "border-gray-300 dark:border-gray-600",
            sizeInput[size],
            clearable && inputVal ? "pr-8" : "pr-8"
          )}
        />
        <div className="absolute inset-y-0 right-2 flex items-center gap-1">
          {loading && <svg className="animate-spin w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>}
          {clearable && inputVal && !loading && (
            <button type="button" onClick={() => { setInputVal(""); onChange?.(""); inputRef.current?.focus(); }} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg leading-none">×</button>
          )}
          {!loading && !inputVal && <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>}
        </div>
        {open && filtered.length > 0 && (
          <ul role="listbox" className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg py-1">
            {Object.entries(grouped).map(([group, items]) => (
              <div key={group}>
                {group && <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">{group}</div>}
                {items.map((opt, i) => {
                  const flatIdx = filtered.indexOf(opt);
                  return (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={activeIdx === flatIdx}
                      onClick={() => select(opt)}
                      onMouseEnter={() => setActiveIdx(flatIdx)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-colors",
                        activeIdx === flatIdx ? "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
                        opt.disabled && "opacity-40 pointer-events-none"
                      )}
                    >
                      {opt.label}
                      {opt.value === value && <svg className="ml-auto w-4 h-4 text-brand-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                    </li>
                  );
                })}
              </div>
            ))}
          </ul>
        )}
        {open && !loading && filtered.length === 0 && (
          <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
            {freeSolo ? `Press Enter to add "${inputVal}"` : "No results found."}
          </div>
        )}
      </div>
      {hint && !error && <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
      {error && <p className="text-xs text-red-500" role="alert">{error}</p>}
    </div>
  );
};
