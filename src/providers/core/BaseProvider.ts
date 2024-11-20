import { MonitoringService } from '../../services/MonitoringService';
import { ErrorReportingService } from '../../services/ErrorReportingService';

export interface ProviderConfig {
  name: string;
  version: string;
  enabled?: boolean;
  retryAttempts?: number;
  retryDelay?: number;
}

export interface ProviderState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  lastUpdated: number | null;
}

export interface ProviderMetrics {
  requestCount: number;
  errorCount: number;
  latency: number;
}

export abstract class BaseProvider<T> {
  protected state: ProviderState<T>;
  protected metrics: ProviderMetrics;
  protected config: ProviderConfig;
  private subscribers: Set<(state: ProviderState<T>) => void>;

  constructor(config: ProviderConfig) {
    this.config = {
      enabled: true,
      retryAttempts: 3,
      retryDelay: 1000,
      ...config
    };

    this.state = {
      data: null,
      error: null,
      isLoading: false,
      lastUpdated: null
    };

    this.metrics = {
      requestCount: 0,
      errorCount: 0,
      latency: 0
    };

    this.subscribers = new Set();
  }

  public abstract fetchData(): Promise<T>;
  public abstract cleanup(): Promise<void>;
  public abstract healthCheck(): Promise<boolean>;

  public async initialize(): Promise<void> {
    try {
      MonitoringService.getInstance().trackMetric('provider_initialize', 1, {
        provider: this.config.name,
        version: this.config.version
      });

      if (!this.config.enabled) {
        throw new Error('Provider is disabled');
      }

      await this.fetchData();
    } catch (error) {
      MonitoringService.getInstance().trackMetric('provider_initialize_error', 1, {
        provider: this.config.name,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  public async refresh(): Promise<void> {
    try {
      MonitoringService.getInstance().trackMetric('provider_refresh', 1, {
        provider: this.config.name
      });

      await this.fetchData();
    } catch (error) {
      MonitoringService.getInstance().trackMetric('provider_refresh_error', 1, {
        provider: this.config.name,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  protected async handleError(error: Error | unknown, context: string): Promise<void> {
    const normalizedError = error instanceof Error ? error : new Error(`${context}: Unknown error`);
    
    MonitoringService.getInstance().trackMetric('provider_error', 1, {
      provider: this.config.name,
      context,
      error: normalizedError.message
    });

    this.metrics.errorCount++;
    this.state.error = normalizedError;
    this.notifySubscribers();

    ErrorReportingService.captureError(normalizedError);
  }

  protected notifySubscribers(): void {
    try {
      MonitoringService.getInstance().trackMetric('provider_notify_subscribers', 1, {
        provider: this.config.name,
        subscriberCount: this.subscribers.size
      });

      this.subscribers.forEach(subscriber => subscriber({ ...this.state }));
    } catch (error) {
      MonitoringService.getInstance().trackMetric('provider_notify_error', 1, {
        provider: this.config.name,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  public subscribe(callback: (state: ProviderState<T>) => void): () => void {
    try {
      MonitoringService.getInstance().trackMetric('provider_subscribe', 1, {
        provider: this.config.name
      });

      this.subscribers.add(callback);
      callback({ ...this.state });

      return () => {
        try {
          MonitoringService.getInstance().trackMetric('provider_unsubscribe', 1, {
            provider: this.config.name
          });

          this.subscribers.delete(callback);
        } catch (error) {
          MonitoringService.getInstance().trackMetric('provider_unsubscribe_error', 1, {
            provider: this.config.name,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      };
    } catch (error) {
      MonitoringService.getInstance().trackMetric('provider_subscribe_error', 1, {
        provider: this.config.name,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  public async dispose(): Promise<void> {
    try {
      MonitoringService.getInstance().trackMetric('provider_dispose', 1, {
        provider: this.config.name
      });

      await this.cleanup();
      this.subscribers.clear();
      this.state = {
        data: null,
        error: null,
        isLoading: false,
        lastUpdated: null
      };
    } catch (error) {
      MonitoringService.getInstance().trackMetric('provider_dispose_error', 1, {
        provider: this.config.name,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  protected async executeWithRetry<R>(
    operation: () => Promise<R>,
    context: string
  ): Promise<R> {
    let lastError: Error | null = null;
    const startTime = Date.now();

    for (let attempt = 1; attempt <= (this.config.retryAttempts ?? 3); attempt++) {
      try {
        MonitoringService.getInstance().trackMetric('provider_operation_attempt', 1, {
          provider: this.config.name,
          context,
          attempt: attempt.toString()
        });

        const result = await operation();
        const duration = Date.now() - startTime;

        MonitoringService.getInstance().trackMetric('provider_operation_success', 1, {
          provider: this.config.name,
          context,
          duration: duration.toString()
        });

        this.metrics.latency = duration;
        return result;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(`${context}: Unknown error`);
        
        MonitoringService.getInstance().trackMetric('provider_operation_error', 1, {
          provider: this.config.name,
          context,
          attempt: attempt.toString(),
          error: lastError.message
        });

        if (attempt < (this.config.retryAttempts ?? 3)) {
          await new Promise(resolve => setTimeout(resolve, this.config.retryDelay ?? 1000));
        }
      }
    }

    throw lastError ?? new Error(`${context}: Max retry attempts reached`);
  }

  protected getMetrics(): ProviderMetrics {
    return { ...this.metrics };
  }

  protected getState(): ProviderState<T> {
    return { ...this.state };
  }

  public getConfig(): ProviderConfig {
    return { ...this.config };
  }
}
