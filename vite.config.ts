import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/hatice-english/',
  plugins: [react()],
  build:{rollupOptions:{output:{entryFileNames:'assets/app.js',chunkFileNames:'assets/[name].js',assetFileNames:'assets/[name][extname]'}}},
});
