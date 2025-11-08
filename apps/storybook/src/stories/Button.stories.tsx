import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@repo/ui";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "ghost", "danger"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    isLoading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
  },
};

export const Small: Story = {
  args: {
    variant: "primary",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    variant: "primary",
    size: "lg",
  },
};

export const Loading: Story = {
  args: {
    variant: "primary",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
  },
};

export const AllVariants: Story = {
  args: {
    variant: "primary",
  },
  render: () => (
    <div className="space-y-4">
      {(["primary", "secondary", "ghost", "danger"] as const).map((variant) => (
        <div key={variant} className="flex gap-4 items-center">
          <span className="w-24 text-sm font-medium capitalize">
            {variant}:
          </span>
          {(["sm", "md", "lg"] as const).map((size) => (
            <Button key={size} variant={variant} size={size}>
              {size.toUpperCase()}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};
