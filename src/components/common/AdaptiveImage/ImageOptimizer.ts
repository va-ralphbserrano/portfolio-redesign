import sharp from 'sharp';

interface OptimizeImageOptions {
  width: number;
  quality: number;
  format: 'webp' | 'avif' | 'jpeg' | 'png';
  height?: number;
}

export async function optimizeImage(
  input: Buffer,
  options: Required<Pick<OptimizeImageOptions, 'width' | 'quality' | 'format'>> & Partial<Pick<OptimizeImageOptions, 'height'>>
): Promise<Buffer> {
  const {
    quality,
    width,
    height,
    format
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
    .withMetadata({ exif: {} }); // Preserve minimal metadata

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
  width: number | undefined = undefined
): Promise<Map<string, Buffer>> {
  const formats = ['webp', 'avif', 'jpeg'] as const;
  const results = new Map<string, Buffer>();

  for (const format of formats) {
    const optimized = await optimizeImage(input, {
      width: width || undefined,
      format,
      quality: format === 'avif' ? 70 : 80
    });
    results.set(format, optimized);
  }

  return results;
}

export class ImageOptimizer {
  async optimize(
    input: string | Buffer,
    options: OptimizeImageOptions
  ): Promise<string> {
    try {
      // If input is a URL or path, fetch it first
      let buffer: Buffer;
      if (typeof input === 'string') {
        const response = await fetch(input);
        buffer = Buffer.from(await response.arrayBuffer());
      } else {
        buffer = input;
      }

      // Optimize the image
      const optimizedBuffer = await optimizeImage(buffer, options);

      // Convert to base64 data URL
      const format = options.format;
      const base64 = optimizedBuffer.toString('base64');
      return `data:image/${format};base64,${base64}`;
    } catch (error) {
      throw new Error(`Failed to optimize image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
