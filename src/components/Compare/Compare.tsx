"use client";
import { useRef, useState, MouseEvent, TouchEvent, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface CompareProps extends HTMLAttributes<HTMLDivElement> {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
}

export const Compare = ({
  beforeSrc, afterSrc, beforeLabel = "Before", afterLabel = "After",
  initialPosition = 50, className, ...props
}: CompareProps) => {
  const [position, setPosition] = useState(initialPosition);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = (clientX: number) => {
    const rect = containerRef.current!.getBoundingClientRect();
    const pct  = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  };

  const onMouseMove = (e: MouseEvent) => { if (e.buttons === 1) updatePosition(e.clientX); };
  const onTouchMove = (e: TouchEvent)  => updatePosition(e.touches[0].clientX);

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      className={cn("relative overflow-hidden rounded-xl select-none cursor-ew-resize", className)}
      {...props}
    >
      {/* After (base layer) */}
      <img src={afterSrc} alt={afterLabel} className="w-full h-full object-cover" draggable={false} />

      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={beforeSrc} alt={beforeLabel} className="w-full h-full object-cover" draggable={false} />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.3)] flex items-center justify-center"
        style={{ left: `${position}%` }}
      >
        <div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3M16 9l4 3-4 3"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 text-xs font-semibold bg-black/50 text-white px-2 py-0.5 rounded-full">{beforeLabel}</span>
      <span className="absolute top-3 right-3 text-xs font-semibold bg-black/50 text-white px-2 py-0.5 rounded-full">{afterLabel}</span>
    </div>
  );
};
