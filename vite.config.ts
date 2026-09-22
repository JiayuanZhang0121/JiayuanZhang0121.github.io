import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(['index', 'life', 'study', 'projects', 'about', '404'].map(
        (page) => [page, resolve(import.meta.dirname, page === 'index' || page === '404' ? `${page}.html` : `${page}/index.html`)]
      ))
    }
  }
});
