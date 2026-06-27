"use client";
import { useRef, useState, MouseEvent, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface GlowCardProps extends HTMLAttributes<HTMLDivElement> {
  glowColor?: string;
  borderGlow?: boolean;
}

export const GlowCard = ({
  glowColor = "rgba(120,119,198,0.4)",
  borderGlow = true,
  className,
  children,
  style,
  ...props
}: GlowCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 transition-shadow duration-300",
        hovered && "shadow-xl",
        className
      )}
      style={{
        ...style,
        ...(borderGlow && hovered
          ? { borderColor: "transparent", backgroundImage: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, ${glowColor}, transparent 40%), linear-gradient(white, white)`, backgroundOrigin: "border-box", backgroundClip: "padding-box, border-box" }
          : {}),
      }}
      {...props}
    >
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{ background: `radial-gradient(250px circle at ${pos.x}px ${pos.y}px, ${glowColor.replace("0.4", "0.08")}, transparent 80%)` }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
};
