// import sharp from 'sharp';

interface ImageOptimizationOptions {
  width: number;
  height: number;
  quality: number;
}

export function optimizeImage(src: string, options: ImageOptimizationOptions): string {
  if (!src) return '';

  const params = new URLSearchParams();
  
  params.append('width', options.width.toString());
  params.append('height', options.height.toString());
  params.append('quality', options.quality.toString());

  const separator = src.includes('?') ? '&' : '?';
  return `${src}${separator}${params.toString()}`;
}

export async function generateBlurDataURL(src: string): Promise<string> {
  if (!src) return '';

  try {
    // In a real application, this would generate a proper blur hash
    // For now, we'll return a simple base64-encoded placeholder
    const format = src.split('.').pop()?.toLowerCase() || 'jpeg';
    const placeholder = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
    
    return `data:image/${format};base64,${placeholder}`;
  } catch (error) {
    console.error('Error generating blur data URL:', error);
    return '';
  }
}
