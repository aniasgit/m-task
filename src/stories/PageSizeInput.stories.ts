import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { PageSizeInput } from "../components";

const meta = {
  title: "PageSizeInput",
  component: PageSizeInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: fn(), onValidation: fn() },
} satisfies Meta<typeof PageSizeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithDefaultSize: Story = {
  args: {
    size: 15,
  },
};

export const WithoutDefaultSize: Story = {
  args: {},
};
