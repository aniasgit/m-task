import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { TablePagination } from "../components";

const meta = {
  title: "TablePagination",
  component: TablePagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: fn() },
} satisfies Meta<typeof TablePagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TablePaginationSample: Story = {
  args: {
    count: 10,
    page: 4,
  },
};

export const TablePaginationDisabled: Story = {
  args: {
    count: 10,
    page: 1,
    disabled: true,
  },
};
