import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

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
  base: '/va-rb-portfolio/',
  plugins: [
    react(),
    ViteImageOptimizer(imageOptimizerConfig),
    visualizer({
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
      open: false
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', '@headlessui/react', 'react-icons'],
          'three-vendor': ['three'],
        },
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (/pdf|docx?|xlsx?|pptx?/i.test(extType)) {
            extType = 'docs';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
