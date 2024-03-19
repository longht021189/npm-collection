import { defineConfig } from '@rsbuild/core'

export default defineConfig({
  plugins: [],
  source: {
    entry: {
      value: './src/index.cjs'
    }
  },
  output: {
    targets: ['node'],
    minify: false,
  }
});
