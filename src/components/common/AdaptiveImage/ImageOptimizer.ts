import sharp from 'sharp';

interface OptimizeImageOptions {
  quality?: number;
  width?: number;
  height?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
}

export async function optimizeImage(
  input: Buffer,
  options: OptimizeImageOptions = {}
): Promise<Buffer> {
  const {
    quality = 80,
    width,
    height,
    format = 'webp'
  } = options;

  let pipeline = sharp(input);

  // Resize if dimensions provided
  if (width || height) {
    pipeline = pipeline.resize(width, height, {
      fit: 'cover',
      withoutEnlargement: true
    });
  }

  // Format-specific optimization
  switch (format) {
    case 'webp':
      pipeline = pipeline.webp({ quality });
      break;
    case 'avif':
      pipeline = pipeline.avif({ quality });
      break;
    case 'jpeg':
      pipeline = pipeline.jpeg({ quality });
      break;
    case 'png':
      pipeline = pipeline.png({ quality });
      break;
  }

  // General optimizations
  pipeline = pipeline
    .rotate() // Auto-rotate based on EXIF
    .withMetadata(false); // Strip metadata

  return pipeline.toBuffer();
}

export async function generateResponsiveImages(
  input: Buffer,
  breakpoints: number[] = [320, 640, 960, 1280, 1920]
): Promise<Map<number, Buffer>> {
  const results = new Map<number, Buffer>();

  for (const width of breakpoints) {
    const optimized = await optimizeImage(input, {
      width,
      format: 'webp',
      quality: 80
    });
    results.set(width, optimized);
  }

  return results;
}

export async function generateImageFormats(
  input: Buffer,
  width?: number
): Promise<Map<string, Buffer>> {
  const formats = ['webp', 'avif', 'jpeg'] as const;
  const results = new Map<string, Buffer>();

  for (const format of formats) {
    const optimized = await optimizeImage(input, {
      width,
      format,
      quality: format === 'avif' ? 70 : 80
    });
    results.set(format, optimized);
  }

  return results;
}
