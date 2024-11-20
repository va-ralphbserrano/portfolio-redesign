import { MetricData } from '../index';
import { ErrorReportingService } from '../../ErrorReportingService';

export interface CollectorConfig {
  enabled: boolean;
  batchSize: number;
  flushInterval: number;
}

export abstract class MetricCollector {
  protected config: CollectorConfig;
  public readonly name: string;

  constructor(name: string, config: Partial<CollectorConfig> = {}) {
    this.name = name;
    this.config = {
      enabled: true,
      batchSize: 100,
      flushInterval: 5000,
      ...config
    };
  }

  public abstract collect(metrics: MetricData[]): Promise<void>;

  protected async handleError(error: Error | unknown, context: string): Promise<void> {
    const normalizedError = error instanceof Error ? error : new Error(`${context}: Unknown error occurred`);
    ErrorReportingService.captureError(normalizedError);
  }

  public isEnabled(): boolean {
    return this.config.enabled;
  }

  public enable(): void {
    this.config.enabled = true;
  }

  public disable(): void {
    this.config.enabled = false;
  }

  public getConfig(): CollectorConfig {
    return { ...this.config };
  }

  public updateConfig(config: Partial<CollectorConfig>): void {
    this.config = {
      ...this.config,
      ...config
    };
  }
}
