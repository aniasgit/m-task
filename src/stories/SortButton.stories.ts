import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { SortButton } from "../components";

const meta = {
  title: "SortButton",
  component: SortButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onClick: fn() },
} satisfies Meta<typeof SortButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithoutDefaultSortingOrder: Story = {
  args: {
    children: "Name",
    sortBy: "name",
  },
};

export const AscendingDefaultSortingOrder: Story = {
  args: {
    children: "Name",
    sortBy: "name",
    order: "asc",
  },
};

export const DescendingDefaultSortingOrder: Story = {
  args: {
    children: "Name",
    sortBy: "name",
    order: "desc",
  },
};

export const Disabled: Story = {
  args: {
    children: "Name",
    sortBy: "name",
    disabled: true,
  },
};
