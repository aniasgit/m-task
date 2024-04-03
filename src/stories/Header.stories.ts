import type { Meta, StoryObj } from "@storybook/react";

import { Header as TagsHeader } from "../components";

const meta = {
  title: "Header",
  component: TagsHeader,
  tags: ["autodocs"],
} satisfies Meta<typeof TagsHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Header: Story = {};
