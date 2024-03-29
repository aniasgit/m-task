import type { Meta, StoryObj } from "@storybook/react";
// import { fn } from '@storybook/test';

import { Header } from "../components";

const meta = {
  title: "Header",
  component: Header,
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TagsHeader: Story = {};

// export const LoggedOut: Story = {};
