import { colors, spacing, borderRadius, fontFamily, fontSize, fontWeight, breakpoints } from './tokens';

// Tailwind config từ design tokens
export const tailwindConfig = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../../packages/react-components/src/**/*.{js,ts,jsx,tsx}',
    '../../../apps/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors,
      spacing,
      borderRadius,
      fontFamily,
      fontSize,
      fontWeight,
      screens: breakpoints,
    },
  },
  plugins: [],
} as const;