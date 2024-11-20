import { ErrorReportingService } from '../../services/ErrorReportingService';
import { MonitoringService } from '../../services/MonitoringService';
import type { ProviderConfig } from './types';

export abstract class BaseProvider<T> {
  protected instance: T | null = null;
  protected isInitializedFlag = false;
  protected config: ProviderConfig;

  constructor(config: Partial<ProviderConfig> = {}) {
    this.config = {
      enableCache: true,
      poolSize: 1,
      timeout: 5000,
      retryAttempts: 3,
      healthCheckInterval: 30000,
      ...config
    };
  }

  public async initialize(config?: Partial<ProviderConfig>): Promise<void> {
    try {
      if (this.isInitializedFlag) {
        return;
      }

      // Update config if provided
      if (config) {
        this.config = { ...this.config, ...config };
      }

      // Initialize instance
      this.instance = await this.createInstance();
      this.isInitializedFlag = true;

      // Start health checks if enabled
      if (this.config.healthCheckInterval > 0) {
        this.startHealthChecks();
      }

      MonitoringService.trackMetric('provider_initialized', 1, ['provider', this.getName()]);
    } catch (error) {
      ErrorReportingService.captureError(error);
      throw new Error(`Failed to initialize provider: ${this.getName()}`);
    }
  }

  public getInstance(): T {
    if (!this.isInitializedFlag || !this.instance) {
      throw new Error(`Provider not initialized: ${this.getName()}`);
    }
    return this.instance;
  }

  public async dispose(): Promise<void> {
    try {
      if (this.instance && typeof (this.instance as any).dispose === 'function') {
        await (this.instance as any).dispose();
      }
      this.instance = null;
      this.isInitializedFlag = false;
      MonitoringService.trackMetric('provider_disposed', 1, ['provider', this.getName()]);
    } catch (error) {
      ErrorReportingService.captureError(error);
      throw new Error(`Failed to dispose provider: ${this.getName()}`);
    }
  }

  public isInitialized(): boolean {
    return this.isInitializedFlag;
  }

  protected abstract createInstance(): Promise<T>;
  protected abstract getName(): string;
  protected abstract healthCheck(): Promise<boolean>;

  private startHealthChecks(): void {
    setInterval(async () => {
      try {
        const isHealthy = await this.healthCheck();
        MonitoringService.trackMetric('provider_health_check', isHealthy ? 1 : 0, [
          'provider',
          this.getName()
        ]);

        if (!isHealthy) {
          ErrorReportingService.captureError(
            new Error(`Health check failed for provider: ${this.getName()}`)
          );
          await this.handleUnhealthy();
        }
      } catch (error) {
        ErrorReportingService.captureError(error);
      }
    }, this.config.healthCheckInterval);
  }

  private async handleUnhealthy(): Promise<void> {
    try {
      // Attempt to recreate instance
      await this.dispose();
      await this.initialize();
    } catch (error) {
      ErrorReportingService.captureError(error);
    }
  }
}
