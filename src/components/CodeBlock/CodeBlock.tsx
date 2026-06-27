"use client";
import { useState, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  showCopy?: boolean;
  title?: string;
  theme?: "dark" | "light";
}

export const CodeBlock = ({
  code, language = "tsx", showLineNumbers = true, showCopy = true, title, theme = "dark", className, ...props
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden border text-sm font-mono",
        theme === "dark"
          ? "bg-gray-950 border-gray-800 text-gray-100"
          : "bg-gray-50 border-gray-200 text-gray-900",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className={cn(
        "flex items-center justify-between px-4 py-2.5 border-b",
        theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      )}>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          {(title || language) && (
            <span className={cn("text-xs", theme === "dark" ? "text-gray-400" : "text-gray-500")}>
              {title ?? language}
            </span>
          )}
        </div>
        {showCopy && (
          <button
            type="button"
            onClick={copy}
            className={cn(
              "text-xs px-2 py-1 rounded-md transition-colors",
              theme === "dark"
                ? "text-gray-400 hover:text-gray-100 hover:bg-gray-800"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            )}
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        )}
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className={cn(
                "group",
                theme === "dark" ? "hover:bg-gray-900/50" : "hover:bg-gray-100/50"
              )}>
                {showLineNumbers && (
                  <td className={cn(
                    "select-none text-right pr-4 pl-4 py-0 w-10 text-xs",
                    theme === "dark" ? "text-gray-600" : "text-gray-400"
                  )}>
                    {i + 1}
                  </td>
                )}
                <td className="px-4 py-0 whitespace-pre">
                  <span>{line || " "}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
