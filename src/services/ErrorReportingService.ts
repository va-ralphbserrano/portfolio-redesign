import { ErrorContext } from '../utils/monitoring';

/**
 * Production error reporting service that sends errors to a backend API
 */
class ErrorReportingService {
  private static instance: ErrorReportingService;
  private readonly apiEndpoint: string;
  private readonly batchSize: number;
  private readonly flushInterval: number;
  private errorBuffer: ErrorContext[] = [];
  private isInitialized = false;
  private flushTimeout: NodeJS.Timeout | null = null;

  private constructor() {
    this.apiEndpoint = process.env.ERROR_REPORTING_API || '/api/errors';
    this.batchSize = Number(process.env.ERROR_BATCH_SIZE) || 10;
    this.flushInterval = Number(process.env.ERROR_FLUSH_INTERVAL) || 5000;
  }

  public static getInstance(): ErrorReportingService {
    if (!ErrorReportingService.instance) {
      ErrorReportingService.instance = new ErrorReportingService();
    }
    return ErrorReportingService.instance;
  }

  // For testing purposes only
  public static resetInstance(): void {
    if (ErrorReportingService.instance?.flushTimeout) {
      clearTimeout(ErrorReportingService.instance.flushTimeout);
      ErrorReportingService.instance.flushTimeout = null;
    }
    ErrorReportingService.instance = new ErrorReportingService();
  }

  public initialize(config: {
    apiEndpoint?: string;
    batchSize?: number;
    flushInterval?: number;
  } = {}): void {
    if (this.isInitialized) {
      console.warn('ErrorReportingService is already initialized');
      return;
    }

    if (config.apiEndpoint) this.apiEndpoint = config.apiEndpoint;
    if (config.batchSize) this.batchSize = config.batchSize;
    if (config.flushInterval) this.flushInterval = config.flushInterval;

    this.setupErrorHandling();
    this.isInitialized = true;
  }

  private setupErrorHandling(): void {
    if (typeof window === 'undefined') return;

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
      this.reportError({
        message: event.reason?.message || 'Unhandled promise rejection',
        severity: 'critical',
        category: 'JAVASCRIPT',
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        stack: event.reason?.stack
      });
    });

    // Handle runtime errors
    window.addEventListener('error', (event: ErrorEvent) => {
      // Ignore ResizeObserver errors
      if (event.message?.includes('ResizeObserver')) {
        return;
      }

      this.reportError({
        message: event.message || 'Runtime error',
        severity: 'high',
        category: 'JAVASCRIPT',
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        stack: event.error?.stack,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    // Handle resource loading errors
    document.addEventListener('error', (event: ErrorEvent) => {
      const target = event.target as HTMLElement;
      if (!target || !('src' in target)) return;

      this.reportError({
        message: `Failed to load resource: ${target.tagName.toLowerCase()}`,
        severity: 'medium',
        category: 'RESOURCE',
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        resourceUrl: (target as HTMLImageElement | HTMLScriptElement).src
      });
    }, true);

    // Handle network errors
    const originalFetch = window.fetch;
    window.fetch = async (input: RequestInfo, init?: RequestInit) => {
      try {
        const response = await originalFetch(input, init);
        if (!response.ok) {
          this.reportError({
            message: `HTTP ${response.status}: ${response.statusText}`,
            severity: response.status >= 500 ? 'high' : 'medium',
            category: 'NETWORK',
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            endpoint: typeof input === 'string' ? input : input.url,
            status: response.status
          });
        }
        return response;
      } catch (error) {
        this.reportError({
          message: error.message || 'Network request failed',
          severity: 'high',
          category: 'NETWORK',
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
          endpoint: typeof input === 'string' ? input : input.url
        });
        throw error;
      }
    };
  }

  public async reportError(error: ErrorContext): Promise<void> {
    if (!this.isInitialized) {
      console.warn('ErrorReportingService is not initialized');
      return;
    }

    // Add error to buffer
    this.errorBuffer.push(error);

    // Check if we need to flush based on batch size
    if (this.errorBuffer.length >= this.batchSize) {
      await this.flushErrors();
      return;
    }

    // Schedule next flush if not already scheduled
    if (!this.flushTimeout) {
      this.flushTimeout = setTimeout(async () => {
        await this.flushErrors();
      }, this.flushInterval);
    }
  }

  private async flushErrors(): Promise<void> {
    if (this.errorBuffer.length === 0) return;

    // Get current errors and clear buffer
    const currentErrors = [...this.errorBuffer];
    this.errorBuffer = [];

    try {
      // Clear any pending flush timeout
      if (this.flushTimeout) {
        clearTimeout(this.flushTimeout);
        this.flushTimeout = null;
      }

      // Send errors in a single batch
      await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          errors: currentErrors,
          timestamp: Date.now(),
          environment: process.env.NODE_ENV || 'development'
        })
      });

      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Error Report]', currentErrors);
      }
    } catch (error) {
      console.error('Failed to report errors:', error);
      // Add errors back to buffer
      this.errorBuffer.unshift(...currentErrors);
    }
  }
}

export { ErrorReportingService };
export const errorReportingService = ErrorReportingService.getInstance();
