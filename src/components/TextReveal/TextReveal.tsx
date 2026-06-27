"use client";
import { useRef, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface TextRevealProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  /** 'mask' fades in word by word on scroll; 'typewriter' animates on mount */
  variant?: "mask" | "typewriter" | "blur";
}

export const TextReveal = ({ text, variant = "mask", className, ...props }: TextRevealProps) => {
  const words = text.split(" ");

  if (variant === "typewriter") {
    return (
      <span
        className={cn("inline-block overflow-hidden border-r-2 border-current whitespace-pre-wrap", className)}
        style={{ animation: `typing ${words.length * 0.3}s steps(${text.length}) forwards, blink 0.75s step-end infinite` }}
        {...props}
      >
        {text}
      </span>
    );
  }

  if (variant === "blur") {
    return (
      <div className={cn("flex flex-wrap gap-x-2", className)} aria-label={text} {...props}>
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block animate-in fade-in blur-in duration-700 fill-mode-both"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {word}
          </span>
        ))}
      </div>
    );
  }

  // mask (default) — uses IntersectionObserver via CSS
  return (
    <div className={cn("flex flex-wrap gap-x-2", className)} aria-label={text} {...props}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block opacity-20 animate-in fade-in duration-500 fill-mode-both"
          style={{ animationDelay: `${i * 60}ms`, animationTimingFunction: "ease" }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};
