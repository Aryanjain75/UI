import type { Meta, StoryObj } from "@storybook/react";
import { Template } from "./Template";

const meta: Meta<typeof Template> = {
  title: "Components/Template",   // ← Change this to your component name
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select" },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

// ─── Add one Story per meaningful visual state ────────────────────────────────

export const Default: Story = {
  args: { children: "Template component" },
};

// export const AnotherState: Story = { ... }
