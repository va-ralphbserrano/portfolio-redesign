import { describe, it, expect } from 'vitest';
import { imageOptimizer } from './imageOptimizer';

describe('imageOptimizer', () => {
  describe('optimizeImage', () => {
    it('generates correct default optimization', () => {
      const result = imageOptimizer.optimizeImage('/test-image.jpg');
      
      expect(result.src).toContain('w=768');
      expect(result.src).toContain('q=75');
      expect(result.srcSet).toContain('320w');
      expect(result.srcSet).toContain('1536w');
      expect(result.sizes).toBe('(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw');
    });

    it('generates WebP format when specified', () => {
      const result = imageOptimizer.optimizeImage('/test-image.jpg', { format: 'webp' });
      
      expect(result.webpSrcSet).toBeDefined();
      expect(result.webpSrcSet).toContain('fm=webp');
      expect(result.src).toContain('fm=webp');
    });

    it('respects custom quality settings', () => {
      const result = imageOptimizer.optimizeImage('/test-image.jpg', { quality: 90 });
      
      expect(result.src).toContain('q=90');
      expect(result.srcSet).toContain('q=90');
    });

    it('handles custom dimensions', () => {
      const result = imageOptimizer.optimizeImage('/test-image.jpg', {
        width: 800,
        height: 600
      });
      
      expect(result.width).toBe(800);
      expect(result.height).toBe(600);
      expect(result.src).toContain('w=800');
    });
  });

  describe('generateBlurDataURL', () => {
    it('generates valid SVG data URL', () => {
      const result = imageOptimizer.generateBlurDataURL(8, 8);
      
      // Check if it's a valid base64 data URL
      expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
      
      // Decode base64 and check SVG content
      const svgContent = atob(result.split(',')[1]);
      expect(svgContent).toContain('feGaussianBlur');
    });

    it('respects custom dimensions', () => {
      const result = imageOptimizer.generateBlurDataURL(16, 16);
      
      // Decode base64 and check SVG content
      const svgContent = atob(result.split(',')[1]);
      expect(svgContent).toContain('width="16"');
      expect(svgContent).toContain('height="16"');
    });
  });

  describe('calculateImageDimensions', () => {
    it('maintains original dimensions when no target specified', () => {
      const result = imageOptimizer.calculateImageDimensions(800, 600);
      
      expect(result.width).toBe(800);
      expect(result.height).toBe(600);
    });

    it('calculates height from target width', () => {
      const result = imageOptimizer.calculateImageDimensions(800, 600, 400);
      
      expect(result.width).toBe(400);
      expect(result.height).toBe(300);
    });

    it('calculates width from target height', () => {
      const result = imageOptimizer.calculateImageDimensions(800, 600, undefined, 300);
      
      expect(result.width).toBe(400);
      expect(result.height).toBe(300);
    });

    it('uses provided dimensions when both specified', () => {
      const result = imageOptimizer.calculateImageDimensions(800, 600, 400, 400);
      
      expect(result.width).toBe(400);
      expect(result.height).toBe(400);
    });
  });
});
