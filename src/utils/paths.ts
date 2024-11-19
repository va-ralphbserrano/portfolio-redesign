// Base path for GitHub Pages deployment
export const BASE_PATH = import.meta.env.DEV ? '' : '/va-rb-portfolio';

// Helper function to get full URL for assets
export function getAssetUrl(path: string) {
  // Remove leading slash to avoid double slashes
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE_PATH}/${normalizedPath}`;
}

// Helper function to get full URL for images
export function getImageUrl(path: string) {
  // Remove leading slash to avoid double slashes
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return getAssetUrl(`images/${normalizedPath}`);
}

// Helper function to get full URL for PDFs
export function getPdfUrl(path: string) {
  // Remove leading slash to avoid double slashes
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return getAssetUrl(`pdfs/${normalizedPath}`);
}

// Helper function to get full URL for public assets
export function getPublicUrl(path: string) {
  // Remove leading slash to avoid double slashes
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return getAssetUrl(normalizedPath);
}
