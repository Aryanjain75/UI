import { cn } from "./cn";

export const DocsBadge = ({ status }: { status: "stable" | "beta" | "new" }) => {
  const map = {
    stable: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
    beta:   "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
    new:    "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-400",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide", map[status])}>
      {status}
    </span>
  );
};
