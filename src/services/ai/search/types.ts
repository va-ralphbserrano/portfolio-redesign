import { AIResponse } from '../types';

/**
 * Search index types
 */
export interface SearchIndex {
  projects: ProjectEmbedding[];
  skills: SkillEmbedding[];
  content: ContentEmbedding[];
}

export interface Embedding {
  id: string;
  vector: number[];
  metadata: Record<string, unknown>;
  lastUpdated: Date;
}

export interface ProjectEmbedding extends Embedding {
  title: string;
  description: string;
  technologies: string[];
  category: string;
}

export interface SkillEmbedding extends Embedding {
  name: string;
  category: string;
  proficiency: number;
  relatedProjects: string[];
}

export interface ContentEmbedding extends Embedding {
  type: 'blog' | 'project' | 'about' | 'experience';
  title: string;
  summary: string;
  tags: string[];
}

/**
 * Search query types
 */
export interface SearchQuery {
  text: string;
  filters?: {
    technologies?: string[];
    category?: string;
    timeframe?: string;
  };
  language?: string;
  limit?: number;
}

export interface SearchResultItem {
  id: string;
  type: 'project' | 'skill' | 'content';
  title: string;
  description: string;
  relevanceScore: number;
  highlights: string[];
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

export type SearchResponse = AIResponse<SearchResult>;

/**
 * Navigation types
 */
export interface NavigationSuggestion {
  path: string;
  title: string;
  confidence: number;
  reason: string;
  metadata: {
    category: string;
    relevance: number;
    userIntent: string;
  };
}

export interface NavigationContext {
  currentPath: string;
  previousPaths: string[];
  userPreferences?: {
    preferredCategories?: string[];
    interests?: string[];
    viewHistory?: string[];
  };
}

export interface NavigationRequest {
  context: NavigationContext;
  limit?: number;
  excludePaths?: string[];
}

export type NavigationResponse = AIResponse<{
  suggestions: NavigationSuggestion[];
  metadata: {
    processingTime: number;
    confidence: number;
    userIntent: string;
  };
}>;

/**
 * Index management types
 */
export interface IndexStats {
  totalDocuments: number;
  lastUpdated: Date;
  categories: Record<string, number>;
  averageVectorSize: number;
  memoryUsage: number;
}

export interface IndexUpdateOptions {
  force?: boolean;
  types?: Array<'projects' | 'skills' | 'content'>;
  concurrency?: number;
}

export interface IndexUpdateResult {
  updatedDocuments: number;
  failedDocuments: number;
  processingTime: number;
  errors?: Error[];
}
