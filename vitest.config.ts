/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    include: [
      './test/unit/**/*.{test,spec}.{ts,tsx}',
      './test/integration/**/*.{test,spec}.{ts,tsx}',
      './test/e2e/**/*.{test,spec}.{ts,tsx}'
    ],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'test/setup.ts',
        'test/environment/**'
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@app': resolve(__dirname, './src/app'),
      '@modules': resolve(__dirname, './src/modules'),
      '@shared': resolve(__dirname, './src/shared'),
      '@core': resolve(__dirname, './src/core'),
      '@assets': resolve(__dirname, './src/assets'),
      '@hooks': resolve(__dirname, './src/shared/hooks'),
      '@utils': resolve(__dirname, './src/shared/utils'),
      '@types': resolve(__dirname, './src/shared/types'),
      '@config': resolve(__dirname, './src/core/config'),
      '@services': resolve(__dirname, './src/core/services'),
      '@state': resolve(__dirname, './src/core/state'),
      '@test': resolve(__dirname, './test'),
    },
  },
});
