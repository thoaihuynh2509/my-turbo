import { colors, spacing, borderRadius } from '@repo/design-tokens';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'currentColor',
    },
    spacing: spacing,
    borderRadius: borderRadius,
  },
}