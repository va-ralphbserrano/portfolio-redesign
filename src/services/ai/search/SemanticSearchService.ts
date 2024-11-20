import { AIService, AIResponse, ErrorResponse } from '../base/AIService';
import * as tf from '@tensorflow/tfjs';
import { ErrorReportingService } from '../../ErrorReportingService';
import { MonitoringService } from '../../MonitoringService';

/**
 * Service for semantic search functionality
 */
export class SemanticSearchService extends AIService {
  private index: SearchIndex;
  private indexStats: IndexStats;
  private readonly modelName = 'text-embedding-ada-002';
  private readonly vectorDimension = 1536;
  private readonly similarityThreshold = 0.7;

  constructor(config: any) {
    super(config);
    this.index = this.initializeIndex();
    this.indexStats = this.initializeStats();
  }

  /**
   * Perform semantic search based on query
   */
  protected async search(query: SearchQuery, options: SearchOptions = {}): Promise<SearchResponse> {
    const limit = options.limit || 10;
    const offset = options.offset || 0;
    
    try {
      // Generate query embedding
      const queryEmbedding = await this.generateEmbedding(query.query);
      
      // Search across all index types
      const results = await Promise.all([
        this.searchProjects(queryEmbedding, query),
        this.searchSkills(queryEmbedding, query),
        this.searchContent(queryEmbedding, query),
      ]);

      // Merge and rank results
      const mergedResults = this.mergeResults(results, limit);

      const processingTime = performance.now() - performance.now();

      return {
        items: mergedResults,
        totalResults: mergedResults.length,
        processingTime,
        relevanceScores: mergedResults.map(r => r.score),
        queryVector: queryEmbedding,
      };
    } catch (error) {
      this.handleError(error as Error | ErrorResponse);
      throw error;
    }
  }

  /**
   * Generate embedding for text using OpenAI API
   */
  private async generateEmbedding(text: string): Promise<number[]> {
    const response = await this.makeRequest<{ embedding: number[] }>(
      '/embeddings',
      {
        input: text,
        model: this.modelName,
      }
    );

    return response.data.embedding;
  }

  /**
   * Calculate cosine similarity between vectors
   */
  private calculateSimilarity(vec1: number[], vec2: number[]): number {
    const tensor1 = tf.tensor1d(vec1);
    const tensor2 = tf.tensor1d(vec2);

    const similarity = tf.losses.cosineDistance(tensor1, tensor2);
    const value = similarity.dataSync()[0];

    // Clean up tensors
    tensor1.dispose();
    tensor2.dispose();
    similarity.dispose();

    return value; // Return distance instead of similarity
  }

  /**
   * Search through project embeddings
   */
  private async searchProjects(queryVector: number[], query: SearchQuery) {
    return this.index.projects
      .map(project => ({
        id: project.id,
        type: 'project' as const,
        title: project.title,
        description: project.description,
        score: this.calculateSimilarity(queryVector, project.vector),
        metadata: project.metadata,
      }))
      .filter(result => 
        result.score < this.similarityThreshold &&
        this.applyFilters(result, query.filters)
      );
  }

  /**
   * Search through skill embeddings
   */
  private async searchSkills(queryVector: number[], query: SearchQuery) {
    return this.index.skills
      .map(skill => ({
        id: skill.id,
        type: 'skill' as const,
        title: skill.name,
        description: `${skill.category} - Proficiency: ${skill.proficiency}`,
        score: this.calculateSimilarity(queryVector, skill.vector),
        metadata: skill.metadata,
      }))
      .filter(result => 
        result.score < this.similarityThreshold &&
        this.applyFilters(result, query.filters)
      );
  }

  /**
   * Search through content embeddings
   */
  private async searchContent(queryVector: number[], query: SearchQuery) {
    return this.index.content
      .map(content => ({
        id: content.id,
        type: 'content' as const,
        title: content.title,
        description: content.summary,
        score: this.calculateSimilarity(queryVector, content.vector),
        metadata: content.metadata,
      }))
      .filter(result => 
        result.score < this.similarityThreshold &&
        this.applyFilters(result, query.filters)
      );
  }

