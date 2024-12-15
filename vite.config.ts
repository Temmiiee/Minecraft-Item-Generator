import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/src',
  plugins: [react()],
  build: {
    sourcemap: true
  }
})