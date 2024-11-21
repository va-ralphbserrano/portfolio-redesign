export interface AIRequestOptions {
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

export interface AIResponse<T> {
  data: T;
  metadata: {
    model: string;
    version: string;
    timestamp: number;
  };
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  latency: number;
}

export interface SearchResultItem {
  id: string;
  type: string;
  title: string;
  description: string;
  content: string;
  score: number;
}

export interface SearchMetadata {
  totalResults: number;
  processingTime: number;
  relevanceScores: number[];
  queryVector?: number[];
}

export interface SearchResponse {
  results: SearchResultItem[];
  metadata: SearchMetadata;
}

export interface ErrorResponse {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

export interface ErrorWithMessage {
  message: string;
}
