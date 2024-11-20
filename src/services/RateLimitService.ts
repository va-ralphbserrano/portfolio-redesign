export interface RateLimitConfig {
  maxRequests: number;
  timeWindow: number;
}

interface RateLimitState {
  count: number;
  timestamp: number;
}

export class RateLimitService {
  private static instance: RateLimitService;
  private limits: Map<string, RateLimitState>;
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig = { maxRequests: 100, timeWindow: 60000 }) {
    this.config = config;
    this.limits = new Map();
  }

  public static getInstance(config?: RateLimitConfig): RateLimitService {
    if (!RateLimitService.instance) {
      RateLimitService.instance = new RateLimitService(config);
    }
    return RateLimitService.instance;
  }

  public async get(key: string): Promise<boolean> {
    const state = this.limits.get(key);
    if (!state) return false;

    const now = Date.now();
    if (now - state.timestamp > this.config.timeWindow) {
      this.limits.delete(key);
      return false;
    }

    return state.count >= this.config.maxRequests;
  }

  public async set(key: string): Promise<void> {
    const state = this.limits.get(key);
    const now = Date.now();

    if (!state || now - state.timestamp > this.config.timeWindow) {
      this.limits.set(key, { count: 1, timestamp: now });
      return;
    }

    state.count++;
  }

  public isRateLimited(key: string): boolean {
    const state = this.limits.get(key);
    if (!state) return false;

    const now = Date.now();
    if (now - state.timestamp > this.config.timeWindow) {
      this.limits.delete(key);
      return false;
    }

    return state.count >= this.config.maxRequests;
  }

  public clearLimit(key: string): void {
    this.limits.delete(key);
  }

  public clearAllLimits(): void {
    this.limits.clear();
  }
}
