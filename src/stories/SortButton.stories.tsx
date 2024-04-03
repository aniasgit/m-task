import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useArgs } from "@storybook/preview-api";
import { SortButton } from "../components";

const meta = {
  title: "SortButton",
  component: SortButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onClick: fn() },
  render: function Render(args) {
    const [{ sortBy, order }, updateArgs] = useArgs();

    function handleBtnClick(sortBy: string, order: "asc" | "desc") {
      updateArgs({ order: order, sortBy: sortBy });
    }
    return (
      <SortButton
        {...args}
        onClick={handleBtnClick}
        sortBy={sortBy}
        order={order}
      />
    );
  },
} satisfies Meta<typeof SortButton>;

export default meta;
type Story = StoryObj<typeof meta>;

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
