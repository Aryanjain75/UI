"use client";
import { useRef, useState, MouseEvent, HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface ThreeDCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  rotateIntensity?: number;
  glareOpacity?: number;
  scale?: number;
}

export const ThreeDCard = ({
  children, rotateIntensity = 20, glareOpacity = 0.15, scale = 1.04,
  className, style, ...props
}: ThreeDCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0) rotateY(0) scale(1)");
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotX = (y - 0.5) * -rotateIntensity;
    const rotY = (x - 0.5) * rotateIntensity;
    setTransform(`perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`);
    setGlarePos({ x: x * 100, y: y * 100 });
  };

  const onLeave = () => {
    setTransform("perspective(1000px) rotateX(0) rotateY(0) scale(1)");
    setHovered(false);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      className={cn("relative cursor-pointer", className)}
      style={{ transform, transition: hovered ? "none" : "transform 0.5s ease", transformStyle: "preserve-3d", ...style }}
      {...props}
    >
      {children}
      {/* Glare */}
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glareOpacity}), transparent 60%)`,
            transform: "translateZ(1px)",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export const ThreeDCardBody = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("relative h-full w-full", className)} style={{ transformStyle: "preserve-3d" }} {...props} />
);

export const ThreeDCardItem = ({ className, style, translateZ = 20, ...props }: HTMLAttributes<HTMLDivElement> & { translateZ?: number }) => (
  <div className={cn("w-fit", className)} style={{ transform: `translateZ(${translateZ}px)`, ...style }} {...props} />
);
