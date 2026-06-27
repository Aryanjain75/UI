import { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1|2|3|4|5|6|7|8|9|10|11|12;
  smCols?: 1|2|3|4|5|6;
  mdCols?: 1|2|3|4|5|6;
  lgCols?: 1|2|3|4|5|6;
  gap?: number;
  item?: boolean;
  span?: 1|2|3|4|5|6|7|8|9|10|11|12|"full";
}

const colsMap: Record<number, string> = {
  1:"grid-cols-1",2:"grid-cols-2",3:"grid-cols-3",4:"grid-cols-4",5:"grid-cols-5",6:"grid-cols-6",
  7:"grid-cols-7",8:"grid-cols-8",9:"grid-cols-9",10:"grid-cols-10",11:"grid-cols-11",12:"grid-cols-12",
};
const spanMap: Record<string|number, string> = {
  1:"col-span-1",2:"col-span-2",3:"col-span-3",4:"col-span-4",5:"col-span-5",6:"col-span-6",
  7:"col-span-7",8:"col-span-8",9:"col-span-9",10:"col-span-10",11:"col-span-11",12:"col-span-12",full:"col-span-full",
};

export const Grid = ({
  cols = 12, smCols, mdCols, lgCols, gap = 4, item = false, span, className, ...props
}: GridProps) => (
  <div
    className={cn(
      !item && "grid",
      !item && colsMap[cols],
      smCols && `sm:${colsMap[smCols]}`,
      mdCols && `md:${colsMap[mdCols]}`,
      lgCols && `lg:${colsMap[lgCols]}`,
      span && spanMap[span],
      className
    )}
    style={!item ? { gap: `${gap * 4}px` } : undefined}
    {...props}
  />
);
