import { errorReportingService } from '@/core/services/ErrorReportingService';
import { ErrorSeverity, ErrorCategory } from '@/core/services/ErrorReportingService/types';
import { ProviderConfig as ServiceRegistryConfig } from './ServiceRegistry';

export interface IProviderState<T> {
  isLoading: boolean;
  error: Error | null;
  data: T | null;
  isInitialized: boolean;
}

export interface ProviderConfig {
  name: string;
  version: string;
  options?: Record<string, unknown>;
}

export abstract class BaseProvider<T> {
  protected state: IProviderState<T> = {
    isLoading: false,
    error: null,
    data: null,
    isInitialized: false
  };

  protected subscribers = new Set<(state: IProviderState<T>) => void>();
  protected abstract config: ProviderConfig;

  public getConfig(): ProviderConfig {
    return this.config;
  }

  protected setState(newState: Partial<IProviderState<T>>): void {
    this.state = { ...this.state, ...newState };
    this.notifySubscribers();
  }

  protected notifySubscribers(): void {
    this.subscribers.forEach(subscriber => subscriber(this.state));
  }

  public subscribe(callback: (state: IProviderState<T>) => void): () => void {
    this.subscribers.add(callback);
    callback(this.state);
    return () => this.subscribers.delete(callback);
  }

  public getState(): IProviderState<T> {
    return { ...this.state };
  }

  protected handleError(error: Error, errorContext: { severity?: ErrorSeverity; category?: ErrorCategory } = {}): void {
    this.setState({
      error,
      isLoading: false
    });

    console.error(`[${this.config.name}] Error:`, error);
    errorReportingService.reportError(error, {
      severity: errorContext.severity,
      category: errorContext.category
    });
  }

  protected async handleAsyncOperation<R>(
    operation: () => Promise<R>,
    errorContext: { severity?: ErrorSeverity; category?: ErrorCategory } = {}
  ): Promise<R | null> {
    try {
      this.setState({ isLoading: true, error: null });
      const result = await operation();
      this.setState({ isLoading: false });
      return result;
    } catch (error) {
      this.handleError(error instanceof Error ? error : new Error(String(error)), errorContext);
      return null;
    }
  }

  protected abstract initialize(): Promise<void>;
  protected abstract cleanup(): Promise<void>;
  protected abstract fetchData(): Promise<T>;
  protected abstract healthCheck(): Promise<boolean>;

  public async init(): Promise<void> {
    try {
      await this.handleAsyncOperation(async () => {
        await this.initialize();
        const data = await this.fetchData();
        this.setState({ data, isLoading: false, isInitialized: true });
      });
    } catch (error) {
      await this.handleError(error as Error);
    }
  }

  public async destroy(): Promise<void> {
    try {
      await this.handleAsyncOperation(async () => {
        await this.cleanup();
        this.subscribers.clear();
        this.setState({
          data: null,
          error: null,
          isLoading: false,
          isInitialized: false
        });
      });
    } catch (error) {
      await this.handleError(error as Error);
    }
  }

  public dispose(): void {
    this.destroy().catch(error => this.handleError(error));
  }

  public async checkHealth(): Promise<boolean> {
    return this.healthCheck();
  }
}
