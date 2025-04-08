import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    base: "/mapol-web/",
    build: {
      outDir: 'build',
    },
    plugins: [react()],
  };
});