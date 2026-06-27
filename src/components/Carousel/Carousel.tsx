"use client";
import { useState, useRef, ReactNode, HTMLAttributes, TouchEvent } from "react";
import { cn } from "../../utils/cn";

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  items: ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  loop?: boolean;
}

export const Carousel = ({
  items, autoPlay = false, interval = 4000, showDots = true, showArrows = true, loop = true, className, ...props
}: CarouselProps) => {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef<number>(0);
  const total = items.length;

  const prev = () => setCurrent(c => loop ? (c - 1 + total) % total : Math.max(0, c - 1));
  const next = () => setCurrent(c => loop ? (c + 1) % total : Math.min(total - 1, c + 1));

  const onTouchStart = (e: TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  return (
    <div className={cn("relative overflow-hidden rounded-xl", className)} {...props}>
      {/* Track */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {items.map((item, i) => (
          <div key={i} className="min-w-full" aria-hidden={i !== current}>{item}</div>
        ))}
      </div>

      {/* Arrows */}
      {showArrows && total > 1 && (
        <>
          <button
            type="button" onClick={prev} aria-label="Previous slide"
            disabled={!loop && current === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/80 dark:bg-gray-900/80 shadow-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-900 transition-all disabled:opacity-30"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button
            type="button" onClick={next} aria-label="Next slide"
            disabled={!loop && current === total - 1}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/80 dark:bg-gray-900/80 shadow-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-900 transition-all disabled:opacity-30"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && total > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {items.map((_, i) => (
            <button
              key={i} type="button" onClick={() => setCurrent(i)} aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "rounded-full transition-all duration-200",
                i === current ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/75"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};
