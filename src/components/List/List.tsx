import { HTMLAttributes, ReactNode, LiHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  icon?: ReactNode;
  secondaryAction?: ReactNode;
  divider?: boolean;
  selected?: boolean;
  disabled?: boolean;
  dense?: boolean;
}

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  dense?: boolean;
  bordered?: boolean;
}

export const ListItem = ({
  icon, secondaryAction, divider = false, selected = false, disabled = false, dense = false, className, children, ...props
}: ListItemProps) => (
  <li
    className={cn(
      "flex items-center gap-3 px-4 transition-colors",
      dense ? "py-1.5" : "py-3",
      divider && "border-b border-gray-100 dark:border-gray-800",
      selected && "bg-brand-50 dark:bg-brand-950",
      disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer",
      className
    )}
    aria-selected={selected}
    aria-disabled={disabled}
    {...props}
  >
    {icon && <span className="shrink-0 text-gray-500 dark:text-gray-400">{icon}</span>}
    <div className="flex-1 min-w-0">{children}</div>
    {secondaryAction && <div className="shrink-0 ml-auto">{secondaryAction}</div>}
  </li>
);

export const List = ({ dense = false, bordered = false, className, children, ...props }: ListProps) => (
  <ul
    className={cn(
      "rounded-lg overflow-hidden",
      bordered && "border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-800",
      className
    )}
    {...props}
  >
    {children}
  </ul>
);
