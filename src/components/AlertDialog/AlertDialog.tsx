"use client";
import { ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
  confirmLoading?: boolean;
}

const variantMap = {
  danger:  { icon: "⚠", iconBg: "bg-red-100 dark:bg-red-950", iconColor: "text-red-600 dark:text-red-400", confirmBtn: "bg-red-600 hover:bg-red-700 text-white" },
  warning: { icon: "⚠", iconBg: "bg-yellow-100 dark:bg-yellow-950", iconColor: "text-yellow-600 dark:text-yellow-400", confirmBtn: "bg-yellow-600 hover:bg-yellow-700 text-white" },
  info:    { icon: "ℹ", iconBg: "bg-blue-100 dark:bg-blue-950", iconColor: "text-blue-600 dark:text-blue-400", confirmBtn: "bg-brand-600 hover:bg-brand-700 text-white" },
};

export const AlertDialog = ({
  open, onClose, onConfirm, title, description, confirmLabel = "Confirm", cancelLabel = "Cancel",
  variant = "danger", confirmLoading = false,
}: AlertDialogProps) => {
  if (!open) return null;
  const v = variantMap[variant];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="alert-title"
        aria-describedby={description ? "alert-desc" : undefined}
        className="relative z-10 w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-start gap-4">
          <div className={cn("flex items-center justify-center w-10 h-10 rounded-full shrink-0 text-xl", v.iconBg, v.iconColor)}>
            {v.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h2 id="alert-title" className="text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
            {description && <p id="alert-desc" className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={confirmLoading}
            className={cn("px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-60", v.confirmBtn)}
          >
            {confirmLoading ? "Loading…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
