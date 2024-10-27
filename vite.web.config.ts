import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import 'dotenv/config';

/* additional config for building a static site (and not a library) */
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const base = process.env['BASE_URL'] || "./";
  const publicDir = command === 'build' ? resolve(__dirname, 'public', 'logo') : resolve(__dirname, 'public');
  return {
    publicDir,
    base,
    build: {
      emptyOutDir: true,
      minify: 'terser',
      outDir: resolve(__dirname, 'out', 'static'),
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react'],
            'react-dom': ['react-dom'],
            'xyflow-react': ['@xyflow/react']
          }
        }
      }
    },
    resolve: {
      alias: {
        '@waldiez': resolve(__dirname, 'src', 'waldiez')
      }
    },
    plugins: [react()]
  }
});
