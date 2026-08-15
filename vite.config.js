import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cp } from 'node:fs/promises';
import { resolve } from 'node:path';

const copyStaticAssets = () => ({
  name: 'copy-static-assets',
  apply: 'build',
  async closeBundle() {
    await cp(resolve('assets'), resolve('dist/assets'), {
      recursive: true,
      force: true,
    });
  },
});

export default defineConfig({
  base: './',
  plugins: [react(), copyStaticAssets()],
});
