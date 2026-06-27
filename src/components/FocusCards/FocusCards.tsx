"use client";
import { useState, ReactNode, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface FocusCard { id: string; src: string; alt: string; title?: ReactNode; overlay?: ReactNode; }

export interface FocusCardsProps extends HTMLAttributes<HTMLDivElement> {
  cards: FocusCard[];
  columns?: 2 | 3 | 4;
}

const colMap: Record<number, string> = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-2 md:grid-cols-4" };

export const FocusCards = ({ cards, columns = 3, className, ...props }: FocusCardsProps) => {
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <div className={cn("grid gap-3", colMap[columns], className)} {...props}>
      {cards.map(card => (
        <div
          key={card.id}
          onMouseEnter={() => setFocused(card.id)}
          onMouseLeave={() => setFocused(null)}
          className={cn(
            "relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 aspect-square",
            focused && focused !== card.id && "opacity-50 scale-95 blur-[1px]",
            focused === card.id && "scale-105 shadow-2xl z-10"
          )}
        >
          <img src={card.src} alt={card.alt} className="w-full h-full object-cover" loading="lazy" />
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 transition-opacity duration-300",
            focused === card.id ? "opacity-100" : "opacity-0"
          )}>
            {card.title && <p className="text-white text-sm font-semibold">{card.title}</p>}
            {card.overlay}
          </div>
        </div>
      ))}
    </div>
  );
};
