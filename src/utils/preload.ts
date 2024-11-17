type PreloadType = 'image' | 'style' | 'script' | 'font';

interface PreloadOptions {
  as: PreloadType;
  type?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
  media?: string;
}

// Get base URL from Vite
const base = import.meta.env.BASE_URL;

// Helper to get correct asset path
const getAssetPath = (path: string) => {
  // If path already starts with base, return as is
  if (path.startsWith(base)) return path;
  // If path starts with /, combine with base
  if (path.startsWith('/')) return `${base}${path.slice(1)}`;
  // Otherwise, combine with base
  return `${base}${path}`;
};

export const preloadResource = (url: string, options: PreloadOptions): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = getAssetPath(url);
  link.as = options.as;

  if (options.type) {
    link.type = options.type;
  }

  if (options.crossOrigin) {
    link.crossOrigin = options.crossOrigin;
  }

  if (options.media) {
    link.media = options.media;
  }

  document.head.appendChild(link);
};

export const preloadImage = (url: string): void => {
  preloadResource(url, { as: 'image' });
};

export const preloadStyle = (url: string): void => {
  preloadResource(url, { as: 'style' });
};

export const preloadScript = (url: string): void => {
  preloadResource(url, { as: 'script' });
};

export const preloadFont = (url: string, type: string): void => {
  preloadResource(url, { as: 'font', type, crossOrigin: 'anonymous' });
};

// Only preload critical assets in production
const isDev = import.meta.env.DEV;

export const preloadCriticalAssets = (): void => {
  if (isDev) return;

  // Preload critical fonts
  preloadFont('fonts/inter-var.woff2', 'font/woff2');
  
  // Preload critical images
  preloadImage('assets/images/portfolio/portfolio-1.png');
  
  // Preload critical CSS
  preloadStyle('assets/css/index.css');
  
  // Preload critical JavaScript chunks
  preloadScript('assets/js/react-vendor.js');
  preloadScript('assets/js/ui-vendor.js');
};

export const preloadRouteAssets = (route: string): void => {
  if (isDev) return;

  switch (route) {
    case '/':
      preloadImage('assets/images/portfolio/portfolio-1.png');
      break;
    case '/about':
      preloadImage('assets/images/portfolio/portfolio-2.png');
      break;
    case '/portfolio':
      // Preload first few portfolio images
      preloadImage('assets/images/portfolio/portfolio-1.png');
      preloadImage('assets/images/portfolio/portfolio-2.png');
      break;
    case '/certificates':
      // Preload certificate images
      preloadImage('assets/images/certificate/masterclass-certificate.png');
      break;
    default:
      break;
  }
};
