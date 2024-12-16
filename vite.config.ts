import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Minecraft-Item-Generator/',
  plugins: [react()],
});
