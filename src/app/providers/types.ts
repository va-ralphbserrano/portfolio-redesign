export interface ProviderConfig {
  enableCache: boolean;
  poolSize: number;
  timeout: number;
  retryAttempts: number;
  healthCheckInterval: number;
}

export interface ServiceFactory<T> {
  (): T;
}

export interface Disposable {
  dispose(): Promise<void>;
}

export interface HealthCheckable {
  healthCheck(): Promise<boolean>;
}

export interface ServiceStats {
  registered: number;
  instantiated: number;
  healthy: number;
  unhealthy: number;
}

export interface ServiceIdentifier {
  name: string;
  version?: string;
  dependencies?: string[];
}
