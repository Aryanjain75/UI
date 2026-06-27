import { HTMLAttributes, Children, cloneElement, ReactElement, isValidElement } from "react";
import { cn } from "../../utils/cn";

export type ButtonGroupOrientation = "horizontal" | "vertical";
export type ButtonGroupVariant = "outlined" | "contained" | "soft";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: ButtonGroupOrientation;
  variant?: ButtonGroupVariant;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
}

export const ButtonGroup = ({
  orientation = "horizontal",
  variant = "outlined",
  size = "md",
  fullWidth = false,
  disabled = false,
  className,
  children,
  ...props
}: ButtonGroupProps) => {
  const isVertical = orientation === "vertical";

  return (
    <div
      role="group"
      className={cn(
        "inline-flex",
        isVertical ? "flex-col" : "flex-row",
        fullWidth && "w-full",
        "rounded-lg overflow-hidden",
        variant === "outlined" && "border border-gray-300 dark:border-gray-600 divide-gray-300 dark:divide-gray-600",
        isVertical
          ? "divide-y divide-gray-300 dark:divide-gray-600"
          : "divide-x divide-gray-300 dark:divide-gray-600",
        className
      )}
      {...props}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;
        return cloneElement(child as ReactElement<any>, {
          disabled: disabled || (child.props as any).disabled,
          size: (child.props as any).size ?? size,
          className: cn(
            "rounded-none focus-visible:z-10",
            fullWidth && "flex-1",
            variant === "outlined" && "border-0",
            (child.props as any).className
          ),
        });
      })}
    </div>
  );
};
