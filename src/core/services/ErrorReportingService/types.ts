export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum ErrorCategory {
  NETWORK = 'network',
  RUNTIME = 'runtime',
  VALIDATION = 'validation',
  SECURITY = 'security',
  BUSINESS = 'business',
  UNKNOWN = 'unknown'
}

export interface ErrorContext {
  message: string;
  stack?: string;
  timestamp: number;
  severity: ErrorSeverity;
  category: ErrorCategory;
  metadata?: Record<string, unknown>;
}

export interface Error {
  message: string;
  stack?: string;
}

export interface ErrorReport {
  error: Error;
  context: ErrorContext;
}

export interface IErrorReportingService {
  reportError(error: Error, context?: Partial<Omit<ErrorContext, 'message' | 'stack' | 'timestamp'>>): void;
  getErrors(): ErrorContext[];
  clearErrors(): void;
  hasErrors(): boolean;
}
