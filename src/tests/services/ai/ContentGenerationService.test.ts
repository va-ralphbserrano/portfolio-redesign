import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ContentGenerationService } from '../../../services/ai/content/ContentGenerationService';
import { ContentGenerationRequest, AIResponse } from '../../../services/ai/types';

describe('ContentGenerationService', () => {
  let service: ContentGenerationService;
  
  beforeEach(() => {
    service = new ContentGenerationService({
      apiKey: 'test-key',
      endpoint: 'https://api.test.com',
      maxRetries: 3,
      timeout: 5000,
    });
  });

  describe('generateContent', () => {
    it('should generate project description content', async () => {
      const request: ContentGenerationRequest = {
        type: 'project_description',
        context: {
          projectName: 'Portfolio Redesign',
          techStack: ['React', 'TypeScript', 'AI'],
          targetAudience: 'developers',
          tone: 'professional',
        },
      };

      const mockResponse: AIResponse<any> = {
        data: {
          content: 'Generated project description',
          metadata: {
            wordCount: 100,
            readingTime: 1,
            seoScore: 85,
          },
        },
        usage: {
          promptTokens: 50,
          completionTokens: 100,
          totalTokens: 150,
        },
        latency: 500,
      };

      // Mock the makeRequest method
      vi.spyOn(service as any, 'makeRequest').mockResolvedValue(mockResponse);

      const result = await service.generateContent(request);

      expect(result).toEqual(mockResponse);
      expect(service['makeRequest']).toHaveBeenCalledWith(
        '/generate',
        expect.objectContaining({
          type: 'project_description',
          context: request.context,
        }),
        expect.any(Object)
      );
    });

    it('should handle errors gracefully', async () => {
      const request: ContentGenerationRequest = {
        type: 'project_description',
        context: {
          projectName: 'Test Project',
        },
      };

      // Mock an API error
      vi.spyOn(service as any, 'makeRequest').mockRejectedValue(
        new Error('API Error')
      );

      await expect(service.generateContent(request)).rejects.toThrow('API Error');
    });
  });

  describe('analyzeContent', () => {
    it('should analyze content and return suggestions', async () => {
      const content = 'Test content for analysis';
      const mockResponse: AIResponse<any> = {
        data: {
          suggestions: ['Improve clarity', 'Add more details'],
          metrics: {
            clarity: 0.8,
            engagement: 0.7,
            technicalAccuracy: 0.9,
          },
        },
        usage: {
          promptTokens: 20,
          completionTokens: 50,
          totalTokens: 70,
        },
        latency: 300,
      };

      vi.spyOn(service as any, 'makeRequest').mockResolvedValue(mockResponse);

      const result = await service.analyzeContent(content);

      expect(result).toEqual(mockResponse);
      expect(service['makeRequest']).toHaveBeenCalledWith(
        '/analyze',
        { content },
        expect.any(Object)
      );
    });
  });

  describe('optimizeContent', () => {
    it('should optimize content for specific platform', async () => {
      const content = 'Test content for optimization';
      const target = 'github';
      const mockResponse: AIResponse<any> = {
        data: {
          optimizedContent: 'Optimized content for GitHub',
          changes: ['Added markdown formatting', 'Improved code blocks'],
        },
        usage: {
          promptTokens: 30,
          completionTokens: 60,
          totalTokens: 90,
        },
        latency: 400,
      };

      vi.spyOn(service as any, 'makeRequest').mockResolvedValue(mockResponse);

      const result = await service.optimizeContent(content, target);

      expect(result).toEqual(mockResponse);
      expect(service['makeRequest']).toHaveBeenCalledWith(
        '/optimize',
        { content, target },
        expect.any(Object)
      );
    });
  });

  describe('error handling', () => {
    it('should handle rate limiting', async () => {
      const request: ContentGenerationRequest = {
        type: 'project_description',
        context: {
          projectName: 'Test Project',
        },
      };

      // Mock rate limit error
      vi.spyOn(service as any, 'makeRequest').mockRejectedValue({
        error: {
          message: 'Rate limit exceeded',
          code: 'rate_limit_error',
          type: 'rate_limit',
        },
      });

      await expect(service.generateContent(request)).rejects.toThrow(
        'AI Service Error (rate_limit:rate_limit_error): Rate limit exceeded'
      );
    });

    it('should retry failed requests', async () => {
      const content = 'Test content';
      const mockResponse: AIResponse<any> = {
        data: {
          suggestions: ['Test suggestion'],
          metrics: { clarity: 0.8, engagement: 0.7, technicalAccuracy: 0.9 },
        },
        usage: { promptTokens: 10, completionTokens: 20, totalTokens: 30 },
        latency: 200,
      };

      const makeRequest = vi.spyOn(service as any, 'makeRequest');
      makeRequest
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce(mockResponse);

      const result = await service.analyzeContent(content);

      expect(result).toEqual(mockResponse);
      expect(makeRequest).toHaveBeenCalledTimes(2);
    });
  });
});
