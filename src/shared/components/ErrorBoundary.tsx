import { Component, ErrorInfo, ReactNode } from 'react';
import { errorReportingService } from '@/core/services/ErrorReportingService';
import { ErrorSeverity, ErrorCategory } from '@/core/services/ErrorReportingService/types';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch and handle React component errors
 * @component
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    errorReportingService.reportError(error, {
      severity: ErrorSeverity.HIGH,
      category: ErrorCategory.RUNTIME,
      metadata: {
        componentStack: errorInfo.componentStack
      }
    });
  }

  override render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError && error) {
      return fallback || (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <details>
            <summary>Error Details</summary>
            <pre>{error.message}</pre>
          </details>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
