import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

const defaultIncludes = ['**/tests/**/*.test.{ts,tsx}', '!**/tests/browser/**/*.test.{ts,tsx}'];
const defaultBrowserIncludes = ['**/tests/browser/**/*.test.{ts,tsx}'];
const isBrowserTest = process.argv.includes('--browser.enabled');

const viewport = { width: 1280, height: 720 };
const thresholds = {
  statements: 90,
  branches: 90,
  functions: 90,
  lines: 90
};

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  publicDir: command === 'build' ? resolve(__dirname, 'public', 'logo') : resolve(__dirname, 'public'),
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src', 'waldiez', 'index.ts'),
      name: '@waldiez',
      formats: ['es', 'cjs', 'umd'],
      fileName: '@waldiez'
    },
    minify: 'terser',
    rollupOptions: {
      output: {
        exports: 'named',
        globals: {
          'react/jsx-runtime': 'jsxRuntime',
          nanoid: 'nanoid',
          '@xyflow/react': 'XYFlowReact',
          'react-icons/fa': 'reactIconsFa',
          'react-icons/fa6': 'reactIconsFa6',
          'react-icons/ai': 'reactIconsAi',
          'react-icons/gi': 'reactIconsGi',
          'react-icons/go': 'reactIconsGo',
          'react-icons/md': 'reactIconsMd',
          '@monaco-editor/react': 'react$1',
          react: 'react',
          zustand: 'zustand',
          'zustand/shallow': 'zustandShallow',
          'zustand/traditional': 'zustandTraditional',
          'react-select': 'reactSelect',
          'rc-slider': 'rcSlider',
          'react-error-boundary': 'reactErrorBoundary'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@waldiez': resolve(__dirname, 'src', 'waldiez')
    }
  },
  plugins: [
    react(),
    externalizeDeps(),
    dts({
      insertTypesEntry: true,
      // rollupTypes: true,
      tsconfigPath: './tsconfig.build.json'
    })
  ],
  test: {
    include: isBrowserTest ? defaultBrowserIncludes : defaultIncludes,
    // support `describe`, `test` etc. globally,
    globals: true,
    // pool: 'vmThreads',
    // isolate: false,
    bail: 1,
    // run tests in jsdom environment
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'text', 'json', 'html'],
      include: ['src/**/*'],
      exclude: ['**/types.ts'],
      ignoreEmptyLines: true,
      thresholds,
      all: true
    },
    onConsoleLog(log: string, type: 'stdout' | 'stderr'): boolean | void {
      // const logLower = log.toLowerCase();
      const isNotFound = log.includes('not found');
      // svg circle:
      // Warning: Received NaN for the `x` attribute.
      // Warning: Received NaN for the `y` attribute.
      // Warning: Received NaN for the `r` attribute.
      // Warning: Received NaN for the `cx` attribute.
      // Warning: Received NaN for the `cy` attribute.
      const isReceivedNaNRexExp = /Received NaN for the `(.*)` attribute/;
      // Warning: An update to FlowRenderer inside a test was not wrapped in act(...).
      const isFlowRendererUpdate = log.includes(
        'Warning: An update to FlowRenderer inside a test was not wrapped'
      );
      const isReceivedNaN = isReceivedNaNRexExp.test(log);
      const isErrorBoundary = log.includes("Cannot read properties of undefined (reading 'x')");
      if (type === 'stderr' && (isNotFound || isErrorBoundary || isReceivedNaN || isFlowRendererUpdate)) {
        // we expect these warnings in `non-browser` tests
        return false;
      }
      return true;
    },
    // global test setup
    setupFiles: isBrowserTest ? [] : ['./vitest.setup.tsx'],
    // browser setup is in workspace
    browser: {
      provider: 'playwright', // or 'webdriverio'
      enabled: isBrowserTest,
      name: 'chromium', // browser name is required
      headless: true,
      viewport,
      providerOptions: {
        context: {
          recordVideo: {
            dir: './tests/browser/videos',
            size: viewport
          },
          viewport,
          reducedMotion: 'reduce'
        }
      }
    }
  }
}));
