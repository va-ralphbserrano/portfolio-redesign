import { AIServiceConfig, AIRequestOptions, AIResponse, ErrorResponse } from '../types';

/**
 * Base class for AI services with common functionality
 */
export abstract class AIService {
  protected config: AIServiceConfig;
  private rateLimiter: Map<string, number>;
  private cache: Map<string, { data: any; timestamp: number }>;

  constructor(config: AIServiceConfig) {
    this.config = config;
    this.rateLimiter = new Map();
    this.cache = new Map();
  }

  /**
   * Make an API request with retry logic and error handling
   */
  protected async makeRequest<T>(
    endpoint: string,
    payload: unknown,
    options?: AIRequestOptions
  ): Promise<AIResponse<T>> {
    const startTime = performance.now();
    
    try {
      await this.checkRateLimit(endpoint);
      
      const cachedResponse = this.getFromCache<T>(endpoint, payload);
      if (cachedResponse) {
        return {
          ...cachedResponse,
          latency: 0, // Cached response
        };
      }

      const response = await this.executeWithRetry<T>(endpoint, payload, options);
      const latency = performance.now() - startTime;

      const aiResponse: AIResponse<T> = {
        ...response,
        latency,
      };

      this.addToCache(endpoint, payload, aiResponse);
      return aiResponse;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Implement retry logic with exponential backoff
   */
  private async executeWithRetry<T>(
    endpoint: string,
    payload: unknown,
    options?: AIRequestOptions,
    attempt = 1
  ): Promise<any> {
    try {
      const response = await fetch(`${this.config.endpoint}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({ ...payload, ...options }),
      });

      if (!response.ok) {
        const error = await response.json() as ErrorResponse;
        throw error;
      }

      return await response.json();
    } catch (error) {
      if (attempt < this.config.maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.executeWithRetry(endpoint, payload, options, attempt + 1);
      }
      throw error;
    }
  }

  /**
   * Implement rate limiting
   */
  private async checkRateLimit(endpoint: string): Promise<void> {
    const now = Date.now();
    const lastRequest = this.rateLimiter.get(endpoint) || 0;
    const minInterval = 1000; // 1 request per second per endpoint

    if (now - lastRequest < minInterval) {
      await new Promise(resolve => setTimeout(resolve, minInterval - (now - lastRequest)));
    }

    this.rateLimiter.set(endpoint, now);
  }

  /**
   * Implement caching
   */
  private getFromCache<T>(endpoint: string, payload: unknown): AIResponse<T> | null {
    const cacheKey = this.getCacheKey(endpoint, payload);
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) { // 5 minute cache
      return cached.data;
    }
    
    return null;
  }

  private addToCache(endpoint: string, payload: unknown, response: AIResponse<any>): void {
    const cacheKey = this.getCacheKey(endpoint, payload);
    this.cache.set(cacheKey, {
      data: response,
      timestamp: Date.now(),
    });
  }

  private getCacheKey(endpoint: string, payload: unknown): string {
    return `${endpoint}:${JSON.stringify(payload)}`;
  }

  /**
   * Error handling
   */
  private handleError(error: any): Error {
    if ((error as ErrorResponse).error) {
      const { message, code, type } = (error as ErrorResponse).error;
      return new Error(`AI Service Error (${type}:${code}): ${message}`);
    }
    return new Error(`AI Service Error: ${error.message || 'Unknown error'}`);
  }
}
