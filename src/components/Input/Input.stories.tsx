import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select" },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default:    Story = { args: { label: "Email", placeholder: "you@example.com" } };
export const WithHint:   Story = { args: { label: "Username", hint: "Only letters and numbers", placeholder: "john_doe" } };
export const WithError:  Story = { args: { label: "Email", error: "Invalid email address", placeholder: "you@example.com" } };
export const Required:   Story = { args: { label: "Password", required: true, type: "password" } };
export const Disabled:   Story = { args: { label: "Email", disabled: true, value: "you@example.com" } };
export const Small:      Story = { args: { label: "Search", size: "sm", placeholder: "Search..." } };
export const Large:      Story = { args: { label: "Search", size: "lg", placeholder: "Search..." } };
