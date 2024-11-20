import { SearchQuery, SearchResponse, SearchResult } from '../../../services/ai/search/types';

export const createMockSearchQuery = (text: string, filters?: Record<string, any>): SearchQuery => ({
  text,
  filters: filters || {},
});

export const createMockSearchResult = (id: string, score: number): SearchResult => ({
  id,
  score,
  content: `Mock content for ${id}`,
  metadata: {
    title: `Mock Title ${id}`,
    category: 'test',
    technologies: ['React', 'TypeScript'],
    lastUpdated: new Date().toISOString(),
  },
  highlights: [`Highlighted content for ${id}`],
});

export const createMockSearchResponse = (items: SearchResult[]): SearchResponse => ({
  data: {
    items,
    metadata: {
      processingTime: 100,
      totalResults: items.length,
      queryTime: new Date().toISOString(),
    },
  },
  usage: {
    totalTokens: 100,
    embeddingTokens: 50,
    searchTokens: 50,
  },
});

export const mockEmbeddingResponse = {
  data: {
    embedding: new Array(1536).fill(0.1),
  },
  usage: {
    totalTokens: 10,
    promptTokens: 5,
    completionTokens: 5,
  },
};

export const mockServiceConfig = {
  apiKey: 'test-key',
  endpoint: 'https://api.test.com',
  maxRetries: 3,
  timeout: 5000,
  cacheSize: 100,
};

export const mockIndexData = {
  projects: [
    {
      id: 'project-1',
      title: 'Test Project 1',
      description: 'A test project using React and TypeScript',
      technologies: ['React', 'TypeScript'],
      category: 'frontend',
    },
    {
      id: 'project-2',
      title: 'Test Project 2',
      description: 'A backend project using Node.js',
      technologies: ['Node.js', 'Express'],
      category: 'backend',
    },
  ],
  skills: [
    {
      id: 'skill-1',
      name: 'React Development',
      category: 'frontend',
      level: 'expert',
    },
    {
      id: 'skill-2',
      name: 'Node.js Development',
      category: 'backend',
      level: 'advanced',
    },
  ],
};

export const calculateCosineSimilarity = (vec1: number[], vec2: number[]): number => {
  if (vec1.length !== vec2.length) {
    throw new Error('Vectors must have the same length');
  }

  const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
  const magnitude1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
  const magnitude2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));

  if (magnitude1 === 0 || magnitude2 === 0) return 0;
  return dotProduct / (magnitude1 * magnitude2);
};

export const mockApiError = new Error('API Error');
mockApiError.name = 'ApiError';
Object.defineProperty(mockApiError, 'status', { value: 429 });

export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
