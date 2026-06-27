"use client";
import { useState, ReactNode, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface ExpandableCard {
  id: string;
  title: string;
  subtitle?: string;
  thumbnail?: string;
  content: ReactNode;
  tags?: string[];
}

export interface ExpandableCardsProps extends HTMLAttributes<HTMLDivElement> {
  cards: ExpandableCard[];
  columns?: 2 | 3 | 4;
}

const colsMap: Record<number, string> = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" };

export const ExpandableCards = ({ cards, columns = 3, className, ...props }: ExpandableCardsProps) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className={cn("grid gap-4 grid-cols-1", colsMap[columns], className)} {...props}>
      {cards.map(card => {
        const isExpanded = expanded === card.id;
        return (
          <div
            key={card.id}
            onClick={() => setExpanded(isExpanded ? null : card.id)}
            className={cn(
              "cursor-pointer rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden",
              "transition-all duration-300 hover:shadow-lg",
              isExpanded && "shadow-xl ring-2 ring-brand-500/30"
            )}
          >
            {card.thumbnail && (
              <div className={cn("overflow-hidden", isExpanded ? "h-48" : "h-32")}>
                <img
                  src={card.thumbnail} alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{card.title}</h3>
                  {card.subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{card.subtitle}</p>}
                </div>
                <svg
                  className={cn("w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200", isExpanded && "rotate-180")}
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
              {card.tags && card.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {card.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">{tag}</span>
                  ))}
                </div>
              )}
              <div className={cn("overflow-hidden transition-all duration-300", isExpanded ? "max-h-96 mt-4 opacity-100" : "max-h-0 opacity-0")}>
                <div className="text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-3">
                  {card.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
