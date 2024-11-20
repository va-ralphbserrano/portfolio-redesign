import { BaseProvider } from '../core/BaseProvider';
import type { ProviderConfig } from '../core/types';
import { ErrorReportingService } from '../../services/ErrorReportingService';
import { MonitoringService } from '../../services/MonitoringService';

interface CacheConfig extends ProviderConfig {
  maxSize?: number;
  ttl?: number;
}

interface CacheEntry<T> {
  key: string;
  value: T;
  timestamp: number;
  ttl: number;
}

interface CacheOptions {
  maxSize?: number;
  ttl?: number;
}

export class CacheService<T> {
  private cache: Map<string, CacheEntry<T>>;
  private maxSize: number;
  private defaultTTL: number;

  constructor(config: CacheOptions = {}) {
    this.cache = new Map();
    this.maxSize = config.maxSize || 1000;
    this.defaultTTL = config.ttl || 3600000; // 1 hour default
  }

  public set(key: string, value: T, options?: CacheOptions): void {
    try {
      this.evictExpired();

      if (this.cache.size >= this.maxSize) {
        this.evictOldest();
      }

      const entry: CacheEntry<T> = {
        key,
        value,
        timestamp: Date.now(),
        ttl: options?.ttl || this.defaultTTL
      };

      this.cache.set(key, entry);
      MonitoringService.getInstance().trackMetric('cache_set', 1, ['cache']);
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error('Cache set failed');
      ErrorReportingService.captureError(normalizedError);
      throw normalizedError;
    }
  }

  public get(key: string): T | null {
    try {
      this.evictExpired();

      const entry = this.cache.get(key);
      if (!entry) {
        MonitoringService.getInstance().trackMetric('cache_miss', 1, ['cache']);
        return null;
      }

      if (this.isExpired(entry)) {
        this.cache.delete(key);
        MonitoringService.getInstance().trackMetric('cache_expired', 1, ['cache']);
        return null;
      }

      MonitoringService.getInstance().trackMetric('cache_hit', 1, ['cache']);
      return entry.value;
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error('Cache get failed');
      ErrorReportingService.captureError(normalizedError);
      throw normalizedError;
    }
  }

  public delete(key: string): void {
    try {
      const deleted = this.cache.delete(key);
      MonitoringService.getInstance().trackMetric('cache_delete', 1, ['cache']);
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error('Cache delete failed');
      ErrorReportingService.captureError(normalizedError);
      throw normalizedError;
    }
  }

  public clear(): void {
    try {
      this.cache.clear();
      MonitoringService.getInstance().trackMetric('cache_clear', 1, ['cache']);
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error('Cache clear failed');
      ErrorReportingService.captureError(normalizedError);
      throw normalizedError;
    }
  }

  public fetchData(): Promise<CacheService<any>> {
    return Promise.resolve({} as CacheService<any>);
  }

  private isExpired(entry: CacheEntry<T>): boolean {
    return Date.now() - entry.timestamp > entry.ttl;
  }

  private evictExpired(): void {
    for (const [key, entry] of this.cache.entries()) {
      if (this.isExpired(entry)) {
        this.cache.delete(key);
        MonitoringService.getInstance().trackMetric('cache_cleanup', 1, ['cache']);
      }
    }
  }

