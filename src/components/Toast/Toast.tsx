"use client";
import { useState, useEffect, useCallback, ReactNode, createContext, useContext } from "react";
import { cn } from "../../utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant  = "default" | "success" | "error" | "warning" | "info";
export type ToastPosition = "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";

export interface ToastItem {
  id: string;
  title?: string;
  message: ReactNode;
  variant?: ToastVariant;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface ToastContextValue { toast: (opts: Omit<ToastItem, "id">) => string; dismiss: (id: string) => void; }
const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const variantStyles: Record<ToastVariant, string> = {
  default: "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700",
  success: "bg-white dark:bg-gray-900 border-green-200 dark:border-green-800",
  error:   "bg-white dark:bg-gray-900 border-red-200 dark:border-red-800",
  warning: "bg-white dark:bg-gray-900 border-yellow-200 dark:border-yellow-800",
  info:    "bg-white dark:bg-gray-900 border-blue-200 dark:border-blue-800",
};
const iconMap: Record<ToastVariant, { icon: string; color: string }> = {
  default: { icon: "ℹ", color: "text-gray-500" },
  success: { icon: "✓", color: "text-green-500" },
  error:   { icon: "✕", color: "text-red-500" },
  warning: { icon: "⚠", color: "text-yellow-500" },
  info:    { icon: "ℹ", color: "text-blue-500" },
};
const positionStyles: Record<ToastPosition, string> = {
  "top-right":     "top-4 right-4",
  "top-left":      "top-4 left-4",
  "top-center":    "top-4 left-1/2 -translate-x-1/2",
  "bottom-right":  "bottom-4 right-4",
  "bottom-left":   "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

// ─── Provider ─────────────────────────────────────────────────────────────────

export const ToastProvider = ({
  children, position = "top-right",
}: { children: ReactNode; position?: ToastPosition }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => setToasts(p => p.filter(t => t.id !== id)), []);

  const toast = useCallback((opts: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(p => [...p, { id, duration: 4000, variant: "default", ...opts }]);
    return id;
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className={cn("fixed z-[9999] flex flex-col gap-2 pointer-events-none w-full max-w-xs", positionStyles[position])}>
        {toasts.map(t => (
          <ToastCard key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// ─── Card ─────────────────────────────────────────────────────────────────────

const ToastCard = ({ toast: t, onDismiss }: { toast: ToastItem; onDismiss: (id: string) => void }) => {
  useEffect(() => {
    if (!t.duration) return;
    const timer = setTimeout(() => onDismiss(t.id), t.duration);
    return () => clearTimeout(timer);
  }, [t, onDismiss]);
  const { icon, color } = iconMap[t.variant ?? "default"];
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "pointer-events-auto flex items-start gap-3 w-full rounded-xl border shadow-lg px-4 py-3.5 animate-in slide-in-from-right-4 fade-in duration-200",
        variantStyles[t.variant ?? "default"]
      )}
    >
      <span className={cn("shrink-0 mt-0.5 font-bold", color)}>{icon}</span>
      <div className="flex-1 min-w-0">
        {t.title && <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{t.title}</p>}
        <p className="text-sm text-gray-600 dark:text-gray-400">{t.message}</p>
        {t.action && (
          <button
            onClick={() => { t.action!.onClick(); onDismiss(t.id); }}
            className="mt-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            {t.action.label}
          </button>
        )}
      </div>
      <button
        onClick={() => onDismiss(t.id)}
        aria-label="Dismiss"
        className="shrink-0 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors ml-1"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
