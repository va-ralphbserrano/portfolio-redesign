import { useCallback } from 'react';
import { ServiceRegistry } from '../ServiceRegistry';
import { BaseProvider } from '../core/BaseProvider';
import { MonitoringService } from '../../../core/services/MonitoringService';

export function useServiceRegistry() {
  const registerProvider = useCallback(<T>(
    provider: BaseProvider<T>
  ): void => {
    ServiceRegistry.getInstance().register(provider);
    MonitoringService.getInstance().trackMetric('service_registration', 1, ['registry']);
  }, []);

  const getProvider = useCallback(<T>(key: string): BaseProvider<T> | null => {
    return ServiceRegistry.getInstance().getProvider<T>(key);
  }, []);

  const disposeProvider = useCallback(<T>(provider: BaseProvider<T>): void => {
    ServiceRegistry.getInstance().unregister(provider);
    MonitoringService.getInstance().trackMetric('service_disposal', 1, ['registry']);
  }, []);

  const checkProviderHealth = useCallback(async (key: string): Promise<boolean> => {
    const provider = ServiceRegistry.getInstance().getProvider(key);
    if (!provider) return false;
    
    const isHealthy = await provider.checkHealth();
    MonitoringService.getInstance().trackMetric('service_health_check', 1, ['registry']);
    return isHealthy;
  }, []);

  return {
    registerProvider,
    getProvider,
    disposeProvider,
    checkProviderHealth,
  };
}
