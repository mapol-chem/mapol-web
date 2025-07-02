import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    base: "/mapol-web/",
    build: {
      outDir: 'build',
    },
    server: {
      host: '0.0.0.0',
      port: 5173
    },
    plugins: [react()],
  };
});