import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LocationSelector from "./location-input";

// Define types for country and state
type Country = { id: number; name: string };
type State = { id: number; name: string };

const meta = {
  title: "Components/LocationSelector",
  component: LocationSelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
} as Meta<typeof LocationSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    disabled: false,
    onCountryChange: (country: Country | null) =>
      console.log("Selected country:", country),
    onStateChange: (state: State | null) =>
      console.log("Selected state:", state),
  },
};
