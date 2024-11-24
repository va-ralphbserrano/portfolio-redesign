import { ErrorSeverity, ErrorCategory } from '../../../core/services/ErrorReportingService/types';
import { monitoringService } from '../../../core/services/MonitoringService';

export interface ProviderConfig {
  name: string;
  retryAttempts?: number;
  retryDelay?: number;
  timeout?: number;
}

export interface IProviderState {
  isInitialized: boolean;
  isLoading: boolean;
  error: Error | null;
}

export abstract class BaseProvider<T> {
  protected config: ProviderConfig;
  protected state: IProviderState;
  protected data: T;

  constructor(config: ProviderConfig) {
    this.config = {
      retryAttempts: 3,
      retryDelay: 1000,
      timeout: 5000,
      ...config
    };

    this.state = {
      isInitialized: false,
      isLoading: false,
      error: null
    };

    // Initialize data with a safe default value
    this.data = {} as T;
  }

  public getConfig(): ProviderConfig {
    return { ...this.config };
  }

  public abstract initialize(): Promise<void>;
  protected abstract load(): Promise<T>;
  public abstract checkHealth(): Promise<boolean>;

  protected async initializeWithRetry(attempt: number = 1): Promise<void> {
    try {
      this.state.isLoading = true;
      await this.initialize();
      this.state.isInitialized = true;
      this.state.isLoading = false;
    } catch (error) {
      const typedError = error instanceof Error ? error : new Error(String(error));
      monitoringService.trackErrorMetric(
        typedError.name,
        1,
        typedError.constructor.name,
        ErrorSeverity.HIGH,
        ErrorCategory.RUNTIME
      );

      if (attempt < (this.config.retryAttempts ?? 3)) {
        await new Promise(resolve => setTimeout(resolve, this.config.retryDelay ?? 1000));
        await this.initializeWithRetry(attempt + 1);
      } else {
        this.state.error = typedError;
        this.state.isLoading = false;
        throw typedError;
      }
    }
  }

  protected async loadWithRetry(attempt: number = 1): Promise<T> {
    try {
      this.state.isLoading = true;
      const result = await this.load();
      this.data = result;
      this.state.isLoading = false;
      return result;
    } catch (error) {
      const typedError = error instanceof Error ? error : new Error(String(error));
      monitoringService.trackErrorMetric(
        typedError.name,
        1,
        typedError.constructor.name,
        ErrorSeverity.HIGH,
        ErrorCategory.RUNTIME
      );

      if (attempt < (this.config.retryAttempts || 3)) {
        await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
        return this.loadWithRetry(attempt + 1);
      }

      this.state.error = typedError;
      this.state.isLoading = false;
      throw typedError;
    }
  }

  public getState(): IProviderState {
    return { ...this.state };
  }

  public getData(): T {
    return this.data;
  }

  public hasError(): boolean {
    return this.state.error !== null;
  }

  public getError(): Error | null {
    return this.state.error;
  }

  public isLoading(): boolean {
    return this.state.isLoading;
  }

  public isInitialized(): boolean {
    return this.state.isInitialized;
  }

  public dispose(): void {
    this.state.isInitialized = false;
    this.state.isLoading = false;
    this.state.error = null;
  }
}
