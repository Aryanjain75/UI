"use client";
import { useRef, useState, MouseEvent, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface SpotlightProps extends HTMLAttributes<HTMLDivElement> {
  color?: string;
  size?: number;
}

export const Spotlight = ({
  color = "rgba(120,119,198,0.15)",
  size = 400,
  className,
  children,
  ...props
}: SpotlightProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: -9999, y: -9999 })}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 80%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
};
