import type * as React from "react";
import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  pauseOnHover?: boolean;
  gap?: number;
  repeat?: number;
}

export const Marquee = ({
  children,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  gap = 16,
  repeat = 4,
  className,
  style,
  ...props
}: MarqueeProps) => {
  const isHorizontal = direction === "left" || direction === "right";
  const reverse = direction === "right" || direction === "down";

  return (
    <div
      className={cn("overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]", !isHorizontal && "[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]", className)}
      style={{ "--marquee-gap": `${gap}px`, "--marquee-speed": `${speed}s`, ...style } as React.CSSProperties}
      {...props}
    >
      <div
        className={cn(
          "flex",
          isHorizontal ? "flex-row w-max" : "flex-col h-max",
          reverse ? "animate-[marquee-reverse_var(--marquee-speed)_linear_infinite]" : "animate-[marquee_var(--marquee-speed)_linear_infinite]",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{ gap: `${gap}px` }}
      >
        {Array.from({ length: repeat }, (_, i) => (
          <div key={i} className={cn("flex", isHorizontal ? "flex-row" : "flex-col")} style={{ gap: `${gap}px` }}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};
