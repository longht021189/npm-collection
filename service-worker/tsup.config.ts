import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/register.ts"],
  format: ["cjs", "esm"],
  outDir: 'dist/src',
  dts: true,
  splitting: false,
  sourcemap: false,
  clean: true,
  minify: true,
});