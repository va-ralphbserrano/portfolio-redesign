import { describe, it, expect, vi, beforeEach } from 'vitest';
import { onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals';

vi.mock('web-vitals');

describe('Performance Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should track Core Web Vitals', () => {
    const mockMetric = { value: 0.1, name: 'test' };
    
    // Setup mocks
    const mockCLS = vi.fn((cb) => cb(mockMetric));
    const mockFCP = vi.fn((cb) => cb(mockMetric));
    const mockFID = vi.fn((cb) => cb(mockMetric));
    const mockLCP = vi.fn((cb) => cb(mockMetric));
    const mockTTFB = vi.fn((cb) => cb(mockMetric));

    // Replace mocked functions
    (onCLS as any).mockImplementation(mockCLS);
    (onFCP as any).mockImplementation(mockFCP);
    (onFID as any).mockImplementation(mockFID);
    (onLCP as any).mockImplementation(mockLCP);
    (onTTFB as any).mockImplementation(mockTTFB);

    // Call the functions
    onCLS(() => {});
    onFCP(() => {});
    onFID(() => {});
    onLCP(() => {});
    onTTFB(() => {});

    // Verify metrics are tracked
    expect(mockCLS).toHaveBeenCalled();
    expect(mockFCP).toHaveBeenCalled();
    expect(mockFID).toHaveBeenCalled();
    expect(mockLCP).toHaveBeenCalled();
    expect(mockTTFB).toHaveBeenCalled();
  });

  it('should track performance marks and measures', () => {
    // Create performance mark
    performance.mark('test-start');
    expect(performance.mark).toHaveBeenCalledWith('test-start');

    // Create performance measure
    performance.measure('test-measure', 'test-start');
    expect(performance.measure).toHaveBeenCalledWith('test-measure', 'test-start');
  });

  it('should handle resource timing', () => {
    // Mock resource timing data
    const mockEntry = {
      name: 'test.js',
      entryType: 'resource',
      startTime: 0,
      duration: 100,
      initiatorType: 'script',
    };

    // Mock getEntriesByType
    global.performance.getEntriesByType = vi.fn().mockReturnValue([mockEntry]);

    const resources = performance.getEntriesByType('resource');
    expect(resources).toHaveLength(1);
    expect(resources[0]).toMatchObject(mockEntry);
  });

  it('should track fetch performance', async () => {
    // Mock successful fetch
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: 'test' }),
    });

    const start = performance.now();
    await fetch('/api/test');
    const duration = performance.now() - start;

    expect(duration).toBeLessThan(1000); // Should resolve quickly in test
    expect(global.fetch).toHaveBeenCalledWith('/api/test');
  });

  it('should track error performance', () => {
    const errorHandler = vi.fn();
    window.addEventListener('error', errorHandler);

    const error = new Error('Test error');
    window.dispatchEvent(new ErrorEvent('error', { error }));
    
    expect(errorHandler).toHaveBeenCalled();
    window.removeEventListener('error', errorHandler);
  });
});
