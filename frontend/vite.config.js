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
    optimizeDeps: {
      force: true // Force re-optimization of dependencies
    },
    server: {
      port: 5173,
      fs: {
        allow: [
          // Allow serving files from the frontend directory
          '.',
          // Allow serving files from the parent directory (for shared node_modules)
          '..',
        ]
      },
      proxy: {
        '/api': 'http://127.0.0.1:5000'
      }
    },
  };
});