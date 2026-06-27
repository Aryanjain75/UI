"use client";
import { useRef, useState, useEffect, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface TracingBeamProps extends HTMLAttributes<HTMLDivElement> {
  color?: string;
}

export const TracingBeam = ({
  color = "#3b82f6", className, children, ...props
}: TracingBeamProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<SVGLineElement>(null);
  const dotRef  = useRef<SVGCircleElement>(null);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct  = Math.min(1, Math.max(0, (window.innerHeight * 0.5 - rect.top) / rect.height));
      setScrollPct(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lineH = 600;
  const y2 = scrollPct * lineH;

  return (
    <div ref={containerRef} className={cn("relative ml-6 md:ml-14", className)} {...props}>
      {/* SVG beam track */}
      <div className="absolute -left-4 md:-left-10 top-0 bottom-0 w-px" aria-hidden="true">
        <svg className="absolute top-0 left-0 w-8 overflow-visible" height={lineH}>
          <defs>
            <linearGradient id="beam-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0" />
              <stop offset="20%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {/* Track */}
          <line x1={4} y1={0} x2={4} y2={lineH} stroke="#e5e7eb" strokeWidth={1.5} />
          {/* Beam */}
          <line ref={beamRef} x1={4} y1={0} x2={4} y2={y2} stroke={`url(#beam-grad)`} strokeWidth={2} strokeLinecap="round" />
          {/* Dot */}
          <circle ref={dotRef} cx={4} cy={y2} r={5} fill={color} className="transition-all duration-100" />
          <circle cx={4} cy={y2} r={9} fill="none" stroke={color} strokeOpacity="0.3" strokeWidth={2} className="transition-all duration-100" />
        </svg>
      </div>
      {children}
    </div>
  );
};
