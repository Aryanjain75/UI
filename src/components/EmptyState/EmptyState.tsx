import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({ icon, title, description, action, className, ...props }: EmptyStateProps) => (
  <div className={cn("flex flex-col items-center justify-center text-center px-6 py-16 gap-4", className)} {...props}>
    {icon && (
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 text-3xl">
        {icon}
      </div>
    )}
    <div className="space-y-1.5 max-w-sm">
      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
    </div>
    {action && <div className="mt-2">{action}</div>}
  </div>
);
