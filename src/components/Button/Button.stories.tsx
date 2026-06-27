import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import {
  Search, Download, Trash2, Plus, ArrowRight,
  Star, Check, Lock, Bell, CreditCard, ChevronDown,
} from "lucide-react";
import { Button, ButtonGroup } from "./Button";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A fully accessible, polymorphic button with ripple effects, loading states, " +
          "icon support, five sizes, and nine visual variants — all designed for light and dark mode. " +
          "Use the `label` prop for button text.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Button text content (accepts a string or ReactNode)",
    },
    variant: {
      control: "select",
      options: [
        "primary", "secondary", "ghost", "outline",
        "danger", "danger-solid", "success", "success-subtle", "link",
      ],
      description: "Visual style of the button",
      table: { defaultValue: { summary: "primary" } },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Height and padding tier",
      table: { defaultValue: { summary: "md" } },
    },
    shape: {
      control: "select",
      options: ["default", "pill", "icon"],
      description: "Shape modifier. 'icon' hides the label and makes the button square.",
      table: { defaultValue: { summary: "default" } },
    },
    isLoading: {
      control: "boolean",
      description: "Shows a spinner and prevents interaction",
      table: { defaultValue: { summary: "false" } },
    },
    loadingText: {
      control: "text",
      description: "Text shown beside the spinner. When omitted the label is hidden.",
    },
    fullWidth: {
      control: "boolean",
      description: "Stretches to fill the container width",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: {
    onClick: fn(),
    label: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

/** Adjust every control in the panel to explore the full API. */
export const Playground: Story = {
  args: {
    variant: "primary",
    size: "md",
    shape: "default",
    label: "Click me",
  },
};

// ─── Variants ─────────────────────────────────────────────────────────────────

/** All nine variants at a glance. */
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button {...args} variant="primary"        label="Primary" />
      <Button {...args} variant="secondary"      label="Secondary" />
      <Button {...args} variant="ghost"          label="Ghost" />
      <Button {...args} variant="outline"        label="Outline" />
      <Button {...args} variant="danger"         label="Danger subtle" />
      <Button {...args} variant="danger-solid"   label="Danger solid" />
      <Button {...args} variant="success"        label="Success" />
      <Button {...args} variant="success-subtle" label="Success subtle" />
      <Button {...args} variant="link"           label="Link" rightIcon={<ArrowRight size={14} />} />
    </div>
  ),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

/** Five sizing tiers — xs through xl. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3 items-end">
      <Button {...args} size="xs" label="Extra small" />
      <Button {...args} size="sm" label="Small" />
      <Button {...args} size="md" label="Medium" />
      <Button {...args} size="lg" label="Large" />
      <Button {...args} size="xl" label="Extra large" />
    </div>
  ),
};

// ─── Individual variants ──────────────────────────────────────────────────────

export const Primary: Story = {
  args: { variant: "primary", label: "Save changes" },
};

export const Secondary: Story = {
  args: { variant: "secondary", label: "Cancel" },
};

export const Ghost: Story = {
  args: { variant: "ghost", label: "Learn more" },
};

export const Outline: Story = {
  args: { variant: "outline", label: "Subscribe" },
};

export const DangerSubtle: Story = {
  name: "Danger (subtle)",
  args: { variant: "danger", label: "Remove item" },
};

export const DangerSolid: Story = {
  name: "Danger (solid)",
  args: { variant: "danger-solid", label: "Delete account" },
};

export const Success: Story = {
  args: { variant: "success", label: "Approve" },
};

export const SuccessSubtle: Story = {
  name: "Success (subtle)",
  args: { variant: "success-subtle", label: "Mark complete" },
};

export const LinkVariant: Story = {
  name: "Link",
  args: {
    variant: "link",
    label: "View full report",
    rightIcon: <ArrowRight size={14} />,
  },
};

// ─── Loading ──────────────────────────────────────────────────────────────────

/** A spinner replaces the label. Pass `loadingText` to show text beside it. */
export const Loading: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <Button {...args} isLoading label="Save" />
      <Button {...args} isLoading loadingText="Saving…" label="Save" />
      <Button {...args} variant="secondary" isLoading loadingText="Loading…" label="Load" />
      <Button {...args} variant="danger-solid" isLoading label="Deleting…" />
    </div>
  ),
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <Button {...args} disabled label="Primary" />
      <Button {...args} variant="secondary"    disabled label="Secondary" />
      <Button {...args} variant="outline"      disabled label="Outline" />
      <Button {...args} variant="danger-solid" disabled label="Locked" leftIcon={<Lock size={14} />} />
    </div>
  ),
};

// ─── Icons ────────────────────────────────────────────────────────────────────

/** Attach icons via `leftIcon`, `rightIcon`, or both. */
export const WithIcons: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button {...args} leftIcon={<Download size={15} />}  label="Download" />
      <Button {...args} variant="secondary" leftIcon={<Plus size={15} />} label="New item" />
      <Button {...args} variant="ghost"     rightIcon={<ChevronDown size={15} />} label="Options" />
      <Button {...args} variant="danger"    leftIcon={<Trash2 size={15} />} label="Delete" />
      <Button {...args} variant="success"   leftIcon={<Check size={15} />} rightIcon={<ArrowRight size={15} />} label="Confirm & continue" />
    </div>
  ),
};

// ─── Icon only ────────────────────────────────────────────────────────────────

