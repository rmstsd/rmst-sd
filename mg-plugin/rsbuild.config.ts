import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  source: {
    entry: {
      index: './src/index.tsx',
      main: {
        import: './main/main.ts',
        html: false
      }
    }
  },
  output: {
    minify: false,
    distPath: { js: '', css: '', image: '', svg: '', font: '', media: '' },
    filename: {
      js: '[name].js'
    },
    emitCss: false
  },
  html: {
    outputStructure: 'flat'
  },
  plugins: [pluginReact()],
  dev: {
    writeToDisk: true
  }
})
