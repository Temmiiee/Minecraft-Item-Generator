import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Minecraft-Item-Generator/', // Utilisez le nom de votre dépôt GitHub
  plugins: [react()],
});
