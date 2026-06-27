"use client";
import { useRef, useState, KeyboardEvent, ClipboardEvent } from "react";
import { cn } from "../../utils/cn";

export interface InputOTPProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  size?: "sm" | "md" | "lg";
  separator?: boolean;
  separatorAt?: number[];
  className?: string;
}

const sizeStyles: Record<string, string> = { sm: "w-8 h-10 text-sm", md: "w-10 h-12 text-base", lg: "w-12 h-14 text-lg" };

export const InputOTP = ({
  length = 6, value = "", onChange, disabled, error, size = "md", separator = true, separatorAt, className,
}: InputOTPProps) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const chars = value.split("").slice(0, length);
  while (chars.length < length) chars.push("");

  const update = (idx: number, char: string) => {
    const next = [...chars];
    next[idx] = char.slice(-1);
    onChange?.(next.join(""));
    if (char && idx < length - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace") {
      if (!chars[idx] && idx > 0) { const next = [...chars]; next[idx - 1] = ""; onChange?.(next.join("")); inputsRef.current[idx - 1]?.focus(); }
      else { const next = [...chars]; next[idx] = ""; onChange?.(next.join("")); }
    }
    if (e.key === "ArrowLeft" && idx > 0) inputsRef.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < length - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>, startIdx: number) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length - startIdx);
    const next = [...chars];
    pasted.split("").forEach((c, i) => { if (startIdx + i < length) next[startIdx + i] = c; });
    onChange?.(next.join(""));
    const focusIdx = Math.min(startIdx + pasted.length, length - 1);
    inputsRef.current[focusIdx]?.focus();
  };

  const defaultSeps = separatorAt ?? (length === 6 ? [2] : length === 8 ? [3] : []);

  return (
    <div className={cn("flex items-center gap-2", className)} aria-label="OTP Input">
      {chars.map((char, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            ref={el => { inputsRef.current[i] = el; }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={char}
            disabled={disabled}
            onChange={e => update(i, e.target.value)}
            onKeyDown={e => handleKeyDown(e, i)}
            onPaste={e => handlePaste(e, i)}
            onFocus={e => e.target.select()}
            className={cn(
              "text-center font-mono font-semibold rounded-lg border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
              "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              char ? "border-brand-500 dark:border-brand-500" : "border-gray-300 dark:border-gray-600",
              error && "border-red-500 focus:ring-red-500",
              sizeStyles[size]
            )}
          />
          {separator && defaultSeps.includes(i + 1) && i < length - 1 && (
            <span className="text-gray-400 font-bold select-none">–</span>
          )}
        </div>
      ))}
    </div>
  );
};
