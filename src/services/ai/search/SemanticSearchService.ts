import { AIService } from '../base/AIService';
import {
  SearchQuery,
  SearchResponse,
  SearchIndex,
  IndexStats,
  IndexUpdateOptions,
  IndexUpdateResult,
  Embedding,
} from './types';
import * as tf from '@tensorflow/tfjs';

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
  async search(query: SearchQuery): Promise<SearchResponse> {
    const startTime = performance.now();

    try {
      // Generate query embedding
      const queryEmbedding = await this.generateEmbedding(query.text);
      
      // Search across all index types
      const results = await Promise.all([
        this.searchProjects(queryEmbedding, query),
        this.searchSkills(queryEmbedding, query),
        this.searchContent(queryEmbedding, query),
      ]);

      // Merge and rank results
      const mergedResults = this.mergeResults(results, query.limit);

      const processingTime = performance.now() - startTime;

      return {
        data: {
          items: mergedResults,
          metadata: {
            totalResults: mergedResults.length,
            processingTime,
            relevanceScores: mergedResults.map(r => r.relevanceScore),
            queryVector: queryEmbedding,
          },
        },
        usage: {
          promptTokens: this.calculateTokens(query.text),
          completionTokens: 0,
          totalTokens: this.calculateTokens(query.text),
        },
        latency: processingTime,
      };
    } catch (error) {
      throw this.handleError(error);
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

    const similarity = tf.cosineDistance(tensor1, tensor2);
    const value = similarity.dataSync()[0];

    // Clean up tensors
    tf.dispose([tensor1, tensor2, similarity]);

    return 1 - value; // Convert distance to similarity
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
        relevanceScore: this.calculateSimilarity(queryVector, project.vector),
        highlights: this.generateHighlights(project.description, query.text),
        metadata: project.metadata,
      }))
      .filter(result => 
        result.relevanceScore > this.similarityThreshold &&
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
        relevanceScore: this.calculateSimilarity(queryVector, skill.vector),
        highlights: [],
        metadata: skill.metadata,
      }))
      .filter(result => 
        result.relevanceScore > this.similarityThreshold &&
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
        relevanceScore: this.calculateSimilarity(queryVector, content.vector),
        highlights: this.generateHighlights(content.summary, query.text),
        metadata: content.metadata,
      }))
      .filter(result => 
        result.relevanceScore > this.similarityThreshold &&
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
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
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
