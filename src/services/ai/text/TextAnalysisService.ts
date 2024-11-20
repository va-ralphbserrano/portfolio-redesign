import { AIService } from '../base/AIService';
import { AIRequestOptions, AIResponse, AIServiceConfig } from '../types';

export interface TextAnalysisOptions extends AIRequestOptions {
  language?: string;
  maxLength?: number;
  includeMetadata?: boolean;
}

export interface SentimentAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  confidence: number;
  aspects: {
    category: string;
    sentiment: string;
    score: number;
  }[];
}

export interface TextClassification {
  categories: {
    name: string;
    confidence: number;
    subcategories?: string[];
  }[];
  dominantCategory: string;
}

export interface KeywordExtraction {
  keywords: {
    text: string;
    relevance: number;
    frequency: number;
  }[];
  entities: {
    text: string;
    type: string;
    confidence: number;
  }[];
}

export class TextAnalysisService extends AIService {
  constructor(config: AIServiceConfig) {
    super(config);
  }

  async analyzeSentiment(text: string, options?: TextAnalysisOptions): Promise<AIResponse<SentimentAnalysis>> {
    return this.makeRequest<SentimentAnalysis>('/analyze-sentiment', {
      text,
      options: {
        ...options,
        language: options?.language || 'en'
      }
    });
  }

  async classifyText(text: string, options?: TextAnalysisOptions): Promise<AIResponse<TextClassification>> {
    return this.makeRequest<TextClassification>('/classify', {
      text,
      options: {
        ...options,
        includeMetadata: options?.includeMetadata ?? true
      }
    });
  }

  async extractKeywords(text: string, options?: TextAnalysisOptions): Promise<AIResponse<KeywordExtraction>> {
    return this.makeRequest<KeywordExtraction>('/extract-keywords', {
      text,
      options: {
        ...options,
        maxLength: options?.maxLength || 1000
      }
    });
  }
}
