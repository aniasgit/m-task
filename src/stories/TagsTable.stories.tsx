import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { fn } from "@storybook/test";
import { TagsTable } from "../components";
import { getData } from "../data";

const meta = {
  title: "TagsTable",
  component: TagsTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TagsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithData: Story = {
  args: {
    params: { page: 1, pageSize: 5, sort: "popular", order: "desc" },
    status: "success",
    isValidationError: false,
    onPageChange: fn(),
    onSortChange: fn(),
    error: null,
  },
  render: function Render(args) {
    const [{ params }, updateArgs] = useArgs();

    function handlePageChange(page: number) {
      updateArgs({
        params: { ...params, page },
        data: getData({ ...params, page }),
      });
    }

    function handleSortChange(sortBy: string, order: "asc" | "desc") {
      updateArgs({
        params: { ...params, sort: sortBy, order },
        data: getData({ ...params, sort: sortBy, order }),
      });
    }
    console.log(args.params);
    console.log(args.data);

    return (
      <TagsTable
        {...args}
        data={args.status === "success" ? getData(args.params) : undefined}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
      />
    );
  },
};

export const LoadingData: Story = {
  args: {
    params: { page: 1, pageSize: 5, sort: "popular", order: "desc" },
    status: "pending",
    isValidationError: false,
    onPageChange: fn(),
    onSortChange: fn(),
    error: null,
  },
};

export const WithError: Story = {
  args: {
    params: { page: 1, pageSize: 5, sort: "popular", order: "desc" },
    status: "error",
    isValidationError: false,
    onPageChange: fn(),
    onSortChange: fn(),
    error: new Error("Data download failed"),
  },
};

export const Disabled: Story = {
  args: {
    data: getData({ page: 1, pageSize: 5, sort: "popular", order: "desc" }),
    params: { page: 1, pageSize: 5, sort: "popular", order: "desc" },
    status: "success",
    onPageChange: fn(),
    onSortChange: fn(),
    error: null,
    isValidationError: true,
  },
};
