"use client";
import { useRef, useState, DragEvent, ChangeEvent, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface FileUploadProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  onChange?: (files: File[]) => void;
  disabled?: boolean;
  label?: string;
  hint?: string;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const FileUpload = ({
  accept, multiple = false, maxSizeMB, onChange, disabled,
  label = "Click to upload or drag & drop",
  hint,
  className, ...props
}: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");

  const process = (incoming: FileList | null) => {
    if (!incoming) return;
    const arr = Array.from(incoming);
    if (maxSizeMB) {
      const oversized = arr.find(f => f.size > maxSizeMB * 1024 * 1024);
      if (oversized) { setError(`"${oversized.name}" exceeds ${maxSizeMB} MB`); return; }
    }
    setError("");
    setFiles(arr);
    onChange?.(arr);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setDragging(false);
    if (!disabled) process(e.dataTransfer.files);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); if (!disabled) setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-10 text-center cursor-pointer transition-colors",
          dragging ? "border-brand-500 bg-brand-50 dark:bg-brand-950" : "border-gray-300 dark:border-gray-600 hover:border-brand-400 bg-white dark:bg-gray-900",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
        {hint && <p className="text-xs text-gray-400">{hint}</p>}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          onChange={(e: ChangeEvent<HTMLInputElement>) => process(e.target.files)}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {files.length > 0 && (
        <ul className="space-y-1">
          {files.map((f, i) => (
            <li key={i} className="flex items-center justify-between rounded-md bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm">
              <span className="truncate text-gray-700 dark:text-gray-300">{f.name}</span>
              <span className="ml-3 shrink-0 text-gray-400 text-xs">{formatBytes(f.size)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
