import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    base: "/test-app/",
    build: {
      outDir: 'build',
    },
    plugins: [react()],
  };
});