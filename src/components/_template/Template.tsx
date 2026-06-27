/**
 * TEMPLATE — Copy this folder to add a new component.
 *
 * Steps:
 *  1. Duplicate this folder  →  src/components/YourComponent/
 *  2. Rename the files       →  YourComponent.tsx, YourComponent.stories.tsx, index.ts
 *  3. Replace all "Template" with your component name
 *  4. Add export to          →  src/components/index.ts
 *  5. Run Storybook to verify  →  npm run storybook
 */

import { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

// ─── 1. Define your prop types ────────────────────────────────────────────────

export type TemplateVariant = "default"; // add more: | "primary" | "danger"

export interface TemplateProps extends HTMLAttributes<HTMLDivElement> {
  variant?: TemplateVariant;
  // add your props here
}

// ─── 2. Style maps (one entry per variant/size) ───────────────────────────────

const variantStyles: Record<TemplateVariant, string> = {
  default: "bg-white text-gray-900",
};

// ─── 3. The component ─────────────────────────────────────────────────────────

export const Template = ({
  variant   = "default",
  className,
  children,
  ...props
}: TemplateProps) => {
  return (
    <div
      className={cn(
        "rounded border p-4",   // base styles
        variantStyles[variant], // variant styles
        className               // always last — lets consumers override
      )}
      {...props}
    >
      {children}
    </div>
  );
};
