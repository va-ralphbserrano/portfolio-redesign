export interface MonitoringMetrics {
  performance: number;
  accessibility: number;
  seo: number;
  bestPractices: number;
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
}

export default MonitoringService;
