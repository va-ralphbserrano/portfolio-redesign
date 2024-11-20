import { AIService } from '../base/AIService';
import { ContentGenerationRequest, AIResponse } from '../types';

interface GeneratedContent {
  content: string;
  metadata: {
    wordCount: number;
    readingTime: number;
    seoScore: number;
  };
}

/**
 * Service for AI-powered content generation
 */
export class ContentGenerationService extends AIService {
  /**
   * Generate content based on the request type and context
   */
  async generateContent(
    request: ContentGenerationRequest
  ): Promise<AIResponse<GeneratedContent>> {
    const prompt = this.buildPrompt(request);
    
    return this.makeRequest<GeneratedContent>(
      '/generate',
      {
        prompt,
        type: request.type,
        context: request.context,
      },
      {
        temperature: 0.7,
        maxTokens: this.calculateMaxTokens(request.maxLength),
        topP: 0.9,
      }
    );
  }

  /**
   * Build prompt based on request type and context
   */
  private buildPrompt(request: ContentGenerationRequest): string {
    const { type, context } = request;
    const { projectName, techStack, targetAudience, tone } = context;

    switch (type) {
      case 'project_description':
        return `Create a ${tone || 'professional'} project description for ${projectName}. 
                Tech stack: ${techStack?.join(', ')}. 
                Target audience: ${targetAudience || 'developers'}.`;

      case 'technical_writing':
        return `Write a technical explanation about ${projectName} 
                using ${techStack?.join(', ')}. 
                Focus on implementation details and architecture decisions.`;

      case 'seo_content':
        return `Generate SEO-optimized content about ${projectName}. 
                Include keywords related to ${techStack?.join(', ')}. 
                Target audience: ${targetAudience}.`;

      default:
        throw new Error(`Unsupported content type: ${type}`);
    }
  }

  /**
   * Calculate max tokens based on desired content length
   */
  private calculateMaxTokens(maxLength?: number): number {
    if (!maxLength) return 1000; // Default length
    // Approximate tokens: 1 token ≈ 4 characters
    return Math.min(Math.ceil(maxLength / 4), 2000);
  }

  /**
   * Analyze content quality and provide enhancement suggestions
   */
  async analyzeContent(content: string): Promise<AIResponse<{
    suggestions: string[];
    metrics: {
      clarity: number;
      engagement: number;
      technicalAccuracy: number;
    };
  }>> {
    return this.makeRequest(
      '/analyze',
      { content },
      { temperature: 0.3 }
    );
  }

  /**
   * Optimize content for specific platforms or purposes
   */
  async optimizeContent(
    content: string,
    target: 'github' | 'linkedin' | 'portfolio'
  ): Promise<AIResponse<{
    optimizedContent: string;
    changes: string[];
  }>> {
    return this.makeRequest(
      '/optimize',
      { content, target },
      { temperature: 0.5 }
    );
  }
}
