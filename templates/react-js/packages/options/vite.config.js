import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
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
