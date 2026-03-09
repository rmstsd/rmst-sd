import { defineConfig } from 'vite'
import { resolve } from 'path'
import { builtinModules } from 'module'
console.log(builtinModules)

export default defineConfig({
  build: {
    outDir: resolve(__dirname, './'),
    emptyOutDir: false,
    minify: false,
    lib: {
      entry: resolve(__dirname, 'index.js'),
      fileName: () => 'index.cjs',
      formats: ['cjs'],
      cssFileName: 'index'
    },
    rollupOptions: {
      // 外部化 Node.js 内置模块和依赖
      // 避免将 fs, path 等内置模块打包进去
      external: [
        ...builtinModules,
        ...builtinModules.map(m => `node:${m}`)
        // 如果有其他不想打包进去的依赖（如 express），也写在这里
        // /node_modules/
      ]
    }
  }
})
