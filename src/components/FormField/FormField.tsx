import { HTMLAttributes, ReactNode, LabelHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  labelFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export const FormField = ({
  label, labelFor, hint, error, required, children, className, ...props
}: FormFieldProps) => (
  <div className={cn("flex flex-col gap-1.5", className)} {...props}>
    {label && (
      <label
        htmlFor={labelFor}
        className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1"
      >
        {label}
        {required && <span className="text-red-500" aria-hidden="true">*</span>}
      </label>
    )}
    {children}
    {hint && !error && <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
    {error && <p className="text-xs text-red-500" role="alert">{error}</p>}
  </div>
);
