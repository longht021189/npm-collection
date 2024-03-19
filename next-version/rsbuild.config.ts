import { defineConfig } from '@rsbuild/core'

export default defineConfig({
  plugins: [],
  source: {
    entry: {
      index: './src/index.cjs'
    }
  },
  output: {
    distPath: {
      server: ''
    },
    targets: ['node'],
  }
});
