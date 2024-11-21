import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { splitVendorChunkPlugin } from 'vite';
import { compression } from 'vite-plugin-compression2';

const imageOptimizerConfig = {
  jpg: {
    quality: 80,
    progressive: true
  },
  jpeg: {
    quality: 80,
    progressive: true
  },
  png: {
    quality: 80,
    progressive: true
  },
  webp: {
    lossless: true
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/va-rb-portfolio/' : '/',
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    ViteImageOptimizer(imageOptimizerConfig),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
    visualizer({
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
      open: true
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  optimizeDeps: {
    include: ['react-pdf', 'pdfjs-dist/build/pdf.worker.entry'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx'
      },
      format: 'esm',
      target: 'esnext'
    }
  },
  build: {
    target: 'esnext',
    assetsInlineLimit: 0,
    minify: 'esbuild',
    cssMinify: true,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks: {
          pdfWorker: ['pdfjs-dist/build/pdf.worker.entry'],
          'react-core': ['react', 'react-dom'],
          'ui-libs': [
            '@emotion/react',
            '@emotion/styled',
            '@headlessui/react',
            '@heroicons/react',
            'framer-motion'
          ]
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    chunkSizeWarningLimit: 1000,
  }
});
