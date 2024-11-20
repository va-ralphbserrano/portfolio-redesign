import { v4 as uuidv4 } from 'uuid';
import { MonitoringService } from './MonitoringService';
import { RateLimitService } from './RateLimitService';

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

export interface ErrorQueueItem extends ErrorData {
  retryCount: number;
  lastRetry: number | null;
}

export interface ErrorResponse {
  error: ErrorData;
  timestamp: number;
  handled: boolean;
}

export class ErrorReportingService {
  private static instance: ErrorReportingService | null = null;
  private static errorQueue: ErrorQueueItem[] = [];
  private static readonly MAX_QUEUE_SIZE = 100;
  private static readonly FLUSH_INTERVAL = 5000;
  private static flushTimer: NodeJS.Timeout | null = null;
  private static readonly MAX_RETRIES = 3;
  private static readonly RETRY_INTERVAL = 5000;
  private static rateLimitService: RateLimitService;

  private constructor() {
    ErrorReportingService.rateLimitService = RateLimitService.getInstance();
    ErrorReportingService.startAutoFlush();
  }

  public static getInstance(): ErrorReportingService {
    if (!ErrorReportingService.instance) {
      ErrorReportingService.instance = new ErrorReportingService();
    }
    return ErrorReportingService.instance;
  }

  public static reportError(errorData: Partial<ErrorData>): void {
    const instance = ErrorReportingService.getInstance();
    instance.queueError(errorData);
  }

  public static captureError(error: Error | ErrorData): void {
    try {
      const normalizedError = ErrorReportingService.normalizeError(error);
      ErrorReportingService.queueError(normalizedError);
      
      MonitoringService.getInstance().trackMetric('error_captured', 1, {
        error_type: normalizedError.name,
        severity: normalizedError.severity,
        category: normalizedError.category
      });
    } catch (err) {
      console.error('Failed to capture error:', err);
    }
  }

  private static normalizeError(error: Error | ErrorData): ErrorData {
    const timestamp = Date.now();
    
    if ('severity' in error && 'category' in error) {
      const errorData = error as ErrorData;
      return {
        id: errorData.id || uuidv4(),
        name: errorData.name,
        message: errorData.message,
        stack: errorData.stack,
        severity: errorData.severity,
        category: errorData.category,
        timestamp: errorData.timestamp || timestamp,
        url: errorData.url,
        userAgent: errorData.userAgent,
        metadata: errorData.metadata
      };
    }

    const baseError = error as Error;
    return {
      id: uuidv4(),
      name: baseError.name || 'Error',
      message: baseError.message || 'An unknown error occurred',
      stack: baseError.stack || '',
      severity: ErrorSeverity.ERROR,
      category: ErrorCategory.INTERNAL,
      timestamp,
      metadata: { original: baseError }
    };
  }

  private static queueError(error: Partial<ErrorData>): void {
    if (!error) return;

    const normalizedError = ErrorReportingService.normalizeError(error as Error | ErrorData);
    const queueItem: ErrorQueueItem = {
      ...normalizedError,
      retryCount: 0,
      lastRetry: null
    };

    ErrorReportingService.errorQueue.push(queueItem);

    if (ErrorReportingService.errorQueue.length >= ErrorReportingService.MAX_QUEUE_SIZE) {
      ErrorReportingService.flushErrors();
    }
  }

  private static startAutoFlush(): void {
    if (ErrorReportingService.flushTimer) {
      clearInterval(ErrorReportingService.flushTimer);
    }

    ErrorReportingService.flushTimer = setInterval(() => {
      ErrorReportingService.flushErrors();
    }, ErrorReportingService.FLUSH_INTERVAL);
  }

  private static async flushErrors(): Promise<void> {
    if (ErrorReportingService.errorQueue.length === 0) return;

    const errors = [...ErrorReportingService.errorQueue];
    ErrorReportingService.errorQueue = [];

    try {
      await Promise.all(errors.map(error => ErrorReportingService.sendError(error)));
    } catch (error) {
      console.error('Failed to flush errors:', error);
      ErrorReportingService.errorQueue.push(...errors);
    }
  }

  private static async sendError(error: ErrorQueueItem): Promise<void> {
    try {
      // Implementation of error sending logic
      MonitoringService.getInstance().trackMetric('error_sent', 1, {
        error_type: error.name,
        severity: error.severity,
        category: error.category
      });
    } catch (err) {
      console.error('Failed to send error:', err);
      if (error.retryCount < ErrorReportingService.MAX_RETRIES) {
        error.retryCount++;
        error.lastRetry = Date.now();
        ErrorReportingService.errorQueue.push(error);
      }
    }
  }

  public static stopAutoFlush(): void {
    if (ErrorReportingService.flushTimer) {
      clearInterval(ErrorReportingService.flushTimer);
      ErrorReportingService.flushTimer = null;
      MonitoringService.getInstance().trackMetric('error_reporting_stopped', 1);
    }
  }

  public static async dispose(): Promise<void> {
    try {
      await ErrorReportingService.flushErrors();
      ErrorReportingService.stopAutoFlush();
      MonitoringService.getInstance().trackMetric('error_reporting_disposed', 1);
    } catch (err) {
      console.error('Failed to dispose error reporting service:', err);
    }
  }
}

export const errorReportingService = ErrorReportingService.getInstance();
