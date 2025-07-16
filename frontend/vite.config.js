import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  const base = command === 'build' ? '/mapol-web/' : '/';
  
  return {
    base: base,
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': 'http://127.0.0.1:5000'
      }
    },
  };
});