  private evictOldest(): void {
    let oldestKey: string | undefined;
    let oldestTimestamp = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTimestamp) {
        oldestKey = key;
        oldestTimestamp = entry.timestamp;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
      MonitoringService.getInstance().trackMetric('cache_evicted', 1, ['cache']);
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

export class CacheProvider<T> extends BaseProvider<T> {
  private cache: Map<string, { value: T; timestamp: number }>;
  private config: {
    name: string;
    version: string;
    ttl: number;
    maxSize: number;
  };

  constructor(config: Partial<{
    name: string;
    version: string;
    ttl: number;
    maxSize: number;
  }> = {}) {
    super();
    this.cache = new Map();
    this.config = {
      name: config.name || 'default-cache',
      version: config.version || '1.0.0',
      ttl: config.ttl || 3600000, // 1 hour default
      maxSize: config.maxSize || 1000
    };
  }

  public async get(key: string): Promise<T | null> {
    try {
      MonitoringService.getInstance().trackMetric('cache_get_attempt', 1, {
        cache_name: this.config.name
      });

      const item = this.cache.get(key);

      if (!item) {
        MonitoringService.getInstance().trackMetric('cache_miss', 1, {
          cache_name: this.config.name
        });
        return null;
      }

      if (this.isExpired(item.timestamp)) {
        this.cache.delete(key);
        MonitoringService.getInstance().trackMetric('cache_expired', 1, {
          cache_name: this.config.name
        });
        return null;
      }

      MonitoringService.getInstance().trackMetric('cache_hit', 1, {
        cache_name: this.config.name
      });

      return item.value;
    } catch (error) {
      ErrorReportingService.captureError(error instanceof Error ? error : new Error('Failed to get cache item'));
      return null;
    }
  }

  public async set(key: string, value: T, options?: CacheOptions): Promise<void> {
    try {
      if (this.cache.size >= this.config.maxSize) {
        this.evictOldest();
      }

      const ttl = options?.ttl || this.config.ttl;

      this.cache.set(key, {
        value,
        timestamp: Date.now() + ttl
      });

      MonitoringService.getInstance().trackMetric('cache_set', 1, {
        cache_name: this.config.name
      });
    } catch (error) {
      ErrorReportingService.captureError(error instanceof Error ? error : new Error('Failed to set cache item'));
    }
  }

  public async delete(key: string): Promise<void> {
    try {
      const deleted = this.cache.delete(key);
      MonitoringService.getInstance().trackMetric('cache_delete', 1, {
        cache_name: this.config.name,
        success: deleted ? 'true' : 'false'
      });
    } catch (error) {
      ErrorReportingService.captureError(error instanceof Error ? error : new Error('Failed to delete cache item'));
    }
  }

  public async clear(): Promise<void> {
    try {
      this.cache.clear();
      MonitoringService.getInstance().trackMetric('cache_clear', 1, {
        cache_name: this.config.name
      });
    } catch (error) {
      ErrorReportingService.captureError(error instanceof Error ? error : new Error('Failed to clear cache'));
    }
  }

  public async has(key: string): Promise<boolean> {
    try {
      const exists = this.cache.has(key);
      if (exists) {
        const item = this.cache.get(key);
        if (item && this.isExpired(item.timestamp)) {
          this.cache.delete(key);
          MonitoringService.getInstance().trackMetric('cache_expired', 1, {
            cache_name: this.config.name
          });
          return false;
        }
      }

      MonitoringService.getInstance().trackMetric('cache_has', 1, {
        cache_name: this.config.name,
        exists: exists.toString()
      });

      return exists;
    } catch (error) {
      ErrorReportingService.captureError(error instanceof Error ? error : new Error('Failed to check cache item'));
      return false;
    }
  }

  private isExpired(timestamp: number): boolean {
    return timestamp <= Date.now();
  }

  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTimestamp = Infinity;

    for (const [key, item] of this.cache.entries()) {
      if (item.timestamp < oldestTimestamp) {
        oldestTimestamp = item.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
      MonitoringService.getInstance().trackMetric('cache_eviction', 1, {
        cache_name: this.config.name,
        reason: 'size_limit'
      });
    }
  }

  public getConfig(): {
    name: string;
    version: string;
    ttl: number;
    maxSize: number;
  } {
    return { ...this.config };
  }

  protected async initialize(): Promise<void> {
    try {
      // Initialization logic if needed
      MonitoringService.getInstance().trackMetric('cache_initialized', 1, {
        cache_name: this.config.name
      });
    } catch (error) {
      ErrorReportingService.captureError(error instanceof Error ? error : new Error('Failed to initialize cache'));
    }
  }

  protected async dispose(): Promise<void> {
    try {
      this.cache.clear();
      MonitoringService.getInstance().trackMetric('cache_disposed', 1, {
        cache_name: this.config.name
      });
    } catch (error) {
      ErrorReportingService.captureError(error instanceof Error ? error : new Error('Failed to dispose cache'));
    }
  }
}

export default new CacheProvider();
