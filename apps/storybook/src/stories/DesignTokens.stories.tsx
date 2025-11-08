import type { Meta, StoryObj } from "@storybook/react-vite";
import { colors, spacing } from "@repo/design-tokens";

const meta = {
  title: "Design System/Design Tokens",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const ColorPalette: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", padding: "2rem" }}>
      <h2>Color Palette</h2>
      {Object.entries(colors).map(([colorName, shades]) => (
        <div key={colorName}>
          <h3 style={{ textTransform: "capitalize", marginBottom: "0.5rem" }}>
            {colorName}
          </h3>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {Object.entries(shades).map(([shade, value]) => (
              <div
                key={shade}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: value,
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                />
                <div style={{ fontSize: "0.75rem", fontWeight: "500" }}>
                  {shade}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#6b7280",
                    fontFamily: "monospace",
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const SpacingScale: Story = {
  render: () => (
    <div style={{ padding: "2rem" }}>
      <h2>Spacing Scale</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {Object.entries(spacing).map(([key, value]) => (
          <div
            key={key}
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            <div
              style={{
                width: value,
                height: "20px",
                backgroundColor: "#3b82f6",
                borderRadius: "4px",
              }}
            />
            <div>
              <strong>spacing-{key}</strong>: {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
