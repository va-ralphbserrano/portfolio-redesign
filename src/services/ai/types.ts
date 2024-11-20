/**
 * Common types for AI services
 */

export interface AIServiceConfig {
  endpoint: string;
  apiKey: string;
  maxRetries?: number;
  timeout?: number;
}

export interface AIRequestOptions {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  timeout?: number;
}

export interface AIResponse<T> {
  data: T;
  metadata: {
    requestId: string;
    model?: string;
    version?: string;
  };
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  latency: number;
}

export interface ErrorResponse {
  name: string;
  message: string;
  code: string;
  retryable: boolean;
  stack?: string;
  details?: Record<string, unknown>;
}

export interface SearchQuery {
  text: string;
  filters?: Record<string, unknown>;
  limit?: number;
  offset?: number;
}

export interface SearchResultItem {
  id: string;
  type: string;
  title: string;
  description: string;
  content: string;
  metadata: Record<string, unknown>;
}

export interface SearchResult {
  items: SearchResultItem[];
  metadata: {
    totalResults: number;
    processingTime: number;
    relevanceScores: number[];
    queryVector?: number[];
  };
}

export interface SearchIndex {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  lastUpdated: string;
  metadata: Record<string, unknown>;
}

export interface IndexStats {
  totalItems: number;
  totalVectors: number;
  totalBytes: number;
  lastUpdated: string;
  metadata: Record<string, unknown>;
}

export interface IndexUpdateOptions {
  batchSize?: number;
  concurrency?: number;
  timeout?: number;
}

export interface IndexUpdateResult {
  success: boolean;
  itemsProcessed: number;
  itemsFailed: number;
  errors: Error[];
  metadata: Record<string, unknown>;
}

export interface Embedding {
  vector: number[];
  metadata: Record<string, unknown>;
}
