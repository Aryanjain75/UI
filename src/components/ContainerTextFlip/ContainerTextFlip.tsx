"use client";
import { useState, useEffect, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface ContainerTextFlipProps extends HTMLAttributes<HTMLSpanElement> {
  words: string[];
  interval?: number;
  className?: string;
}

export const ContainerTextFlip = ({
  words, interval = 2500, className, ...props
}: ContainerTextFlipProps) => {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % words.length); setVisible(true); }, 300);
    }, interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-3 py-0.5 font-semibold transition-all duration-300",
        "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
        className
      )}
      {...props}
    >
      {words[idx]}
    </span>
  );
};
