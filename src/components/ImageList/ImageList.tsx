import { HTMLAttributes, ImgHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type ImageListVariant = "standard" | "masonry" | "quilted";

export interface ImageListItem {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  cols?: number;
  rows?: number;
}

export interface ImageListProps extends HTMLAttributes<HTMLUListElement> {
  items: ImageListItem[];
  cols?: number;
  gap?: number;
  variant?: ImageListVariant;
  rowHeight?: number;
}

export const ImageList = ({
  items, cols = 3, gap = 8, variant = "standard", rowHeight = 200, className, ...props
}: ImageListProps) => (
  <ul
    className={cn(
      variant === "masonry" ? "columns-" + cols : "grid",
      variant !== "masonry" && `grid-cols-${cols}`,
      className
    )}
    style={{ gap: `${gap}px`, columnGap: variant === "masonry" ? `${gap}px` : undefined }}
    {...props}
  >
    {items.map((item, i) => (
      <li
        key={i}
        className={cn("relative overflow-hidden rounded-lg group", variant === "masonry" && "break-inside-avoid mb-2")}
        style={variant !== "masonry" ? {
          gridColumn: item.cols ? `span ${item.cols}` : undefined,
          gridRow:    item.rows ? `span ${item.rows}` : undefined,
        } : undefined}
      >
        <img
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={variant !== "masonry" ? { height: `${rowHeight * (item.rows ?? 1) + (item.rows ? (item.rows - 1) * gap : 0)}px` } : undefined}
          loading="lazy"
        />
        {(item.title || item.subtitle) && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            {item.title && <p className="text-sm font-semibold">{item.title}</p>}
            {item.subtitle && <p className="text-xs opacity-80">{item.subtitle}</p>}
          </div>
        )}
      </li>
    ))}
  </ul>
);
