import { MonitoringService } from '../../services/MonitoringService';
import { ErrorReportingService } from '../../services/ErrorReportingService';
import { BaseProvider } from './BaseProvider';

export class ServiceRegistry {
  private static instance: ServiceRegistry | null = null;
  private providers: Map<string, BaseProvider<unknown>>;

  private constructor() {
    this.providers = new Map();
  }

  public static getInstance(): ServiceRegistry {
    if (!ServiceRegistry.instance) {
      ServiceRegistry.instance = new ServiceRegistry();
    }
    return ServiceRegistry.instance;
  }

  public registerProvider<T>(provider: BaseProvider<T>): void {
    try {
      const providerName = provider.getConfig().name;
      if (this.providers.has(providerName)) {
        throw new Error(`Provider ${providerName} is already registered`);
      }

      this.providers.set(providerName, provider as BaseProvider<unknown>);
      MonitoringService.getInstance().trackMetric('provider_registered', 1, {
        provider: providerName,
        version: provider.getConfig().version
      });
    } catch (error) {
      MonitoringService.getInstance().trackMetric('provider_registration_failed', 1);
      ErrorReportingService.captureError(error instanceof Error ? error : new Error('Failed to register provider'));
      throw error;
    }
  }

  public getProvider<T>(name: string): BaseProvider<T> | null {
    try {
      const provider = this.providers.get(name) as BaseProvider<T> | undefined;
      if (!provider) {
        MonitoringService.getInstance().trackMetric('provider_not_found', 1, {
          provider: name
        });
        return null;
      }

      MonitoringService.getInstance().trackMetric('provider_retrieved', 1, {
        provider: name,
        version: provider.getConfig().version
      });

      return provider;
    } catch (error) {
      MonitoringService.getInstance().trackMetric('provider_retrieval_failed', 1);
      ErrorReportingService.captureError(error instanceof Error ? error : new Error('Failed to retrieve provider'));
      return null;
    }
  }

  public hasProvider(name: string): boolean {
    try {
      const exists = this.providers.has(name);
      MonitoringService.getInstance().trackMetric('provider_check', 1, {
        provider: name,
        exists: exists.toString()
      });
      return exists;
    } catch (error) {
      MonitoringService.getInstance().trackMetric('provider_check_failed', 1);
      ErrorReportingService.captureError(error instanceof Error ? error : new Error('Failed to check provider existence'));
      return false;
    }
  }

  public async disposeProvider(name: string): Promise<void> {
    try {
      const provider = this.providers.get(name);
      if (!provider) {
        MonitoringService.getInstance().trackMetric('provider_dispose_not_found', 1, {
          provider: name
        });
        return;
      }

      await provider.dispose();
      this.providers.delete(name);
      MonitoringService.getInstance().trackMetric('provider_disposed', 1, {
        provider: name,
        version: provider.getConfig().version
      });
    } catch (error) {
      MonitoringService.getInstance().trackMetric('provider_dispose_failed', 1);
      ErrorReportingService.captureError(error instanceof Error ? error : new Error('Failed to dispose provider'));
      throw error;
    }
  }

  public async disposeAll(): Promise<void> {
    try {
      const providers = Array.from(this.providers.entries());
      for (const [name, provider] of providers) {
        try {
          await provider.dispose();
          this.providers.delete(name);
          MonitoringService.getInstance().trackMetric('provider_disposed', 1, {
            provider: name,
            version: provider.getConfig().version
          });
        } catch (error) {
          MonitoringService.getInstance().trackMetric('provider_dispose_failed', 1, {
            provider: name
          });
          ErrorReportingService.captureError(error instanceof Error ? error : new Error(`Failed to dispose provider ${name}`));
        }
      }
    } catch (error) {
      MonitoringService.getInstance().trackMetric('providers_dispose_all_failed', 1);
      ErrorReportingService.captureError(error instanceof Error ? error : new Error('Failed to dispose all providers'));
      throw error;
    }
  }

  public async healthCheck(): Promise<Map<string, boolean>> {
    const results = new Map<string, boolean>();
    try {
      const providers = Array.from(this.providers.entries());
      for (const [name, provider] of providers) {
        try {
          const isHealthy = await provider.checkHealth();
          results.set(name, isHealthy);
          MonitoringService.getInstance().trackMetric('provider_health_check', 1, {
            provider: name,
            version: provider.getConfig().version,
            healthy: isHealthy.toString()
          });
        } catch (error) {
          results.set(name, false);
          MonitoringService.getInstance().trackMetric('provider_health_check_failed', 1, {
            provider: name
          });
          ErrorReportingService.captureError(error instanceof Error ? error : new Error(`Health check failed for provider ${name}`));
        }
      }
    } catch (error) {
      MonitoringService.getInstance().trackMetric('providers_health_check_failed', 1);
      ErrorReportingService.captureError(error instanceof Error ? error : new Error('Failed to perform health check on providers'));
    }
    return results;
  }
}
