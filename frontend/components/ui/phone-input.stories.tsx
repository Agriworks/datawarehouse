import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PhoneInput } from "./phone-input";
import type { Value } from "react-phone-number-input"; // Import Value type

const meta = {
  title: "Components/PhoneInput",
  component: PhoneInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    value: { control: "text" },
  },
} as Meta<typeof PhoneInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    value: "",
    onChange: (value: Value) => console.log("Phone number changed:", value), // Explicitly typed
  },
};
