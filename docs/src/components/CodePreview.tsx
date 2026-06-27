"use client";
import { useState } from "react";
import { cn } from "./cn";

interface CodePreviewProps {
  preview: React.ReactNode;
  code: string;
  title?: string;
  className?: string;
}

export const CodePreview = ({ preview, code, title, className }: CodePreviewProps) => {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden", className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-1">
          {(["preview", "code"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors",
                tab === t
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              )}
            >
              {t}
            </button>
          ))}
        </div>
        {title && <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">{title}</span>}
        {tab === "code" && (
          <button
            onClick={copy}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        )}
      </div>

      {/* Preview */}
      {tab === "preview" && (
        <div className="p-8 bg-white dark:bg-gray-900 min-h-[120px] flex items-center justify-center">
          <div className="w-full">{preview}</div>
        </div>
      )}

      {/* Code */}
      {tab === "code" && (
        <div className="bg-gray-950 overflow-x-auto">
          <pre className="p-4 text-sm text-gray-100 font-mono leading-relaxed">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
