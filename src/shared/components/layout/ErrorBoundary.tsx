import { Component, ErrorInfo, ReactNode } from 'react';
import { errorReportingService } from '@/core/services/ErrorReportingService';
import { ErrorCategory, ErrorSeverity } from '@/core/services/ErrorReportingService/types';

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
export class ErrorBoundary extends Component<Props, State> {
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
      category: ErrorCategory.RUNTIME,
      severity: ErrorSeverity.HIGH,
      metadata: {
        componentStack: errorInfo.componentStack
      }
    });
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div role="alert" className="error-boundary">
          <h2>Something went wrong</h2>
          <details>
            <summary>Error Details</summary>
            <pre>{this.state.error?.toString()}</pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
