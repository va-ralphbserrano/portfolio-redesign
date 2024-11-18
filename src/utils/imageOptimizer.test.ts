import { describe, it, expect } from 'vitest';
import { optimizeImage, generateBlurDataURL } from './imageOptimizer';

describe('imageOptimizer', () => {
  describe('optimizeImage', () => {
    it('returns optimized image URL with default options', () => {
      const result = optimizeImage('/test.jpg');
      expect(result).toMatch(/^\/test\.jpg\?/);
    });

    it('handles width and height options', () => {
      const result = optimizeImage('/test.jpg', { width: 100, height: 100 });
      expect(result).toMatch(/width=100/);
      expect(result).toMatch(/height=100/);
    });

    it('handles quality option', () => {
      const result = optimizeImage('/test.jpg', { quality: 75 });
      expect(result).toMatch(/quality=75/);
    });

    it('handles absolute URLs', () => {
      const result = optimizeImage('https://example.com/test.jpg');
      expect(result).toMatch(/^https:\/\/example\.com\/test\.jpg\?/);
    });

    it('handles relative URLs', () => {
      const result = optimizeImage('./test.jpg');
      expect(result).toMatch(/^\.\/test\.jpg\?/);
    });

    it('handles URLs with existing query parameters', () => {
      const result = optimizeImage('/test.jpg?v=1');
      expect(result).toMatch(/^\/test\.jpg\?v=1&/);
    });
  });

  describe('generateBlurDataURL', () => {
    it('returns a data URL for blur placeholder', () => {
      const result = generateBlurDataURL('/test.jpg');
      expect(result).toMatch(/^data:image\/jpeg;base64,/);
    });

    it('handles different image formats', () => {
      const jpegResult = generateBlurDataURL('/test.jpg');
      expect(jpegResult).toMatch(/^data:image\/jpeg;base64,/);

      const pngResult = generateBlurDataURL('/test.png');
      expect(pngResult).toMatch(/^data:image\/png;base64,/);

      const webpResult = generateBlurDataURL('/test.webp');
      expect(webpResult).toMatch(/^data:image\/webp;base64,/);
    });

    it('returns a consistent blur hash for the same image', () => {
      const result1 = generateBlurDataURL('/test.jpg');
      const result2 = generateBlurDataURL('/test.jpg');
      expect(result1).toBe(result2);
    });

    it('returns different blur hashes for different images', () => {
      const result1 = generateBlurDataURL('/test1.jpg');
      const result2 = generateBlurDataURL('/test2.jpg');
      expect(result1).not.toBe(result2);
    });
  });
});
