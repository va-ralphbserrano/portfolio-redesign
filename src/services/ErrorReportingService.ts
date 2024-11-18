import { ErrorContext, ErrorSeverity, ErrorCategory, createErrorContext } from '../utils/monitoring';

interface ErrorReportingConfig {
  apiEndpoint: string;
  batchSize?: number;
  flushInterval?: number;
}

/**
 * Production error reporting service that sends errors to a backend API
 */
export class ErrorReportingService {
  private static instance: ErrorReportingService;
  private apiEndpoint: string;
  private batchSize: number;
  private flushInterval: number;
  private errorBuffer: ErrorContext[] = [];
  private flushTimer: NodeJS.Timeout | null = null;

  private constructor() {
    this.apiEndpoint = '';
    this.batchSize = 10;
    this.flushInterval = 5000;
  }

  public static getInstance(): ErrorReportingService {
    if (!ErrorReportingService.instance) {
      ErrorReportingService.instance = new ErrorReportingService();
    }
    return ErrorReportingService.instance;
  }

  public static reportError(error: Error): void {
    console.error(`[Error] ${error.message}`);
    // In a real application, this would send the error to a monitoring service
  }

  public initialize(config: ErrorReportingConfig): void {
    this.apiEndpoint = config.apiEndpoint;
    if (config.batchSize !== undefined) this.batchSize = config.batchSize;
    if (config.flushInterval !== undefined) this.flushInterval = config.flushInterval;
    this.setupErrorHandling();
    this.startBufferFlush();
  }

  private setupErrorHandling(): void {
    if (typeof window === 'undefined') return;

    // Handle runtime errors
    window.addEventListener('error', this.handleError);

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection);

    // Handle resource loading errors
    document.addEventListener('error', this.handleResourceError, true);

    // Handle network errors
    const originalFetch = window.fetch;
    window.fetch = async (input: URL | RequestInfo, init?: RequestInit): Promise<Response> => {
      try {
        const response = await originalFetch(input, init);
        if (!response.ok) {
          this.reportError(createErrorContext(
            `HTTP ${response.status}: ${response.statusText}`,
            response.status >= 500 ? ErrorSeverity.HIGH : ErrorSeverity.MEDIUM,
            ErrorCategory.NETWORK,
            `${response.status} ${response.statusText}`,
            {
              endpoint: typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url,
              status: response.status
            }
          ));
        }
        return response;
      } catch (error) {
        const err = error as Error;
        this.reportError(createErrorContext(
          err.message || 'Network request failed',
          ErrorSeverity.HIGH,
          ErrorCategory.NETWORK,
          err.stack || new Error().stack || 'No stack trace available',
          {
            endpoint: typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url
          }
        ));
        throw error;
      }
    };
  }

  private handleError = (event: ErrorEvent): void => {
    this.reportError(createErrorContext(
      event.message,
      ErrorSeverity.HIGH,
      ErrorCategory.JAVASCRIPT,
      event.error?.stack || new Error().stack || 'No stack trace available',
      {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      }
    ));
  };

  private handleUnhandledRejection = (event: PromiseRejectionEvent): void => {
    this.reportError(createErrorContext(
      event.reason?.message || 'Unhandled Promise Rejection',
      ErrorSeverity.HIGH,
      ErrorCategory.JAVASCRIPT,
      event.reason?.stack || new Error().stack || 'No stack trace available',
      {
        type: 'unhandled-rejection'
      }
    ));
  };

  private handleResourceError = (event: ErrorEvent): void => {
    if (event.target instanceof HTMLElement) {
      this.reportError(createErrorContext(
        'Failed to load resource',
        ErrorSeverity.MEDIUM,
        ErrorCategory.RESOURCE,
        `${event.message}\nResource: ${(event.target as HTMLImageElement | HTMLScriptElement).src || (event.target as HTMLLinkElement).href}`,
        {
          resourceType: event.target.tagName.toLowerCase(),
          source: (event.target as HTMLImageElement | HTMLScriptElement).src || (event.target as HTMLLinkElement).href
        }
      ));
    }
  };

  public reportError(error: ErrorContext): void {
    this.errorBuffer.push(error);
    if (this.errorBuffer.length >= this.batchSize) {
      void this.flushErrorBuffer();
    }
  }

  private async flushErrorBuffer(): Promise<void> {
    if (this.errorBuffer.length === 0) return;

    const errors = [...this.errorBuffer];
    this.errorBuffer = [];

    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ errors })
      });

      if (!response.ok) {
        console.error('Failed to send errors:', response.statusText);
        this.errorBuffer.push(...errors);
      }
    } catch (error) {
      console.error('Failed to send errors:', error);
      this.errorBuffer.push(...errors);
    }
  }

  public startBufferFlush(): void {
    if (this.flushTimer === null) {
      this.flushTimer = setInterval(() => {
        void this.flushErrorBuffer();
      }, this.flushInterval);
    }
  }

  public stopBufferFlush(): void {
    if (this.flushTimer !== null) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }
  }
}

export const errorReportingService = ErrorReportingService.getInstance();

export default ErrorReportingService;
