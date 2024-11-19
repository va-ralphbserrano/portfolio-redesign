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
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
      deleteOriginalAssets: false,
    }),
    visualizer({
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
      open: false
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['react-pdf', 'pdfjs-dist/build/pdf.worker.entry'],
  },
  build: {
    target: 'esnext',
    assetsInlineLimit: 0,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
      },
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('pdf.worker')) {
              return 'pdf-worker';
            }
            if (id.includes('react')) {
              return 'react-vendor';
            }
            if (id.includes('@headlessui') || id.includes('@heroicons')) {
              return 'ui-vendor';
            }
            if (id.includes('three')) {
              return 'three-vendor';
            }
            if (id.includes('pdfjs-dist')) {
              return 'pdf';
            }
            return 'vendor';
          }
          if (id.includes('src/utils')) {
            return 'utils';
          }
          if (id.includes('src/components/common')) {
            return 'common-components';
          }
          if (id.includes('src/components/layout')) {
            return 'layout-components';
          }
          if (id.includes('src/components/sections')) {
            return 'section-components';
          }
        },
        manualChunks: {
          pdfWorker: ['pdfjs-dist/build/pdf.worker.entry'],
        },
        assetFileNames(assetInfo) {
          if (assetInfo.name === 'pdf.worker.js') {
            return 'pdf.worker.min.js';
          }
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (/woff|woff2/.test(extType)) {
            extType = 'fonts';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    cssCodeSplit: true,
    modulePreload: true,
  },
  server: {
    fs: {
      // Allow serving files from node_modules
      allow: ['..', 'node_modules'],
    },
  },
});
