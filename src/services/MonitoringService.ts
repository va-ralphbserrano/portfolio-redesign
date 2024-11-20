export interface MonitoringMetrics {
  performance: number;
  accessibility: number;
  seo: number;
  bestPractices: number;
}

export interface ErrorData {
  id: string;
  name: string;
  message: string;
  stack?: string;
  timestamp: string;
  category: string;
  severity?: string;
  tags?: string[];
}

export class MonitoringService {
  async getMetrics(): Promise<MonitoringMetrics> {
    // In a real application, this would fetch data from an API
    return {
      performance: 95,
      accessibility: 97,
      seo: 98,
      bestPractices: 96
    };
  }

  static async trackError(error: ErrorData): Promise<void> {
    // In a real application, this would send error data to a monitoring service
    console.error('Error tracked:', error);
  }
}

export default MonitoringService;
