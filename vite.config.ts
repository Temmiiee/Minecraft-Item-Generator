import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/minecraft-item-generator/',
  plugins: [react()],
  build: {
    sourcemap: true
  }
})