import { ErrorReportingService } from '../../services/ErrorReportingService';
import { MonitoringService } from '../../services/MonitoringService';

export class ServiceRegistry {
  private static instance: ServiceRegistry;
  private services: Map<string, () => any>;
  private instances: Map<string, any>;

  private constructor() {
    this.services = new Map();
    this.instances = new Map();
  }

  public static getInstance(): ServiceRegistry {
    if (!ServiceRegistry.instance) {
      ServiceRegistry.instance = new ServiceRegistry();
    }
    return ServiceRegistry.instance;
  }

  public register<T>(key: string, factory: () => T): void {
    try {
      if (this.services.has(key)) {
        throw new Error(`Service already registered: ${key}`);
      }
      this.services.set(key, factory);
      MonitoringService.trackMetric('service_registered', 1, ['registry', key]);
    } catch (error) {
      ErrorReportingService.captureError(error);
      throw error;
    }
  }

  public get<T>(key: string): T {
    try {
      // Return existing instance if available
      if (this.instances.has(key)) {
        MonitoringService.trackMetric('service_cache_hit', 1, ['registry', key]);
        return this.instances.get(key);
      }

      // Get factory function
      const factory = this.services.get(key);
      if (!factory) {
        throw new Error(`Service not registered: ${key}`);
      }

      // Create new instance
      MonitoringService.trackMetric('service_instantiated', 1, ['registry', key]);
      const instance = factory();
      this.instances.set(key, instance);
      return instance;
    } catch (error) {
      ErrorReportingService.captureError(error);
      throw error;
    }
  }

  public async dispose(key: string): Promise<void> {
    try {
      const instance = this.instances.get(key);
      if (instance && typeof instance.dispose === 'function') {
        await instance.dispose();
      }
      this.instances.delete(key);
      MonitoringService.trackMetric('service_disposed', 1, ['registry', key]);
    } catch (error) {
      ErrorReportingService.captureError(error);
      throw error;
    }
  }

  public has(key: string): boolean {
    return this.services.has(key);
  }

  public async clear(): Promise<void> {
    try {
      // Dispose all instances
      const disposals = Array.from(this.instances.keys()).map(key => 
        this.dispose(key)
      );
      await Promise.all(disposals);

      // Clear maps
      this.services.clear();
      this.instances.clear();
      MonitoringService.trackMetric('registry_cleared', 1, ['registry']);
    } catch (error) {
      ErrorReportingService.captureError(error);
      throw error;
    }
  }

  public getStats(): { registered: number; instantiated: number } {
    return {
      registered: this.services.size,
      instantiated: this.instances.size
    };
  }
}

export default ServiceRegistry.getInstance();
