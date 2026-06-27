"use client";
import { useEffect, useState, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface SparkleItem { id: number; x: number; y: number; size: number; delay: number; color: string; }

export interface SparklesProps extends HTMLAttributes<HTMLSpanElement> {
  count?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
}

function random(min: number, max: number) { return Math.random() * (max - min) + min; }

export const Sparkles = ({
  count = 8, colors = ["#FFD700", "#FFA500", "#FF69B4", "#00CED1", "#9370DB"],
  minSize = 6, maxSize = 14, className, children, ...props
}: SparklesProps) => {
  const [sparkles, setSparkles] = useState<SparkleItem[]>([]);

  useEffect(() => {
    const generate = () =>
      Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        x: random(0, 100),
        y: random(0, 100),
        size: random(minSize, maxSize),
        delay: random(0, 1.5),
        color: colors[Math.floor(random(0, colors.length))],
      }));
    setSparkles(generate());
    const t = setInterval(() => setSparkles(generate()), 2000);
    return () => clearInterval(t);
  }, [count, colors, minSize, maxSize]);

  return (
    <span className={cn("relative inline-block", className)} {...props}>
      {sparkles.map(s => (
        <svg
          key={s.id}
          className="absolute pointer-events-none"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size,
            animation: `sparkle-pop 1.5s ease-in-out ${s.delay}s forwards`,
            transform: "translate(-50%,-50%)",
          }}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M12 2L13.5 9.5L21 12L13.5 14.5L12 22L10.5 14.5L3 12L10.5 9.5L12 2Z"
            fill={s.color}
          />
        </svg>
      ))}
      <style>{`
        @keyframes sparkle-pop {
          0%   { opacity: 0; transform: translate(-50%,-50%) scale(0) rotate(0deg); }
          50%  { opacity: 1; transform: translate(-50%,-50%) scale(1) rotate(90deg); }
          100% { opacity: 0; transform: translate(-50%,-50%) scale(0.5) rotate(180deg); }
        }
      `}</style>
      <span className="relative z-10">{children}</span>
    </span>
  );
};
