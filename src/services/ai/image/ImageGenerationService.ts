import { AIService } from '../base/AIService';
import { AIRequestOptions, AIResponse, AIServiceConfig } from '../types';

export interface ImageGenerationOptions extends AIRequestOptions {
  resolution?: string;
  style?: string;
  format?: 'png' | 'jpg' | 'webp';
  quality?: number;
  numberOfImages?: number;
}

export interface GeneratedImage {
  url: string;
  metadata: {
    width: number;
    height: number;
    format: string;
    size: number;
  };
}

export interface ImageVariations {
  variations: GeneratedImage[];
  originalImage: GeneratedImage;
}

export interface ImageEditResult {
  editedImage: GeneratedImage;
  changes: string[];
}

export class ImageGenerationService extends AIService {
  constructor(config: AIServiceConfig) {
    super(config);
  }

  async generateImage(prompt: string, options?: ImageGenerationOptions): Promise<AIResponse<GeneratedImage>> {
    return this.makeRequest<GeneratedImage>('/generate-image', {
      prompt,
      options: {
        ...options,
        resolution: options?.resolution || '1024x1024',
        format: options?.format || 'png',
        quality: options?.quality || 90
      }
    });
  }

  async generateVariations(imageUrl: string, options?: ImageGenerationOptions): Promise<AIResponse<ImageVariations>> {
    return this.makeRequest<ImageVariations>('/variations', {
      imageUrl,
      options: {
        ...options,
        numberOfImages: options?.numberOfImages || 4
      }
    });
  }

  async editImage(imageUrl: string, prompt: string, options?: ImageGenerationOptions): Promise<AIResponse<ImageEditResult>> {
    return this.makeRequest<ImageEditResult>('/edit-image', {
      imageUrl,
      prompt,
      options: {
        ...options,
        quality: options?.quality || 90
      }
    });
  }
}
