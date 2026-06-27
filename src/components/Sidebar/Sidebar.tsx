import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type SidebarVariant = "default" | "floating" | "inset";

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  width?: number;
  collapsed?: boolean;
  collapsedWidth?: number;
  variant?: SidebarVariant;
  side?: "left" | "right";
}
export interface SidebarGroupProps extends HTMLAttributes<HTMLDivElement> { label?: string; }
export interface SidebarItemProps extends HTMLAttributes<HTMLAnchorElement> {
  icon?: ReactNode; label: string; active?: boolean; badge?: ReactNode; href?: string; collapsed?: boolean;
}

export const Sidebar = ({
  width = 240, collapsed = false, collapsedWidth = 64, variant = "default", side = "left", className, children, ...props
}: SidebarProps) => (
  <aside
    className={cn(
      "flex flex-col h-full overflow-hidden transition-[width] duration-300 ease-in-out shrink-0",
      "bg-white dark:bg-gray-900",
      variant === "default" && "border-r border-gray-200 dark:border-gray-700",
      variant === "floating" && "m-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md",
      variant === "inset"    && "border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800",
      side === "right" && "border-l border-r-0",
      className
    )}
    style={{ width: collapsed ? collapsedWidth : width }}
    {...props}
  >
    {children}
  </aside>
);

export const SidebarHeader = ({ className, children, ...p }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center gap-2 px-3 h-14 border-b border-gray-100 dark:border-gray-800 shrink-0", className)} {...p}>{children}</div>
);
export const SidebarContent = ({ className, children, ...p }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex-1 overflow-y-auto py-2", className)} {...p}>{children}</div>
);
export const SidebarFooter = ({ className, children, ...p }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-3 py-3 border-t border-gray-100 dark:border-gray-800 shrink-0", className)} {...p}>{children}</div>
);
export const SidebarGroup = ({ label, className, children, ...p }: SidebarGroupProps) => (
  <div className={cn("mb-2", className)} {...p}>
    {label && <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">{label}</p>}
    {children}
  </div>
);
export const SidebarItem = ({ icon, label, active, badge, href = "#", collapsed, className, ...p }: SidebarItemProps) => (
  <a
    href={href}
    aria-current={active ? "page" : undefined}
    className={cn(
      "flex items-center gap-3 px-3 py-2 mx-1 rounded-lg text-sm font-medium transition-colors",
      active ? "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
      className
    )}
    title={collapsed ? label : undefined}
    {...(p as any)}
  >
    {icon && <span className="w-4 h-4 shrink-0">{icon}</span>}
    {!collapsed && <span className="flex-1 truncate">{label}</span>}
    {!collapsed && badge && <span className="ml-auto">{badge}</span>}
  </a>
);
export const SidebarSeparator = ({ className, ...p }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("my-1 mx-3 h-px bg-gray-100 dark:bg-gray-800", className)} {...p} />
);
