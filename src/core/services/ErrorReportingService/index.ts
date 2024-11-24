import { ErrorCategory, ErrorContext, ErrorSeverity, IErrorReportingService } from './types';
import { monitoringService } from '../MonitoringService';

export class ErrorReportingService implements IErrorReportingService {
  private static instance: ErrorReportingService;
  private errors: ErrorContext[] = [];

  private constructor() {}

  public static getInstance(): ErrorReportingService {
    if (!ErrorReportingService.instance) {
      ErrorReportingService.instance = new ErrorReportingService();
    }
    return ErrorReportingService.instance;
  }

  public reportError(
    error: Error,
    context?: Partial<Omit<ErrorContext, 'message' | 'stack' | 'timestamp'>>
  ): void {
    try {
      const errorContext: ErrorContext = {
        message: error.message,
        stack: error.stack,
        timestamp: Date.now(),
        severity: context?.severity || ErrorSeverity.MEDIUM,
        category: context?.category || ErrorCategory.RUNTIME,
        metadata: context?.metadata
      };

      this.errors.push(errorContext);
      monitoringService.trackErrorMetric(
        'error_reported',
        1,
        errorContext.category,
        errorContext.severity
      );
    } catch (e) {
      // No-op
    }
  }

  public getErrors(): ErrorContext[] {
    return [...this.errors];
  }

  public clearErrors(): void {
    this.errors = [];
  }

  public hasErrors(): boolean {
    return this.errors.length > 0;
  }
}

export const errorReportingService = ErrorReportingService.getInstance();
