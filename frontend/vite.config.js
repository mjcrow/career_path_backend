import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.(js|jsx)$/, // ⬅️ Includes .jsx files
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx', // ⬅️ jsx extension
      },
    },
  },
  resolve: {
    alias: {
      'react-dom/client': path.resolve(__dirname, 'node_modules/react-dom/client.js'),
    },
  },
});