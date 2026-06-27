import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface MovingBorderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  borderRadius?: string;
  borderWidth?: number;
  duration?: number;
  color?: string;
}

export const MovingBorder = ({
  children, borderRadius = "0.75rem", borderWidth = 2, duration = 3, color = "#3b82f6",
  className, style, ...props
}: MovingBorderProps) => (
  <div
    className={cn("relative p-px overflow-hidden", className)}
    style={{ borderRadius, ...style }}
    {...props}
  >
    {/* Animated border gradient */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        borderRadius,
        background: `conic-gradient(from var(--border-angle, 0deg), transparent 20%, ${color} 50%, transparent 80%)`,
        animation: `moving-border-spin ${duration}s linear infinite`,
        padding: borderWidth,
      }}
      aria-hidden="true"
    />
    {/* Mask to show only the border */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        borderRadius,
        background: "inherit",
        WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        padding: borderWidth,
      }}
      aria-hidden="true"
    />
    <style>{`
      @property --border-angle {
        syntax: '<angle>';
        inherits: false;
        initial-value: 0deg;
      }
      @keyframes moving-border-spin {
        to { --border-angle: 360deg; }
      }
    `}</style>
    <div className="relative z-10" style={{ borderRadius }}>{children}</div>
  </div>
);
