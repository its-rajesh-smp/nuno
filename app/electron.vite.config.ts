import { resolve } from 'node:path';
import { defineConfig } from 'electron-vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const alias = {
  '@': resolve(__dirname, 'src'),
  '@shared': resolve(__dirname, 'shared'),
};

export default defineConfig({
  main: {
    resolve: { alias },
    build: { lib: { entry: resolve(__dirname, 'electron/main/index.ts') } },
  },
  preload: {
    resolve: { alias },
    build: { lib: { entry: resolve(__dirname, 'electron/preload/index.ts') } },
  },
  renderer: {
    root: '.',
    publicDir: resolve(__dirname, 'public'),
    resolve: { alias },
    plugins: [
      react(),
      tailwindcss(),
      // React Fast Refresh injects an inline script in dev, which the CSP would block.
      {
        name: 'zodnote:dev-csp',
        apply: 'serve',
        transformIndexHtml: (html) => html.replace(/<meta\s+http-equiv="Content-Security-Policy"[\s\S]*?\/>/, ''),
      },
    ],
    build: { rollupOptions: { input: resolve(__dirname, 'index.html') } },
  },
});
