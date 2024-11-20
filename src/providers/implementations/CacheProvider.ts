import { BaseProvider } from '../core/BaseProvider';
import type { ProviderConfig } from '../core/types';
import { ErrorReportingService } from '../../services/ErrorReportingService';
import { MonitoringService } from '../../services/MonitoringService';

interface CacheConfig extends ProviderConfig {
  maxSize?: number;
  ttl?: number;
}

interface CacheEntry<T> {
  value: T;
  expiry: number;
}

export class CacheService {
  private cache: Map<string, CacheEntry<any>>;
  private maxSize: number;
  private ttl: number;

  constructor(config: { maxSize?: number; ttl?: number } = {}) {
    this.cache = new Map();
    this.maxSize = config.maxSize || 1000;
    this.ttl = config.ttl || 3600000; // 1 hour default
  }

  public set<T>(key: string, value: T, ttl?: number): void {
    this.cleanup();
    
    if (this.cache.size >= this.maxSize) {
      // Remove oldest entry
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      value,
      expiry: Date.now() + (ttl || this.ttl)
    });

    MonitoringService.trackMetric('cache_set', 1, ['cache']);
  }

  public get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      MonitoringService.trackMetric('cache_miss', 1, ['cache']);
      return null;
    }

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      MonitoringService.trackMetric('cache_expired', 1, ['cache']);
      return null;
    }

    MonitoringService.trackMetric('cache_hit', 1, ['cache']);
    return entry.value;
  }

  public delete(key: string): void {
    this.cache.delete(key);
    MonitoringService.trackMetric('cache_delete', 1, ['cache']);
  }

  public clear(): void {
    this.cache.clear();
    MonitoringService.trackMetric('cache_clear', 1, ['cache']);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiry) {
        this.cache.delete(key);
        MonitoringService.trackMetric('cache_cleanup', 1, ['cache']);
      }
    }
  }

  public async dispose(): Promise<void> {
    this.clear();
  }

  public async healthCheck(): Promise<boolean> {
    try {
      const testKey = '_health_check_';
      this.set(testKey, true);
      const result = this.get(testKey);
      this.delete(testKey);
      return result === true;
    } catch (error) {
      ErrorReportingService.captureError(error);
      return false;
    }
  }
}

export class CacheProvider extends BaseProvider<CacheService> {
  constructor(config: Partial<CacheConfig> = {}) {
    super(config);
  }

  protected async createInstance(): Promise<CacheService> {
    return new CacheService({
      maxSize: (this.config as CacheConfig).maxSize,
      ttl: (this.config as CacheConfig).ttl
    });
  }

  protected getName(): string {
    return 'CacheProvider';
  }

  protected async healthCheck(): Promise<boolean> {
    if (!this.instance) {
      return false;
    }
    return this.instance.healthCheck();
  }
}

export default new CacheProvider();
