import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        options: resolve(__dirname, 'index.html')
      },
      output: {
        entryFileNames: 'index.js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
})
