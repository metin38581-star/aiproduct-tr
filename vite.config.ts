
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
  define: {
    // Vercel'deki API_KEY'i istemci tarafında process.env.API_KEY olarak erişilebilir kılar
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
    'process.env': {}
  }
});
