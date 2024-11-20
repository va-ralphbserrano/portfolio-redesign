import { ErrorReportingService } from '../../ErrorReportingService';
import { MonitoringService } from '../../MonitoringService';

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
  stack: string;
  details: Record<string, unknown>;
}

export interface AIRequestOptions {
  model?: string;
  version?: string;
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

export interface AIServiceConfig {
  apiKey: string;
  baseUrl: string;
  defaultModel?: string;
  defaultVersion?: string;
  timeout?: number;
  maxRetries?: number;
}

export abstract class AIService {
  protected config: AIServiceConfig;
  protected baseUrl: string;
  protected defaultHeaders: Record<string, string>;

  constructor(config?: Partial<AIServiceConfig>) {
    this.config = {
      apiKey: process.env.AI_API_KEY || '',
      baseUrl: process.env.AI_API_BASE_URL || 'https://api.openai.com/v1',
      ...config
    };
    this.baseUrl = this.config.baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.apiKey}`
    };
  }

  protected async makeRequest<T>(
    endpoint: string,
    payload: unknown,
    options?: AIRequestOptions
  ): Promise<AIResponse<T>> {
    const startTime = Date.now();

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          ...this.defaultHeaders,
          ...(options?.headers || {})
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw await this.handleErrorResponse(response);
      }

      const data = await response.json();
      const endTime = Date.now();

      return {
        data: data as T,
        metadata: {
          requestId: response.headers.get('x-request-id') || crypto.randomUUID(),
          model: options?.model || this.config.defaultModel,
          version: options?.version || this.config.defaultVersion
        },
        usage: {
          promptTokens: data.usage?.prompt_tokens || 0,
          completionTokens: data.usage?.completion_tokens || 0,
          totalTokens: data.usage?.total_tokens || 0
        },
        latency: endTime - startTime
      };
    } catch (error) {
      throw this.handleError(error as Error | ErrorResponse);
    }
  }

  protected async handleErrorResponse(response: Response): Promise<never> {
    const errorData = await response.json();
    
    const error: ErrorResponse = {
      name: 'AIServiceError',
      message: errorData.error?.message || 'Unknown error occurred',
      code: errorData.error?.code || `HTTP_${response.status}`,
      retryable: response.status >= 500 || response.status === 429,
      stack: new Error().stack || '',
      details: {
        status: response.status,
        statusText: response.statusText,
        ...errorData.error
      }
    };

    MonitoringService.getInstance().track({
      name: 'ai_request_error',
      value: 1,
      tags: {
        endpoint: response.url,
        status: response.status.toString(),
        code: error.code
      }
    });

    throw error;
  }

  protected handleError(error: Error | ErrorResponse): never {
    if (this.isErrorResponse(error)) {
      throw error;
    }

    MonitoringService.getInstance().track({
      name: 'ai_request_error',
      value: 1,
      tags: {
        type: error.name,
        message: error.message
      }
    });

    const errorResponse: ErrorResponse = {
      name: error.name || 'AIServiceError',
      message: error.message || 'An unknown error occurred',
      code: 'UNKNOWN_ERROR',
      retryable: false,
      stack: error.stack || '',
      details: {}
    };

    throw errorResponse;
  }

  private isErrorResponse(error: unknown): error is ErrorResponse {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      'retryable' in error
    );
  }

  protected logRequest(metadata: Partial<RequestMetadata>): void {
    const { requestId, model = '', version = '' } = metadata;
    MonitoringService.getInstance().trackMetric('ai_request', 1);
    MonitoringService.getInstance().trackMetric('ai_request_model_' + model, 1);
  }
}

interface RequestMetadata {
  requestId: string;
  model: string;
  version: string;
}
