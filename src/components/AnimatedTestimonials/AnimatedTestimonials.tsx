"use client";
import { useState, useEffect, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  avatar?: string;
}

export interface AnimatedTestimonialsProps extends HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

export const AnimatedTestimonials = ({
  testimonials, autoPlay = true, interval = 4000, className, ...props
}: AnimatedTestimonialsProps) => {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setActive(idx); setAnimating(false); }, 300);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const t = setInterval(() => go((active + 1) % testimonials.length), interval);
    return () => clearInterval(t);
  }, [active, autoPlay, interval, testimonials.length]);

  const t = testimonials[active];

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)} {...props}>
      <div className={cn(
        "flex flex-col items-center text-center gap-6 p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm transition-opacity duration-300",
        animating && "opacity-0"
      )}>
        {t.avatar && (
          <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full object-cover ring-4 ring-brand-100 dark:ring-brand-900" />
        )}
        {!t.avatar && (
          <div className="w-16 h-16 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center text-xl font-bold text-brand-600 dark:text-brand-400">
            {t.name.charAt(0)}
          </div>
        )}
        <blockquote className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
          "{t.quote}"
        </blockquote>
        <div className="flex flex-col items-center gap-0.5">
          <p className="font-semibold text-gray-900 dark:text-gray-100">{t.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t.role}{t.company && `, ${t.company}`}
          </p>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={cn(
              "rounded-full transition-all duration-200",
              i === active
                ? "w-5 h-2 bg-brand-600 dark:bg-brand-400"
                : "w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
            )}
          />
        ))}
      </div>
    </div>
  );
};
