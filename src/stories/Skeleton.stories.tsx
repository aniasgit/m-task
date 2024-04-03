import type { Meta, StoryObj } from "@storybook/react";

import { Skeleton as SkeletonComponent } from "../components";

const meta = {
  title: "Skeleton",
  component: SkeletonComponent,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof SkeletonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Skeleton: Story = {};
