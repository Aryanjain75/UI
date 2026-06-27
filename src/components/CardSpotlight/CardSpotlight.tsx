"use client";
import { useRef, useState, MouseEvent, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface CardSpotlightProps extends HTMLAttributes<HTMLDivElement> {
  spotlightColor?: string;
  radius?: number;
}

export const CardSpotlight = ({
  spotlightColor = "rgba(120,119,198,0.25)", radius = 250, className, children, ...props
}: CardSpotlightProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPos({ x: -9999, y: -9999 }); }}
      className={cn(
        "relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden transition-shadow duration-300",
        hovered && "shadow-xl",
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 80%)`,
          opacity: hovered ? 1 : 0,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
