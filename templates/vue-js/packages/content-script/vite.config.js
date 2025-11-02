import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'ContentScript',
      formats: ['iife'],
      fileName: () => 'index.js'
    },
    rollupOptions: {
      output: {
        extend: true
      }
    }
  }
})