  /**
   * Apply search filters
   */
  private applyFilters(result: any, filters?: SearchQuery['filters']): boolean {
    if (!filters) return true;

    const metadata = result.metadata as Record<string, any>;

    if (filters.technologies && metadata.technologies) {
      const hasMatchingTech = filters.technologies.some(tech =>
        metadata.technologies.includes(tech)
      );
      if (!hasMatchingTech) return false;
    }

    if (filters.category && metadata.category) {
      if (metadata.category !== filters.category) return false;
    }

    if (filters.timeframe && metadata.date) {
      // Implement timeframe filtering logic
      return true;
    }

    return true;
  }

  /**
   * Generate search result highlights
   */
  private generateHighlights(text: string, query: string): string[] {
    const sentences = text.split(/[.!?]+/);
    const queryWords = new Set(query.toLowerCase().split(/\s+/));

    return sentences
      .filter(sentence => {
        const words = sentence.toLowerCase().split(/\s+/);
        return words.some(word => queryWords.has(word));
      })
      .map(sentence => sentence.trim());
  }

  /**
   * Merge and rank results from different indices
   */
  private mergeResults(results: any[], limit = 10) {
    return results
      .flat()
      .sort((a, b) => a.score - b.score)
      .slice(0, limit);
  }

  /**
   * Initialize empty search index
   */
  private initializeIndex(): SearchIndex {
    return {
      projects: [],
      skills: [],
      content: [],
    };
  }

  /**
   * Initialize index statistics
   */
  private initializeStats(): IndexStats {
    return {
      totalDocuments: 0,
      lastUpdated: new Date(),
      categories: {},
      averageVectorSize: this.vectorDimension,
      memoryUsage: 0,
    };
  }

  /**
   * Calculate tokens for usage tracking
   */
  private calculateTokens(text: string): number {
    // Approximate token count: 1 token ≈ 4 characters
    return Math.ceil(text.length / 4);
  }

  /**
   * Update search index
   */
  async updateIndex(options: IndexUpdateOptions = {}): Promise<IndexUpdateResult> {
    const startTime = performance.now();
    const result: IndexUpdateResult = {
      updatedDocuments: 0,
      failedDocuments: 0,
      processingTime: 0,
      errors: [],
    };

    try {
      // Implement index update logic
      result.processingTime = performance.now() - startTime;
      return result;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get index statistics
   */
  getIndexStats(): IndexStats {
    return this.indexStats;
  }
}

export interface SearchQuery {
  query: string;
  filters?: Record<string, unknown>;
  limit?: number;
  offset?: number;
}

export interface SearchResultItem {
  id: string;
  type: string;
  title: string;
  description: string;
  score: number;
  metadata?: Record<string, unknown>;
}

export interface SearchResponse {
  items: SearchResultItem[];
  totalResults: number;
  processingTime: number;
  relevanceScores: number[];
  queryVector?: number[];
}

export interface Embedding {
  vector: number[];
  metadata: Record<string, unknown>;
}

export interface SearchIndex {
  projects: {
    id: string;
    title: string;
    description: string;
    vector: number[];
    metadata: Record<string, unknown>;
  }[];
  skills: {
    id: string;
    name: string;
    category: string;
    proficiency: string;
    vector: number[];
    metadata: Record<string, unknown>;
  }[];
  content: {
    id: string;
    title: string;
    summary: string;
    vector: number[];
    metadata: Record<string, unknown>;
  }[];
}

export interface IndexStats {
  totalDocuments: number;
  lastUpdated: Date;
  categories: Record<string, number>;
  averageVectorSize: number;
  memoryUsage: number;
}

export interface IndexUpdateOptions {
  // Add options for index update
}

export interface IndexUpdateResult {
  updatedDocuments: number;
  failedDocuments: number;
  processingTime: number;
  errors: ErrorResponse[];
}
