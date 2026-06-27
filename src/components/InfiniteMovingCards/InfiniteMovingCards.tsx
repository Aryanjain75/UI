import type * as React from "react";
import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface InfiniteMovingCardsProps extends HTMLAttributes<HTMLDivElement> {
  items: ReactNode[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  gap?: number;
}

const speedMap = { fast: "15s", normal: "30s", slow: "50s" };

export const InfiniteMovingCards = ({
  items, direction = "left", speed = "normal", pauseOnHover = true, gap = 16, className, ...props
}: InfiniteMovingCardsProps) => (
  <div
    className={cn(
      "overflow-hidden relative",
      "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
      className
    )}
    {...props}
  >
    <div
      className={cn(
        "flex w-max",
        direction === "right" ? "animate-[scroll-right_var(--scroll-speed)_linear_infinite]" : "animate-[scroll-left_var(--scroll-speed)_linear_infinite]",
        pauseOnHover && "hover:[animation-play-state:paused]"
      )}
      style={{ "--scroll-speed": speedMap[speed], gap: `${gap}px` } as React.CSSProperties}
    >
      {/* Duplicate for infinite loop */}
      {[...items, ...items, ...items].map((item, i) => (
        <div key={i} className="shrink-0">{item}</div>
      ))}
    </div>
    <style>{`
      @keyframes scroll-left  { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
      @keyframes scroll-right { 0% { transform: translateX(-33.333%); } 100% { transform: translateX(0); } }
    `}</style>
  </div>
);
