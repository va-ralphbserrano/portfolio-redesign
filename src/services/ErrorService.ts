import { v4 as uuidv4 } from 'uuid';
import { MonitoringService } from './MonitoringService';
import { RateLimitService } from './RateLimitService';

// Types and Enums
export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

export enum ErrorCategory {
  NETWORK = 'network',
  DATABASE = 'database',
  VALIDATION = 'validation',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  INTERNAL = 'internal',
  EXTERNAL = 'external',
  SYSTEM = 'system',
  USER = 'user'
}

export interface ErrorData {
  id?: string;
  name: string;
  message: string;
  stack?: string;
  severity: ErrorSeverity;
  category: ErrorCategory;
  timestamp: number;
  url?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

export interface AlertConfig {
  threshold?: number;
  cooldown?: number;
  grouping?: boolean;
  channels?: string[];
}

// Unified Error Service
export class ErrorService {
  private static instance: ErrorService | null = null;
  private errorQueue: ErrorData[] = [];
  private alertConfigs: Map<ErrorCategory, AlertConfig> = new Map();
  private readonly rateLimitService: RateLimitService;
  private readonly monitoringService: MonitoringService;

  private constructor() {
    this.rateLimitService = new RateLimitService();
    this.monitoringService = MonitoringService.getInstance();
    this.initializeDefaultConfigs();
  }

  public static getInstance(): ErrorService {
    if (!ErrorService.instance) {
      ErrorService.instance = new ErrorService();
    }
    return ErrorService.instance;
  }

  private initializeDefaultConfigs() {
    Object.values(ErrorCategory).forEach(category => {
      this.alertConfigs.set(category, {
        threshold: 5,
        cooldown: 300000, // 5 minutes
        grouping: true,
        channels: ['default']
      });
    });
  }

  // Error Reporting Methods
  public async reportError(error: Error | ErrorData, category: ErrorCategory = ErrorCategory.INTERNAL): Promise<void> {
    const errorData = this.normalizeError(error, category);
    
    if (this.shouldThrottle(errorData)) {
      return;
    }

    await this.processError(errorData);
    this.monitoringService.trackError(errorData);
  }

  private normalizeError(error: Error | ErrorData, category: ErrorCategory): ErrorData {
    if ('severity' in error) {
      return error as ErrorData;
    }

    return {
      id: uuidv4(),
      name: error.name,
      message: error.message,
      stack: error.stack,
      severity: ErrorSeverity.ERROR,
      category,
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined
    };
  }

  private shouldThrottle(error: ErrorData): boolean {
    const key = `error:${error.category}:${error.name}`;
    return this.rateLimitService.isRateLimited(key);
  }

  // Alert Management Methods
  public setAlertConfig(category: ErrorCategory, config: Partial<AlertConfig>): void {
    const currentConfig = this.alertConfigs.get(category) || {};
    this.alertConfigs.set(category, { ...currentConfig, ...config });
  }

  public async alert(message: string, severity: ErrorSeverity, category: ErrorCategory): Promise<void> {
    const config = this.alertConfigs.get(category);
    if (!config) return;

    const alertData = {
      message,
      severity,
      category,
      timestamp: Date.now()
    };

    await this.sendAlert(alertData, config);
  }

  private async sendAlert(alertData: any, config: AlertConfig): Promise<void> {
    // Implementation for sending alerts through configured channels
    config.channels?.forEach(channel => {
      // Send alert through appropriate channel (e.g., email, Slack, etc.)
      console.log(`Sending ${alertData.severity} alert through ${channel}: ${alertData.message}`);
    });
  }

  // Error Queue Management
  private async processError(error: ErrorData): Promise<void> {
    this.errorQueue.push(error);
    
    if (this.errorQueue.length >= 10) { // Batch process when queue reaches threshold
      const errors = [...this.errorQueue];
      this.errorQueue = [];
      await this.sendErrors(errors);
    }
  }

  private async sendErrors(errors: ErrorData[]): Promise<void> {
    try {
      // Group errors by category and severity for efficient processing
      const groupedErrors = this.groupErrors(errors);
      
      // Process each group
      for (const [key, group] of Object.entries(groupedErrors)) {
        await this.processErrorGroup(key, group);
      }
    } catch (error) {
      console.error('Failed to send errors:', error);
      // Re-queue failed errors
      this.errorQueue.push(...errors);
    }
  }

  private groupErrors(errors: ErrorData[]): Record<string, ErrorData[]> {
    return errors.reduce((groups, error) => {
      const key = `${error.category}:${error.severity}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(error);
      return groups;
    }, {} as Record<string, ErrorData[]>);
  }

  private async processErrorGroup(key: string, errors: ErrorData[]): Promise<void> {
    const [category, severity] = key.split(':');
    const config = this.alertConfigs.get(category as ErrorCategory);

    if (config?.grouping && errors.length >= (config.threshold || 1)) {
      await this.alert(
        `Received ${errors.length} ${severity} errors in category ${category}`,
        severity as ErrorSeverity,
        category as ErrorCategory
      );
    }
  }
}

export const errorService = ErrorService.getInstance();
