import { describe, it, expect } from 'vitest';
import { optimizeImage, generateBlurDataURL } from './imageOptimizer';

describe('imageOptimizer', () => {
  describe('optimizeImage', () => {
    it('should return empty string for empty input', () => {
      expect(optimizeImage('', { width: 100, height: 100, quality: 75 })).toBe('');
    });

    it('should append width parameter', () => {
      const result = optimizeImage('test.jpg', { width: 100, height: 100, quality: 75 });
      expect(result).toContain('width=100');
    });

    it('should append height parameter', () => {
      const result = optimizeImage('test.jpg', { width: 100, height: 200, quality: 75 });
      expect(result).toContain('height=200');
    });

    it('should append quality parameter', () => {
      const result = optimizeImage('test.jpg', { width: 100, height: 100, quality: 90 });
      expect(result).toContain('quality=90');
    });

    it('should handle URLs with existing query parameters', () => {
      const result = optimizeImage('test.jpg?param=value', { width: 100, height: 100, quality: 75 });
      expect(result).toContain('&width=100');
    });
  });

  describe('generateBlurDataURL', () => {
    it('should return empty string for empty input', async () => {
      expect(await generateBlurDataURL('')).toBe('');
    });

    it('should return base64 data URL', async () => {
      const result = await generateBlurDataURL('test.jpg');
      expect(result).toMatch(/^data:image\/jpeg;base64,/);
    });

    it('should handle different image formats', async () => {
      const result = await generateBlurDataURL('test.png');
      expect(result).toMatch(/^data:image\/png;base64,/);
    });

    it('should use jpeg as default format', async () => {
      const result = await generateBlurDataURL('test');
      expect(result).toMatch(/^data:image\/jpeg;base64,/);
    });
  });
});
