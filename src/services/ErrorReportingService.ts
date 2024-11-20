import { v4 as uuidv4 } from 'uuid';
import { ErrorCategory, ErrorReport, ErrorReportOptions, ErrorSeverity } from '@types/error';
import { RateLimitService } from './RateLimitService';

class ErrorReportingService {
  private static instance: ErrorReportingService;
  private errorQueue: ErrorReport[] = [];
  private readonly rateLimiter: RateLimitService;
  private readonly maxQueueSize = 100;
  private readonly batchSize = 10;
  private readonly flushInterval = 5000; // 5 seconds

  private constructor() {
    this.rateLimiter = RateLimitService.getInstance();
    this.startErrorProcessor();
  }

  public static getInstance(): ErrorReportingService {
    if (!ErrorReportingService.instance) {
      ErrorReportingService.instance = new ErrorReportingService();
    }
    return ErrorReportingService.instance;
  }

  public report(options: ErrorReportOptions): void {
    const errorReport = this.createErrorReport(options);

    if (options.severity === ErrorSeverity.CRITICAL) {
      this.processImmediately(errorReport);
    } else {
      this.queueError(errorReport);
    }
  }

  private createErrorReport(options: ErrorReportOptions): ErrorReport {
    const error = new Error();
    return {
      id: uuidv4(),
      timestamp: Date.now(),
      category: options.category,
      severity: options.severity,
      message: options.message,
      stack: error.stack,
      context: this.sanitizeContext(options.context),
      userId: this.getCurrentUserId(),
      sessionId: this.getCurrentSessionId(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    };
  }

  private sanitizeContext(context?: Record<string, unknown>): Record<string, unknown> | undefined {
    if (!context) return undefined;

    const sensitiveKeys = ['password', 'token', 'secret', 'key', 'auth'];
    const sanitized: Record<string, unknown> = {};

    Object.entries(context).forEach(([key, value]) => {
      if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
        sanitized[key] = '[REDACTED]';
      } else {
        sanitized[key] = value;
      }
    });

    return sanitized;
  }

  private async processImmediately(errorReport: ErrorReport): Promise<void> {
    try {
      if (this.rateLimiter.isRateLimited(`error_${errorReport.category}`)) {
        console.warn('Error reporting rate limit exceeded for category:', errorReport.category);
        return;
      }

      await this.sendToServer(errorReport);
      this.logToConsole(errorReport);
      
      if (errorReport.severity === ErrorSeverity.CRITICAL) {
        this.triggerAlert(errorReport);
      }
    } catch (error) {
      console.error('Failed to process error report:', error);
      this.queueError(errorReport);
    }
  }

  private queueError(errorReport: ErrorReport): void {
    if (this.errorQueue.length >= this.maxQueueSize) {
      this.errorQueue.shift(); // Remove oldest error
    }
    this.errorQueue.push(errorReport);
  }

  private async processErrorQueue(): Promise<void> {
    if (this.errorQueue.length === 0) return;

    const batch = this.errorQueue.splice(0, this.batchSize);
    try {
      await this.sendBatchToServer(batch);
    } catch (error) {
      console.error('Failed to process error batch:', error);
      // Re-queue failed errors
      this.errorQueue.unshift(...batch);
    }
  }

  private startErrorProcessor(): void {
    setInterval(() => {
      this.processErrorQueue();
    }, this.flushInterval);
  }

  private async sendToServer(errorReport: ErrorReport): Promise<void> {
    // Implementation for sending to error reporting server
    // This is a placeholder - implement actual server communication
    console.log('Sending error to server:', errorReport);
  }

  private async sendBatchToServer(batch: ErrorReport[]): Promise<void> {
    // Implementation for sending batch of errors to server
    // This is a placeholder - implement actual batch processing
    console.log('Sending error batch to server:', batch);
  }

  private logToConsole(errorReport: ErrorReport): void {
    const { severity, category, message, context } = errorReport;
    console.group(`[${severity}] ${category}`);
    console.error(message);
    if (context) console.log('Context:', context);
    if (errorReport.stack) console.log('Stack:', errorReport.stack);
    console.groupEnd();
  }

  private triggerAlert(errorReport: ErrorReport): void {
    // Implementation for alerting system
    // This is a placeholder - implement actual alerting mechanism
    console.warn('CRITICAL ERROR ALERT:', errorReport);
  }

  private getCurrentUserId(): string | undefined {
    // Implementation to get current user ID
    // This is a placeholder - implement actual user ID retrieval
    return undefined;
  }

  private getCurrentSessionId(): string | undefined {
    // Implementation to get current session ID
    // This is a placeholder - implement actual session ID retrieval
    return undefined;
  }
}

export const errorReportingService = ErrorReportingService.getInstance();

export default ErrorReportingService;