/**
 * Square buttons for toolbars. When `shape="icon"` the `label` is hidden
 * visually — always supply `aria-label` for screen readers.
 */
export const IconOnly: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button {...args} shape="icon" aria-label="Search"        label="Search"        leftIcon={<Search size={16} />} />
      <Button {...args} shape="icon" variant="secondary"    aria-label="Notifications" label="Notifications" leftIcon={<Bell size={16} />} />
      <Button {...args} shape="icon" variant="danger-solid" aria-label="Delete"       label="Delete"        leftIcon={<Trash2 size={16} />} />
      <Button {...args} shape="icon" variant="success"      aria-label="Approve"      label="Approve"       leftIcon={<Check size={16} />} />
      <Button {...args} shape="icon" variant="ghost"        aria-label="Favourite"    label="Favourite"     leftIcon={<Star size={16} />} />
    </div>
  ),
};

/** Icon-only across all five sizes. */
export const IconOnlySizes: Story = {
  name: "Icon only — sizes",
  render: (args) => (
    <div className="flex flex-wrap gap-3 items-end">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Button
          key={size}
          {...args}
          shape="icon"
          size={size}
          aria-label={`Search ${size}`}
          label={`Search ${size}`}
          leftIcon={<Search size={size === "xs" ? 12 : size === "sm" ? 14 : size === "xl" ? 20 : 16} />}
        />
      ))}
    </div>
  ),
};

// ─── Pill ─────────────────────────────────────────────────────────────────────

/** Full-radius pill shape available on all variants. */
export const Pill: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button {...args} shape="pill" label="Follow" />
      <Button {...args} shape="pill" variant="secondary" leftIcon={<Star size={14} />} label="Favourite" />
      <Button {...args} shape="pill" variant="success"   leftIcon={<Check size={14} />} label="Approved" />
      <Button {...args} shape="pill" variant="outline"   label="Subscribe" />
    </div>
  ),
};

// ─── Full width ───────────────────────────────────────────────────────────────

export const FullWidth: Story = {
  decorators: [(Story) => <div style={{ width: 340 }}><Story /></div>],
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Button {...args} fullWidth size="lg" leftIcon={<CreditCard size={17} />} label="Pay $49.00" />
      <Button {...args} variant="secondary" fullWidth size="lg" label="Continue with Google" />
      <Button {...args} variant="danger-solid" fullWidth size="lg" disabled leftIcon={<Lock size={17} />} label="Account suspended" />
    </div>
  ),
};

// ─── As anchor ───────────────────────────────────────────────────────────────

/** Pass `href` to render a semantically correct `<a>` element. */
export const AsAnchor: Story = {
  name: "As anchor (<a>)",
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <Button {...args} href="https://example.com" label="External link" />
      <Button {...args} href="/about" variant="outline" rightIcon={<ArrowRight size={14} />} label="About page" />
      <Button {...args} href="/docs"  variant="link" label="Read the docs" />
    </div>
  ),
};

// ─── ButtonGroup ──────────────────────────────────────────────────────────────

/** Segmented controls — view-mode toggles and filter bars. */
export const Group: Story = {
  name: "Button group",
  render: () => (
    <div className="flex flex-col gap-6">
      <ButtonGroup>
        <Button variant="secondary" size="sm" label="List" />
        <Button variant="primary"   size="sm" label="Grid" />
        <Button variant="secondary" size="sm" label="Map" />
      </ButtonGroup>

      <ButtonGroup>
        <Button variant="outline" size="sm" label="Weekly" />
        <Button variant="primary" size="sm" label="Monthly" />
        <Button variant="outline" size="sm" label="Yearly" />
      </ButtonGroup>

      <ButtonGroup orientation="vertical">
        <Button variant="secondary" size="sm" label="Top" />
        <Button variant="secondary" size="sm" label="Middle" />
        <Button variant="secondary" size="sm" label="Bottom" />
      </ButtonGroup>
    </div>
  ),
};

// ─── Dark mode ────────────────────────────────────────────────────────────────

/** Toggle the Storybook toolbar theme to 'Dark' to see all variants adapt. */
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Every variant adapts via Tailwind's `dark:` utilities. Switch the Storybook toolbar theme to 'Dark' to preview.",
      },
    },
  },
  render: (args) => (
    <div className="dark flex flex-wrap gap-3 items-center p-6 bg-gray-900 rounded-xl">
      <Button {...args} variant="primary"        label="Primary" />
      <Button {...args} variant="secondary"      label="Secondary" />
      <Button {...args} variant="ghost"          label="Ghost" />
      <Button {...args} variant="outline"        label="Outline" />
      <Button {...args} variant="danger"         label="Danger" />
      <Button {...args} variant="danger-solid"   label="Danger solid" />
      <Button {...args} variant="success"        label="Success" />
      <Button {...args} variant="success-subtle" label="Success subtle" />
    </div>
  ),
};

// ─── Composition ─────────────────────────────────────────────────────────────

/** A realistic modal footer — ghost cancel, secondary action, solid destructive confirm. */
export const ModalFooter: Story = {
  name: "Composition — modal footer",
  render: () => (
    <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700 w-80">
      <Button variant="ghost"        size="sm" label="Cancel" />
      <Button variant="secondary"    size="sm" label="Save draft" />
      <Button variant="danger-solid" size="sm" leftIcon={<Trash2 size={14} />} label="Delete permanently" />
    </div>
  ),
};