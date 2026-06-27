import { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface BackgroundBeamsProps extends HTMLAttributes<HTMLDivElement> {
  beamCount?: number;
  color?: string;
}

export const BackgroundBeams = ({
  beamCount = 6, color = "#3b82f6", className, children, ...props
}: BackgroundBeamsProps) => {
  const beams = Array.from({ length: beamCount }, (_, i) => i);
  return (
    <div className={cn("relative overflow-hidden bg-gray-950", className)} {...props}>
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        aria-hidden="true"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="bg-beam-glow" cx="50%" cy="0%" r="60%">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          {beams.map((i) => (
            <linearGradient key={i} id={`beam-${i}`} x1="50%" y1="0%" x2={`${20 + i * 15}%`} y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0" />
              <stop offset="40%" stopColor={color} stopOpacity="0.6" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-beam-glow)" />
        {beams.map((i) => (
          <line
            key={i}
            x1={500}
            y1={0}
            x2={100 + i * 160}
            y2={1000}
            stroke={`url(#beam-${i})`}
            strokeWidth={i % 2 === 0 ? 1 : 0.5}
            style={{
              animation: `beam-fade ${2 + i * 0.4}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </svg>
      <style>{`
        @keyframes beam-fade {
          0%   { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `}</style>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
