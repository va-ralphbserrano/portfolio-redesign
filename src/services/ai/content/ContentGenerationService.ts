import { AIService, AIResponse, AIRequestOptions } from '../base/AIService';

export interface GeneratedContent {
  content: string;
  metadata: {
    wordCount: number;
    readingTime: number;
    seoScore: number;
  };
}

export interface ContentSuggestions {
  suggestions: string[];
  metrics: {
    clarity: number;
    engagement: number;
    technicalAccuracy: number;
  };
}

export interface OptimizedContent {
  optimizedContent: string;
  changes: string[];
}

export interface ContentGenerationRequest {
  prompt: string;
  context?: string;
  format?: string;
  maxLength?: number;
  temperature?: number;
}

/**
 * Service for AI-powered content generation
 */
export class ContentGenerationService extends AIService {
  private static instance: ContentGenerationService;

  /**
   * Constructor for ContentGenerationService
   */
  private constructor() {
    super({
      baseUrl: process.env.CONTENT_API_URL || 'https://api.content.ai',
      defaultModel: 'gpt-4'
    });
  }

  /**
   * Get the instance of ContentGenerationService
   */
  public static getInstance(): ContentGenerationService {
    if (!ContentGenerationService.instance) {
      ContentGenerationService.instance = new ContentGenerationService();
    }
    return ContentGenerationService.instance;
  }

  /**
   * Generate content based on the request
   */
  public async generateContent(request: ContentGenerationRequest): Promise<AIResponse<GeneratedContent>> {
    const response = await this.makeRequest<GeneratedContent>(
      '/generate',
      {
        ...request,
        maxTokens: request.maxLength ? request.maxLength * 1.5 : 2000
      },
      {
        model: 'gpt-4',
        headers: {
          'X-Content-Type': request.format || 'text/plain'
        }
      }
    );

    return response;
  }

  /**
   * Get content suggestions
   */
  public async getSuggestions(content: string): Promise<AIResponse<ContentSuggestions>> {
    const response = await this.makeRequest<ContentSuggestions>(
      '/suggest',
      {
        content,
        numSuggestions: 3
      },
      {
        model: 'gpt-4',
        headers: {
          'X-Analysis-Type': 'content-suggestions'
        }
      }
    );

    return response;
  }

  /**
   * Optimize content
   */
  public async optimizeContent(content: string, goals: string[]): Promise<AIResponse<OptimizedContent>> {
    const response = await this.makeRequest<OptimizedContent>(
      '/optimize',
      {
        content,
        goals,
        format: 'markdown'
      },
      {
        model: 'gpt-4',
        headers: {
          'X-Optimization-Type': 'content'
        }
      }
    );

    return response;
  }
}
