interface RateLimitConfig {
  windowMs: number;  // Time window in milliseconds
  maxRequests: number;  // Maximum number of requests allowed in the window
}

class RateLimitService {
  private static instance: RateLimitService;
  private requestMap: Map<string, number[]>;
  private config: RateLimitConfig;

  private constructor() {
    this.requestMap = new Map();
    this.config = {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 100 // 100 requests per window
    };
  }

  public static getInstance(): RateLimitService {
    if (!RateLimitService.instance) {
      RateLimitService.instance = new RateLimitService();
    }
    return RateLimitService.instance;
  }

  public isRateLimited(clientId: string): boolean {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    // Get or initialize request timestamps for this client
    let requestTimestamps = this.requestMap.get(clientId) || [];

    // Remove timestamps outside the current window
    requestTimestamps = requestTimestamps.filter(timestamp => timestamp > windowStart);

    // Add current request timestamp
    requestTimestamps.push(now);

    // Update the map
    this.requestMap.set(clientId, requestTimestamps);

    // Check if rate limit is exceeded
    return requestTimestamps.length > this.config.maxRequests;
  }

  public getRemainingRequests(clientId: string): number {
    const requestTimestamps = this.requestMap.get(clientId) || [];
    return Math.max(0, this.config.maxRequests - requestTimestamps.length);
  }

  public setConfig(config: Partial<RateLimitConfig>): void {
    this.config = {
      ...this.config,
      ...config
    };
  }

  public clearRateLimit(clientId: string): void {
    this.requestMap.delete(clientId);
  }
}

export default RateLimitService;
