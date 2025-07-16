import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  // Use base path only for build (production), not for dev
  const base = command === 'build' ? '/mapol-web/' : '/';
  
  return {
    base: base,
    build: {
      outDir: 'build',
    },
    server: {
      host: '0.0.0.0',
      port: 5173
    },
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:5000',
          changeOrigin: true,
          secure: false,
        }
      }
    },
  };
});