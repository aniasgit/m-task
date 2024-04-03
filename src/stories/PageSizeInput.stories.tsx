import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
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
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function handlePageSizeChange(size: number) {
      updateArgs({ size });
    }

    return <PageSizeInput {...args} onChange={handlePageSizeChange} />;
  },
} satisfies Meta<typeof PageSizeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithDefaultSize: Story = {
  args: {
    size: 15,
  },
};

export const WithoutDefaultSize: Story = {
  args: {},
};

export const WithError: Story = {
  args: {
    size: 15.5,
  },
};
