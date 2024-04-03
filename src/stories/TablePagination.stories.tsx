import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { fn } from "@storybook/test";
import { TablePagination as TablePaginationComponent } from "../components";

const meta = {
  title: "TablePagination",
  component: TablePaginationComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TablePaginationComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TablePagination: Story = {
  args: {
    count: 10,
    page: 4,
    onChange: fn(),
  },
  render: function Render(args) {
    const [{ page }, updateArgs] = useArgs();

    function handlePageChange(page: number) {
      updateArgs({ page: page });
    }

    return (
      <TablePaginationComponent
        {...args}
        onChange={(page: number) => handlePageChange(page)}
        page={page}
      />
    );
  },
};

export const TablePaginationDisabled: Story = {
  args: {
    count: 10,
    page: 1,
    disabled: true,
    onChange: fn(),
  },
};
