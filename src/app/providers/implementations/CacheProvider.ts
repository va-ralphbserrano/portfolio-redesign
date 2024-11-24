import { BaseProvider, ProviderConfig } from '../core/BaseProvider';

export interface CacheEntry<T> {
  value: T;
  timestamp: number;
  ttl: number;
}

export class CacheProvider<T> extends BaseProvider<Map<string, CacheEntry<T>>> {
  private readonly defaultTTL: number;

  constructor(config: ProviderConfig & { defaultTTL?: number }) {
    super(config);
    this.defaultTTL = config.defaultTTL || 3600000; // 1 hour default TTL
    this.data = new Map();
  }

  public async initialize(): Promise<void> {
    // Initialize with empty map
    this.data = new Map();
  }

  protected async load(): Promise<Map<string, CacheEntry<T>>> {
    return this.data;
  }

  public async checkHealth(): Promise<boolean> {
    return true;
  }

  public set(key: string, value: T, ttl?: number): void {
    const entry: CacheEntry<T> = {
      value,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL
    };
    this.data.set(key, entry);
  }

  public get(key: string): T | undefined {
    const entry = this.data.get(key);
    if (!entry) {
      return undefined;
    }

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.data.delete(key);
      return undefined;
    }

    return entry.value;
  }

  public has(key: string): boolean {
    const entry = this.data.get(key);
    if (!entry) {
      return false;
    }

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.data.delete(key);
      return false;
    }

    return true;
  }

  public delete(key: string): boolean {
    return this.data.delete(key);
  }

  public clear(): void {
    this.data.clear();
  }

  public getSize(): number {
    return this.data.size;
  }

  public getKeys(): string[] {
    return Array.from(this.data.keys());
  }

  public getEntries(): [string, T][] {
    const validEntries: [string, T][] = [];
    const now = Date.now();

    for (const [key, entry] of this.data.entries()) {
      if (now - entry.timestamp <= entry.ttl) {
        validEntries.push([key, entry.value]);
      } else {
        this.data.delete(key);
      }
    }

    return validEntries;
  }
}
