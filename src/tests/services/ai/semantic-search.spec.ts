import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SemanticSearchService } from '../../../services/ai/search/SemanticSearchService';

describe('SemanticSearchService', () => {
  let service: SemanticSearchService;
  const mockConfig = {
    apiKey: 'test-key',
    endpoint: 'https://api.test.com'
  };

  beforeEach(() => {
    service = new SemanticSearchService(mockConfig);
  });

  describe('Initialization', () => {
    it('should initialize with config', () => {
      expect(service).toBeInstanceOf(SemanticSearchService);
      expect(service).toBeDefined();
    });

    it('should throw error without config', () => {
      expect(() => new SemanticSearchService(undefined as any)).toThrow();
    });
  });

  describe('Search functionality', () => {
    const mockSearchResults = {
      items: [
        { id: '1', title: 'React project', content: 'React project' },
        { id: '2', title: 'Vue project', content: 'Vue project' }
      ],
      metadata: { total: 2 }
    };

    it('should perform basic search', async () => {
      vi.spyOn(service as any, 'performSearch').mockResolvedValue(mockSearchResults);

      const result = await service.search({ query: 'React' });
      
      expect(result).toBeDefined();
      expect(result.items).toHaveLength(2);
      expect(result.items[0].content).toBe('React project');
    });

    it('should handle search errors', async () => {
      vi.spyOn(service as any, 'performSearch').mockRejectedValue(new Error('Search failed'));

      await expect(service.search({ query: 'React' })).rejects.toThrow('Search failed');
    });

    it('should handle empty query', async () => {
      await expect(service.search({ query: '' })).rejects.toThrow('Query cannot be empty');
    });

    it('should respect search options', async () => {
      const searchSpy = vi.spyOn(service as any, 'performSearch').mockResolvedValue(mockSearchResults);

      await service.search({
        query: 'React',
        limit: 5,
        offset: 10,
        filters: { category: 'web' }
      });

      expect(searchSpy).toHaveBeenCalledWith(expect.objectContaining({
        limit: 5,
        offset: 10,
        filters: { category: 'web' }
      }));
    });
  });

  describe('Error handling', () => {
    it('should handle rate limiting', async () => {
      vi.spyOn(service as any, 'performSearch').mockRejectedValue({
        error: {
          message: 'Rate limit exceeded',
          code: 'rate_limit_error'
        }
      });

      await expect(service.search({ query: 'test' }))
        .rejects.toThrow('Rate limit exceeded');
    });

    it('should handle network errors', async () => {
      vi.spyOn(service as any, 'performSearch').mockRejectedValue(new Error('Network error'));

      await expect(service.search({ query: 'test' }))
        .rejects.toThrow('Network error');
    });
  });
});
