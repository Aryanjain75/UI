"use client";
import { HTMLAttributes } from "react";
import type * as React from "react";
import { cn } from "../../utils/cn";

export interface AuroraBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  showRadialGradient?: boolean;
  colors?: string[];
  speed?: "slow" | "medium" | "fast";
}

const speedMap = { slow: "60s", medium: "30s", fast: "15s" };

export const AuroraBackground = ({
  showRadialGradient = true,
  colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"],
  speed = "medium",
  className,
  children,
  style,
  ...props
}: AuroraBackgroundProps) => {
  const [c1, c2, c3, c4] = colors;
  const dur = speedMap[speed];

  return (
    <div
      className={cn("relative overflow-hidden bg-gray-950", className)}
      style={{
        "--aurora-c1": c1,
        "--aurora-c2": c2,
        "--aurora-c3": c3,
        "--aurora-c4": c4,
        ...style,
      } as React.CSSProperties}
      {...props}
    >
      {/* Aurora blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: [
              `radial-gradient(ellipse 80% 60% at 20% 30%, ${c1}66, transparent)`,
              `radial-gradient(ellipse 60% 80% at 80% 20%, ${c2}55, transparent)`,
              `radial-gradient(ellipse 70% 50% at 50% 80%, ${c3}44, transparent)`,
              `radial-gradient(ellipse 50% 70% at 90% 70%, ${c4}44, transparent)`,
            ].join(", "),
            animation: `aurora-shift ${dur} ease-in-out infinite alternate`,
          }}
        />
        {showRadialGradient && (
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, transparent 40%, #030712 100%)" }}
          />
        )}
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes aurora-shift {
          0%   { transform: translate(0%, 0%) rotate(0deg) scale(1); }
          33%  { transform: translate(3%, -4%) rotate(3deg) scale(1.04); }
          66%  { transform: translate(-3%, 3%) rotate(-2deg) scale(0.97); }
          100% { transform: translate(2%, -2%) rotate(1deg) scale(1.02); }
        }
      `}</style>

      <div className="relative z-10">{children}</div>
    </div>
  );
};
