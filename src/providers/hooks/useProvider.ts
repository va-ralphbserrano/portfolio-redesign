import { useEffect, useState } from 'react';
import { BaseProvider } from '../core/BaseProvider';
import { ErrorReportingService } from '../../services/ErrorReportingService';
import { MonitoringService } from '../../services/MonitoringService';

export function useProvider<T>(
  provider: BaseProvider<T>,
  config?: any
): [T | null, boolean, Error | null] {
  const [instance, setInstance] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const initializeProvider = async () => {
      try {
        if (!provider.isInitialized()) {
          await provider.initialize(config);
        }
        
        if (mounted) {
          setInstance(provider.getInstance());
          setError(null);
          MonitoringService.trackMetric('provider_hook_success', 1, ['hook']);
        }
      } catch (err) {
        if (mounted) {
          const error = err instanceof Error ? err : new Error('Failed to initialize provider');
          setError(error);
          ErrorReportingService.captureError(error);
          MonitoringService.trackMetric('provider_hook_error', 1, ['hook']);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeProvider();

    return () => {
      mounted = false;
    };
  }, [provider, config]);

  return [instance, loading, error];
}
