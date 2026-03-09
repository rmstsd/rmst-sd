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
    emitCss: false,
    inlineScripts: true,
    inlineStyles: true
  },
  html: {
    inject: 'body',
    outputStructure: 'flat'
  },
  plugins: [pluginReact()],
  performance: {
    chunkSplit: {
      strategy: 'all-in-one'
    }
  }
})
