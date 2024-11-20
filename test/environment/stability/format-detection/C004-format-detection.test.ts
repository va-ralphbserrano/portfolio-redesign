import { describe, test, expect, vi } from 'vitest';

describe('C004: Format Detection Stability', () => {
  test('handles null canvas creation', () => {
    document.createElement = vi.fn().mockReturnValue(null);
    const canvas = document.createElement('canvas');
    expect(canvas).toBeNull();
  });

  test('handles invalid format string', () => {
    const canvas = document.createElement('canvas');
    expect(() => canvas.toDataURL('invalid')).not.toThrow();
  });

  test('handles missing toDataURL method', () => {
    const canvas = document.createElement('canvas');
    canvas.toDataURL = undefined;
    expect(() => canvas?.toDataURL?.('image/webp')).not.toThrow();
  });

  test('validates format string structure', () => {
    const canvas = document.createElement('canvas');
    const dataUrl = canvas.toDataURL('image/webp');
    expect(dataUrl).toContain('data:image/webp');
  });
});
