import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type StepStatus = "complete" | "current" | "upcoming" | "error";
export interface Step { id: string; label: string; description?: string; status?: StepStatus; icon?: ReactNode; }
export interface StepperProps extends HTMLAttributes<HTMLOListElement> {
  steps: Step[];
  orientation?: "horizontal" | "vertical";
}

const statusStyles: Record<StepStatus, { dot: string; label: string }> = {
  complete: { dot: "bg-brand-600 border-brand-600 text-white", label: "text-gray-900 dark:text-gray-100" },
  current:  { dot: "bg-white border-brand-600 text-brand-600 ring-4 ring-brand-100 dark:ring-brand-900", label: "text-brand-600 dark:text-brand-400 font-semibold" },
  upcoming: { dot: "bg-white border-gray-300 dark:border-gray-600 text-gray-400", label: "text-gray-400 dark:text-gray-500" },
  error:    { dot: "bg-red-600 border-red-600 text-white", label: "text-red-600 dark:text-red-400" },
};

export const Stepper = ({ steps, orientation = "horizontal", className, ...props }: StepperProps) => {
  if (orientation === "vertical") {
    return (
      <ol className={cn("flex flex-col gap-0", className)} {...props}>
        {steps.map((step, i) => {
          const status = step.status ?? "upcoming";
          const s = statusStyles[status];
          return (
            <li key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
              {i < steps.length - 1 && <span className="absolute left-[18px] top-10 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />}
              <div className={cn("relative z-10 flex items-center justify-center shrink-0 w-9 h-9 rounded-full border-2 text-sm font-bold transition-all", s.dot)}>
                {status === "complete" ? "✓" : status === "error" ? "✕" : step.icon ?? i + 1}
              </div>
              <div className="pt-1.5">
                <p className={cn("text-sm font-medium", s.label)}>{step.label}</p>
                {step.description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{step.description}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }
  return (
    <ol className={cn("flex items-center w-full", className)} {...props}>
      {steps.map((step, i) => {
        const status = step.status ?? "upcoming";
        const s = statusStyles[status];
        return (
          <li key={step.id} className={cn("flex items-center", i < steps.length - 1 && "flex-1")}>
            <div className="flex flex-col items-center gap-1.5">
              <div className={cn("flex items-center justify-center w-9 h-9 rounded-full border-2 text-sm font-bold transition-all", s.dot)}>
                {status === "complete" ? "✓" : status === "error" ? "✕" : step.icon ?? i + 1}
              </div>
              <span className={cn("text-xs font-medium whitespace-nowrap", s.label)}>{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn("flex-1 h-0.5 mx-2 mb-5 transition-colors", status === "complete" ? "bg-brand-600" : "bg-gray-200 dark:bg-gray-700")} />
            )}
          </li>
        );
      })}
    </ol>
  );
};
