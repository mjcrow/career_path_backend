import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.(js|jsx)$/,
  },
  optimizeDeps: {
    include: ['react-dom/client'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx',
      },
    },
  },
  resolve: {
    alias: {
      'react-router': false
    }
  },
  build: {
    rollupOptions: {
    },
  },
});