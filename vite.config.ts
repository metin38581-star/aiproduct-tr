import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Vercel dashboard üzerindeki API_KEY'i build aşamasında yakalar
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false
  },
  server: {
    port: 3000,
  }
});