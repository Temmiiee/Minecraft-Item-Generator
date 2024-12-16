import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Minecraft-Item-Generator/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  define: {
    'process.env.BASE_URL': JSON.stringify('/Minecraft-Item-Generator/'),
  },
});
