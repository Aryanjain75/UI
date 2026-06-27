import { forwardRef, LabelHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = { sm: "text-xs", md: "text-sm", lg: "text-base" };

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, optional, size = "md", className, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "font-medium text-gray-700 dark:text-gray-300 inline-flex items-center gap-1",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-500" aria-hidden="true">*</span>}
      {optional && <span className="text-gray-400 font-normal text-xs">(optional)</span>}
    </label>
  )
);
Label.displayName = "Label";
