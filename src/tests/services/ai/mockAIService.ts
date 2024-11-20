import { vi } from 'vitest';
import { AIService } from '../../../services/ai/base/AIService';

export class MockAIService extends AIService {
  constructor(config: any) {
    super(config);
  }

  protected async makeRequest<T>(endpoint: string, data: any): Promise<{ data: T }> {
    return {
      data: {} as T,
    };
  }

  protected handleError(error: any): Error {
    return new Error('Mock error');
  }
}

export const mockAIServiceConfig = {
  apiKey: 'test-key',
  endpoint: 'https://api.test.com',
  maxRetries: 3,
  timeout: 5000,
  cacheSize: 100,
};

export const setupMockAIService = () => {
  const mockService = new MockAIService(mockAIServiceConfig);
  vi.spyOn(mockService as any, 'makeRequest');
  vi.spyOn(mockService as any, 'handleError');
  return mockService;
};
