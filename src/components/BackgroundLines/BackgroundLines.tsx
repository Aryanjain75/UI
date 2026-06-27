import { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface BackgroundLinesProps extends HTMLAttributes<HTMLDivElement> {
  lineColor?: string;
  lineCount?: number;
  orientation?: "horizontal" | "vertical" | "diagonal";
  animated?: boolean;
}

export const BackgroundLines = ({
  lineColor = "rgba(148,163,184,0.15)", lineCount = 8, orientation = "diagonal", animated = true,
  className, children, ...props
}: BackgroundLinesProps) => {
  const lines = Array.from({ length: lineCount }, (_, i) => i);

  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        {lines.map((i) => {
          const gap = 100 / lineCount;
          const offset = i * gap;
          let x1, y1, x2, y2;
          if (orientation === "horizontal") { x1 = "0%"; y1 = `${offset}%`; x2 = "100%"; y2 = `${offset}%`; }
          else if (orientation === "vertical") { x1 = `${offset}%`; y1 = "0%"; x2 = `${offset}%`; y2 = "100%"; }
          else { x1 = `${offset - 30}%`; y1 = "0%"; x2 = `${offset + 70}%`; y2 = "100%"; }

          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={lineColor}
              strokeWidth={i % 3 === 0 ? 1.5 : 0.8}
              style={animated ? {
                animation: `line-wave ${3 + i * 0.2}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.15}s`,
              } : undefined}
            />
          );
        })}
      </svg>
      <style>{`
        @keyframes line-wave {
          0%   { stroke-dashoffset: 0; stroke-opacity: 0.4; }
          100% { stroke-dashoffset: 20; stroke-opacity: 1; }
        }
      `}</style>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
