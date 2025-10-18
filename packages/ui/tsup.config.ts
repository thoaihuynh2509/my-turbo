import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/**/*.{tsx}"],
  format: ["esm", "cjs"],
  dts: true, // Generate type definitions
  splitting: false, // Disable code splitting
  sourcemap: true, // Generate source maps
  clean: true, // Clean the output directory
  treeshake: true,
  external: ["react", "react-dom"],
});
