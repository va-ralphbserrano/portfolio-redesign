import { ErrorContext, ErrorSeverity, ErrorCategory } from '../utils/monitoring';
import { PerformanceMetric } from '../utils/monitoring';

interface AlertConfig {
  name: string;
  condition: (metric: PerformanceMetric | ErrorContext) => boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  cooldown?: number; // Cooldown period in milliseconds
}

interface AlertState {
  lastTriggered?: number;
  count: number;
}

class AlertingService {
  private static instance: AlertingService;
  private readonly apiEndpoint: string;
  private alertConfigs: Map<string, AlertConfig> = new Map();
  private alertStates: Map<string, AlertState> = new Map();
  private webhooks: Set<string> = new Set();
  private isInitialized = false;

  private constructor() {
    this.apiEndpoint = process.env.ALERT_API || '/api/alerts';
  }

  public static getInstance(): AlertingService {
    if (!AlertingService.instance) {
      AlertingService.instance = new AlertingService();
    }
    return AlertingService.instance;
  }

  // For testing purposes only
  public static resetInstance(): void {
    AlertingService.instance = new AlertingService();
  }

  public initialize(config: {
    apiEndpoint?: string;
    webhooks?: string[];
  } = {}): void {
    if (this.isInitialized) {
      this.webhooks.clear(); // Clear existing webhooks
      if (config.webhooks) {
        config.webhooks.forEach(webhook => this.webhooks.add(webhook));
      }
      return;
    }

    if (config.apiEndpoint) this.apiEndpoint = config.apiEndpoint;
    if (config.webhooks) {
      this.webhooks.clear(); // Clear existing webhooks
      config.webhooks.forEach(webhook => this.webhooks.add(webhook));
    }

    this.setupDefaultAlerts();
    this.isInitialized = true;
  }

  private setupDefaultAlerts(): void {
    // Performance alerts
    this.addAlert({
      name: 'high-lcp',
      condition: (metric: PerformanceMetric) => 
        metric.name === 'LCP' && metric.value > 2500,
      severity: 'high',
      message: 'Largest Contentful Paint is too high',
      cooldown: 300000 // 5 minutes
    });

    this.addAlert({
      name: 'high-fid',
      condition: (metric: PerformanceMetric) =>
        metric.name === 'FID' && metric.value > 100,
      severity: 'high',
      message: 'First Input Delay is too high',
      cooldown: 300000
    });

    this.addAlert({
      name: 'high-cls',
      condition: (metric: PerformanceMetric) =>
        metric.name === 'CLS' && metric.value > 0.1,
      severity: 'medium',
      message: 'Cumulative Layout Shift is too high',
      cooldown: 300000
    });

    // Error alerts
    this.addAlert({
      name: 'critical-errors',
      condition: (error: ErrorContext) =>
        error.severity === ErrorSeverity.CRITICAL,
      severity: 'critical',
      message: 'Critical error detected',
      cooldown: 60000 // 1 minute
    });

    this.addAlert({
      name: 'high-error-rate',
      condition: (error: ErrorContext) => {
        const state = this.alertStates.get('high-error-rate');
        if (!state) return false;

        const now = Date.now();
        const fiveMinutesAgo = now - 300000;

        // Reset count if last error was more than 5 minutes ago
        if (!state.lastTriggered || state.lastTriggered < fiveMinutesAgo) {
          state.count = 1;
        } else {
          state.count = (state.count || 0) + 1;
        }

        // Update last triggered time
        state.lastTriggered = now;
        this.alertStates.set('high-error-rate', state);

        // Alert if we hit threshold
        return state.count >= 10;
      },
      severity: 'high',
      message: 'High error rate detected',
      cooldown: 300000
    });

    // Resource alerts
    this.addAlert({
      name: 'large-resource',
      condition: (metric: PerformanceMetric) =>
        metric.name === 'Resource' &&
        metric.metadata?.size &&
        (metric.metadata.size as number) > 1024 * 1024, // 1MB
      severity: 'medium',
      message: 'Large resource detected',
      cooldown: 300000
    });
  }

  public addAlert(config: AlertConfig): void {
    this.alertConfigs.set(config.name, config);
    this.alertStates.set(config.name, { count: 0 });
  }

  public removeAlert(name: string): void {
    this.alertConfigs.delete(name);
    this.alertStates.delete(name);
  }

  public async checkMetric(metric: PerformanceMetric): Promise<void> {
    if (!this.isInitialized) {
      console.warn('AlertingService is not initialized');
      return;
    }

    for (const [name, config] of this.alertConfigs) {
      const state = this.alertStates.get(name);
      if (!state) continue;

      const now = Date.now();
      const cooldownPassed = !state.lastTriggered || 
        now - state.lastTriggered > (config.cooldown || 0);

      if (cooldownPassed) {
        try {
          if (config.condition(metric)) {
            await this.triggerAlert(name, config, metric);
            state.lastTriggered = now;
            this.alertStates.set(name, state);
          }
        } catch (error) {
          console.error(`Failed to check alert ${name}:`, error);
        }
      }
    }
  }

  public async checkError(error: ErrorContext): Promise<void> {
    if (!this.isInitialized) {
      console.warn('AlertingService is not initialized');
      return;
    }

    for (const [name, config] of this.alertConfigs) {
      const state = this.alertStates.get(name);
      if (!state) continue;

      try {
        if (config.condition(error)) {
          await this.triggerAlert(name, config, error);
          state.lastTriggered = Date.now();
          this.alertStates.set(name, state);
        }
      } catch (error) {
        console.error(`Failed to check alert ${name}:`, error);
      }
    }
  }

  private async triggerAlert(
    name: string,
    config: AlertConfig,
    data: PerformanceMetric | ErrorContext
  ): Promise<void> {
    if (!this.isInitialized) {
      console.warn('AlertingService is not initialized');
      return;
    }

    const alert = {
      name,
      severity: config.severity,
      message: config.message,
      timestamp: Date.now(),
      data
    };

    try {
      const requests = [
        fetch(this.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(alert)
        })
      ];

      // Add webhook requests
      if (this.webhooks.size > 0) {
        const webhookRequests = Array.from(this.webhooks).map(webhook =>
          fetch(webhook, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(alert)
          })
        );
        requests.push(...webhookRequests);
      }

      // Send all requests in parallel
      await Promise.all(requests);

      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Alert]', alert);
      }
    } catch (error) {
      console.error('Failed to send alert:', error);
      throw error; // Re-throw to let caller handle the error
    }
  }
}

export { AlertingService };
export const alertingService = AlertingService.getInstance();
