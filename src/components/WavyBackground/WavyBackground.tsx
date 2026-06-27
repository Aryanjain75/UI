import { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface WavyBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  speed?: "slow" | "fast";
  waveOpacity?: number;
  blur?: number;
}

export const WavyBackground = ({
  colors = ["#3b82f6", "#8b5cf6", "#06b6d4"],
  speed = "slow",
  waveOpacity = 0.5,
  blur = 10,
  className,
  children,
  ...props
}: WavyBackgroundProps) => {
  const dur = speed === "slow" ? "10s" : "5s";
  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ filter: `blur(${blur}px)` }}
      >
        {colors.map((c, i) => (
          <path
            key={i}
            fill={c}
            fillOpacity={waveOpacity}
            style={{ animation: `wavy-path ${parseFloat(dur) + i * 2}s ease-in-out infinite alternate` }}
            d={`M0,${160 + i * 20} C360,${80 + i * 30} 720,${220 + i * 20} 1080,${160 + i * 10} L1440,${140 + i * 20} L1440,320 L0,320 Z`}
          />
        ))}
      </svg>
      <style>{`
        @keyframes wavy-path {
          0%   { d: path("M0,160 C360,80 720,220 1080,160 L1440,140 L1440,320 L0,320 Z"); }
          100% { d: path("M0,200 C360,120 720,260 1080,200 L1440,180 L1440,320 L0,320 Z"); }
        }
      `}</style>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
