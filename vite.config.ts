import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
// import viteTsConfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/

const SRC_DIR = path.resolve(__dirname, 'src');

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@fonts': path.join(SRC_DIR, 'fonts'),
      '@app': path.join(SRC_DIR, 'app'),
      '@components': path.join(SRC_DIR, 'components'),
      '@config': path.join(SRC_DIR, 'config'),
      '@pages': path.join(SRC_DIR, 'pages'),
      '@store': path.join(SRC_DIR, 'store'),
      '@models': path.join(SRC_DIR, 'models'),
    },
  },
  plugins: [react()],
});
