import { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface LampEffectProps extends HTMLAttributes<HTMLDivElement> {
  color?: string;
  intensity?: number;
}

export const LampEffect = ({
  color = "#3b82f6", intensity = 0.6, className, children, ...props
}: LampEffectProps) => (
  <div className={cn("relative overflow-hidden bg-gray-950 flex flex-col items-center", className)} {...props}>
    {/* Lamp cone */}
    <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl">
      {/* Beam */}
      <div
        className="mx-auto w-px"
        style={{
          height: "120px",
          background: `linear-gradient(to bottom, ${color}, transparent)`,
          opacity: intensity,
        }}
      />
      {/* Glow spread */}
      <div
        className="mx-auto rounded-[50%]"
        style={{
          width: "600px",
          height: "200px",
          background: `radial-gradient(ellipse at top, ${color}${Math.round(intensity * 60).toString(16).padStart(2, "0")}, transparent 70%)`,
          marginTop: "-100px",
        }}
      />
      {/* Conic flare */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "300px",
          background: `conic-gradient(from 265deg at 50% 0%, transparent 20%, ${color}30 35%, ${color}60 50%, ${color}30 65%, transparent 80%)`,
          opacity: intensity,
        }}
      />
    </div>
    <div className="relative z-10 mt-40 w-full">{children}</div>
  </div>
);
