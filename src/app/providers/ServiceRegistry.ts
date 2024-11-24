import { monitoringService } from '../../core/services/MonitoringService';
import { errorReportingService } from '../../core/services/ErrorReportingService';
import { ErrorSeverity, ErrorCategory } from '../../core/services/ErrorReportingService/types';
import { BaseProvider } from './core/BaseProvider';

export interface ProviderConfig {
  name: string;
  version: string;
  options?: Record<string, unknown>;
}

export interface IServiceRegistry {
  register<T>(provider: BaseProvider<T>): void;
  unregister<T>(provider: BaseProvider<T>): void;
  getProvider<T>(name: string): BaseProvider<T> | null;
  getAllProviders(): BaseProvider<unknown>[];
  initialize(): Promise<void>;
  dispose(): void;
}

export class ServiceRegistry implements IServiceRegistry {
  private static instance: ServiceRegistry | null = null;
  private providers = new Map<string, BaseProvider<unknown>>();
  private initialized = false;

  private constructor() {}

  public static getInstance(): ServiceRegistry {
    if (!ServiceRegistry.instance) {
      ServiceRegistry.instance = new ServiceRegistry();
    }
    return ServiceRegistry.instance;
  }

  public register<T>(provider: BaseProvider<T>): void {
    try {
      const config = provider.getConfig();
      if (this.providers.has(config.name)) {
        throw new Error(`Provider with name ${config.name} is already registered`);
      }

      this.providers.set(config.name, provider as BaseProvider<unknown>);
      monitoringService.trackCustomMetric('provider_registered', 1, { name: config.name });
    } catch (error) {
      errorReportingService.reportError(error as Error, {
        severity: ErrorSeverity.HIGH,
        category: ErrorCategory.RUNTIME
      });
      throw error;
    }
  }

  public unregister<T>(provider: BaseProvider<T>): void {
    try {
      const config = provider.getConfig();
      if (!this.providers.has(config.name)) {
        throw new Error(`Provider with name ${config.name} is not registered`);
      }

      this.providers.delete(config.name);
      monitoringService.trackCustomMetric('provider_unregistered', 1, { name: config.name });
    } catch (error) {
      errorReportingService.reportError(error as Error, {
        severity: ErrorSeverity.HIGH,
        category: ErrorCategory.RUNTIME
      });
      throw error;
    }
  }

  public getProvider<T>(name: string): BaseProvider<T> | null {
    try {
      const provider = this.providers.get(name);
      if (!provider) {
        return null;
      }
      return provider as BaseProvider<T>;
    } catch (error) {
      errorReportingService.reportError(error as Error, {
        severity: ErrorSeverity.MEDIUM,
        category: ErrorCategory.RUNTIME
      });
      throw error;
    }
  }

  public getAllProviders(): BaseProvider<unknown>[] {
    return Array.from(this.providers.values());
  }

  public async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      const initPromises = Array.from(this.providers.values()).map(provider => provider.initialize());
      await Promise.all(initPromises);
      this.initialized = true;
      monitoringService.trackCustomMetric('service_registry_initialized', 1);
    } catch (error) {
      errorReportingService.reportError(error as Error, {
        severity: ErrorSeverity.HIGH,
        category: ErrorCategory.RUNTIME
      });
      throw error;
    }
  }

  public dispose(): void {
    try {
      Array.from(this.providers.values()).forEach(provider => {
        try {
          provider.dispose();
        } catch (error) {
          errorReportingService.reportError(error as Error, {
            severity: ErrorSeverity.MEDIUM,
            category: ErrorCategory.RUNTIME
          });
        }
      });
      this.providers.clear();
      this.initialized = false;
      monitoringService.trackCustomMetric('service_registry_disposed', 1);
    } catch (error) {
      errorReportingService.reportError(error as Error, {
        severity: ErrorSeverity.HIGH,
        category: ErrorCategory.RUNTIME
      });
      throw error;
    }
  }
}
