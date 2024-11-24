import { ErrorSeverity, ErrorCategory } from './ErrorReportingService/types';
import { monitoringService } from './MonitoringService';

// Types and Enums
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

export interface IErrorService {
  reportError(error: Error, severity?: ErrorSeverity, category?: ErrorCategory): void;
  handleError(error: Error, severity?: ErrorSeverity, category?: ErrorCategory): void;
}

// Unified Error Service
export class ErrorService implements IErrorService {
  private static instance: ErrorService;
  private errors: Error[] = [];
  private maxErrors: number = 100;
  private errorRateLimit: number = 10; // errors per minute
  private errorCount: number = 0;
  private lastResetTime: number = Date.now();

  private constructor() {
    // Reset error count every minute
    setInterval(() => {
      this.errorCount = 0;
      this.lastResetTime = Date.now();
    }, 60000);
  }

  public static getInstance(): ErrorService {
    if (!ErrorService.instance) {
      ErrorService.instance = new ErrorService();
    }
    return ErrorService.instance;
  }

  private isRateLimited(): boolean {
    const now = Date.now();
    if (now - this.lastResetTime >= 60000) {
      this.errorCount = 0;
      this.lastResetTime = now;
    }
    return this.errorCount >= this.errorRateLimit;
  }

  public reportError(
    error: Error,
    severity: ErrorSeverity = ErrorSeverity.HIGH,
    category: ErrorCategory = ErrorCategory.UNKNOWN
  ): void {
    if (this.isRateLimited()) {
      console.warn('Error reporting rate limit exceeded');
      return;
    }

    this.errors.push(error);
    this.errorCount++;

    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }

    // Log the error
    console.error('Error:', error.message);
    if (error.stack) {
      console.error('Stack:', error.stack);
    }

    // Track error metric
    monitoringService.trackError(error, {
      severity,
      category
    });
  }

  public handleError(
    error: Error,
    severity: ErrorSeverity = ErrorSeverity.HIGH,
    category: ErrorCategory = ErrorCategory.UNKNOWN
  ): void {
    this.reportError(error, severity, category);
  }

  public getErrors(): Error[] {
    return [...this.errors];
  }

  public clearErrors(): void {
    this.errors = [];
    this.errorCount = 0;
  }

  public hasErrors(): boolean {
    return this.errors.length > 0;
  }
}

export const errorService = ErrorService.getInstance();
