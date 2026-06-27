"use client";
import { useState, useEffect, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface TypewriterEffectProps extends HTMLAttributes<HTMLSpanElement> {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  cursorChar?: string;
  loop?: boolean;
}

export const TypewriterEffect = ({
  words, typingSpeed = 80, deletingSpeed = 40, pauseDuration = 1500, cursorChar = "|", loop = true,
  className, ...props
}: TypewriterEffectProps) => {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx]   = useState(0);
  const [phase, setPhase]       = useState<"typing" | "pausing" | "deleting">("typing");
  const [charIdx, setCharIdx]   = useState(0);

  useEffect(() => {
    const target = words[wordIdx] ?? "";

    if (phase === "typing") {
      if (charIdx < target.length) {
        const t = setTimeout(() => { setDisplayed(target.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }, typingSpeed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("pausing"), pauseDuration);
        return () => clearTimeout(t);
      }
    }

    if (phase === "pausing") {
      if (!loop && wordIdx === words.length - 1) return;
      setPhase("deleting");
    }

    if (phase === "deleting") {
      if (charIdx > 0) {
        const t = setTimeout(() => { setDisplayed(target.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, deletingSpeed);
        return () => clearTimeout(t);
      } else {
        setWordIdx(i => (i + 1) % words.length);
        setPhase("typing");
      }
    }
  }, [phase, charIdx, wordIdx, words, typingSpeed, deletingSpeed, pauseDuration, loop]);

  return (
    <span className={cn("inline-flex items-center", className)} {...props}>
      <span>{displayed}</span>
      <span className="ml-0.5 animate-[blink_0.75s_step-end_infinite]">{cursorChar}</span>
    </span>
  );
};
