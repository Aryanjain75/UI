import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";
import { Button } from "../Button/Button";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    padding:  { control: "select" },
    bordered: { control: "boolean" },
    shadow:   { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: { children: "This is a basic card." },
};

export const WithShadow: Story = {
  args: { shadow: true, children: "Card with shadow." },
};

export const WithSections: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>Card Title</CardHeader>
      <CardBody>This is the main content of the card. Put anything here.</CardBody>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
};
