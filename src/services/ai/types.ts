/**
 * Common types for AI services
 */

export interface AIServiceConfig {
  apiKey: string;
  endpoint: string;
  maxRetries: number;
  timeout: number;
}

export interface AIRequestOptions {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}

export interface AIResponse<T> {
  data: T;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  latency: number;
}

export interface ErrorResponse {
  error: {
    message: string;
    code: string;
    type: 'api_error' | 'rate_limit' | 'invalid_request' | 'server_error';
  };
}

// Content Generation Types
export interface ContentGenerationRequest {
  type: 'project_description' | 'technical_writing' | 'seo_content';
  context: {
    projectName?: string;
    techStack?: string[];
    targetAudience?: string;
    tone?: 'technical' | 'casual' | 'professional';
  };
  language?: string;
  maxLength?: number;
}

// Search Types
export interface SearchRequest {
  query: string;
  filters?: {
    technologies?: string[];
    category?: string;
    timeframe?: string;
  };
  limit?: number;
}

// Analytics Types
export interface InteractionEvent {
  type: 'view' | 'click' | 'scroll' | 'hover';
  element: string;
  duration?: number;
  metadata?: Record<string, unknown>;
  timestamp: number;
}

// Project Showcase Types
export interface ShowcaseEnhancement {
  projectId: string;
  enhancements: {
    techStackVisualization?: boolean;
    codeSnippets?: boolean;
    githubStats?: boolean;
    liveDemo?: boolean;
  };
}
