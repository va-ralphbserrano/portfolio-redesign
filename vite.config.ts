import terser from '@rollup/plugin-terser';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import { compression } from 'vite-plugin-compression2';
import { createHtmlPlugin } from 'vite-plugin-html';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { VitePWA } from 'vite-plugin-pwa';
import tsConfigPaths from 'vite-tsconfig-paths';
import * as zlib from 'zlib';

// Shared constants
const COMPRESSION_TEST_REGEX = /\.(js|css|html|json|xml|txt|svg|ttf|otf|woff|woff2)$/i;
const IMAGE_TEST_REGEX = /\.(png|jpe?g|gif|webp|avif)$/i;

const imageOptimizerConfig = {
  jpg: {
    quality: 80,
    progressive: true,
    mozjpeg: true,
    stripMetadata: true,
    optimizeScans: true,
  },
  jpeg: {
    quality: 80,
    progressive: true,
    mozjpeg: true,
    stripMetadata: true,
    optimizeScans: true,
  },
  png: {
    quality: 80,
    progressive: true,
    stripMetadata: true,
    optimizationLevel: 7,
    palette: true,
    colors: 128,
  },
  webp: {
    quality: 85,
    lossless: false,
    stripMetadata: true,
    nearLossless: true,
    smartSubsample: true,
    effort: 6,
  },
  avif: {
    quality: 80,
    speed: 8,
    chromaSubsampling: '4:2:0',
    optimizeScans: true,
  },
};

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = mode === 'production';
  const isBuild = command === 'build';
  const shouldAnalyze = process.env.ANALYZE === 'true';
  const basePath = process.env.BASE_PATH || '/va-rb-portfolio/';

  return {
    base: isProd ? basePath : '/',
    
    plugins: [
      // TypeScript paths
      tsConfigPaths(),
      
      // React configuration
      react({
        jsxRuntime: 'automatic',
        jsxImportSource: 'react',
        babel: {
          babelrc: false,
          configFile: false,
          presets: [
            ['@babel/preset-env', { 
              modules: false,
              targets: { browsers: 'last 2 versions' }
            }],
            ['@babel/preset-react', { 
              runtime: 'automatic',
              importSource: 'react'
            }],
            '@babel/preset-typescript'
          ]
        }
      }),

      // Disable PWA plugin temporarily
      // VitePWA({
      //   registerType: 'autoUpdate',
      //   includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      //   manifest: {
      //     name: env.VITE_APP_TITLE,
      //     short_name: 'Portfolio',
      //     description: env.VITE_APP_DESCRIPTION,
      //     theme_color: '#ffffff',
      //     background_color: '#ffffff',
      //     icons: [
      //       {
      //         src: 'pwa-192x192.png',
      //         sizes: '192x192',
      //         type: 'image/png',
      //       },
      //       {
      //         src: 'pwa-512x512.png',
      //         sizes: '512x512',
      //         type: 'image/png',
      //         purpose: 'any maskable',
      //       },
      //     ],
      //   },
      //   workbox: {
      //     globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
      //     runtimeCaching: [
      //       {
      //         urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      //         handler: 'CacheFirst',
      //         options: {
      //           cacheName: 'google-fonts-cache',
      //           expiration: {
      //             maxEntries: 10,
      //             maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
      //           },
      //           cacheableResponse: {
      //             statuses: [0, 200],
      //           },
      //         },
      //       },
      //       {
      //         urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      //         handler: 'CacheFirst',
      //         options: {
      //           cacheName: 'gstatic-fonts-cache',
      //           expiration: {
      //             maxEntries: 10,
      //             maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
      //           },
      //           cacheableResponse: {
      //             statuses: [0, 200],
      //           },
      //         },
      //       },
      //     ],
      //   },
      // }),

      // Vendor chunk splitting
      splitVendorChunkPlugin(),

      // Image optimization
      ViteImageOptimizer({
        test: IMAGE_TEST_REGEX,
        ...imageOptimizerConfig,
      }),

      // HTML optimization
      createHtmlPlugin({
        minify: isProd && {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          sortAttributes: true,
          sortClassName: true,
        },
        inject: {
          data: {
            title: env.VITE_APP_TITLE,
            description: env.VITE_APP_DESCRIPTION,
            preloadLinks: isProd,
          },
        },
      }),

      // Compression
      isProd && compression({
        algorithm: 'gzip',
        include: COMPRESSION_TEST_REGEX,
        threshold: 1024,
        compressionOptions: {
          level: 9,
        },
      }),
      isProd && compression({
        algorithm: 'brotliCompress',
        include: COMPRESSION_TEST_REGEX,
        threshold: 1024,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
      }),

      // Bundle analysis
      shouldAnalyze && visualizer({
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
        open: true,
        template: 'treemap',
        sourcemap: true,
      }),
    ].filter(Boolean),

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './src/shared/assets')
      },
    },

    build: {
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
      outDir: 'dist',
      assetsDir: 'assets',
      cssCodeSplit: true,
      modulePreload: {
        polyfill: true
      },
      rollupOptions: {
        output: {
          format: 'es',
          generatedCode: {
            constBindings: true
          },
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['@headlessui/react', '@emotion/react', '@emotion/styled'],
            'animation-vendor': ['framer-motion'],
            'utils-vendor': ['@emailjs/browser'],
          },
          chunkFileNames: isProd ? 'assets/js/[name].[hash].js' : 'assets/js/[name].js',
          entryFileNames: isProd ? 'assets/js/[name].[hash].js' : 'assets/js/[name].js',
          assetFileNames: (assetInfo) => {
            const extType = assetInfo.name.split('.').at(1);
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              return 'assets/images/[name].[hash][extname]';
            }
            if (/css/i.test(extType)) {
              return 'assets/css/[name].[hash][extname]';
            }
            if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
              return 'assets/fonts/[name].[hash][extname]';
            }
            return 'assets/[name].[hash][extname]';
          },
        },
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
      },
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,
      sourcemap: !isProd,
      minify: isProd ? 'terser' : false,
      terserOptions: isProd ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info'],
          passes: 3,
          unsafe_arrows: true,
          unsafe_methods: true,
          unsafe_proto: true,
        },
        mangle: {
          properties: false,
          toplevel: true,
        },
        format: {
          comments: false,
          preserve_annotations: false,
        },
      } : undefined,
      cssTarget: ['chrome89', 'edge89', 'firefox89', 'safari15'],
      assetsInlineLimit: 4096,
      emptyOutDir: true,
      // Skip type checking during build
      skipTypeCheck: true,
    },

    preview: {
      port: 3000,
      strictPort: true,
      host: true,
      cors: true,
      headers: {
        'Cache-Control': 'public, max-age=31536000',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
      },
    },

    server: {
      port: 3000,
      strictPort: true,
      host: true,
      cors: true,
      open: true,
      hmr: {
        overlay: true,
        clientPort: 3000,
        timeout: 5000,
      },
      headers: {
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
      },
    },

    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@headlessui/react',
        '@emotion/react',
        '@emotion/styled',
        'framer-motion',
      ],
      exclude: ['@emailjs/browser'],
      esbuildOptions: {
        target: 'es2020',
      },
    },
  };
});
