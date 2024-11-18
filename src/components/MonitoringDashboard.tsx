import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface Metrics {
  ttfb: number;
  fcp: number;
  lcp: number;
  cls: number;
  fid: number;
}

interface Resource {
  name: string;
  size: number;
  duration: number;
}

interface DashboardData {
  metrics: Metrics;
  resources: Resource[];
}

const MonitoringDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('1h');
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetchData();
  }, [timeRange]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/metrics?timeRange=${timeRange}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  return (
    <div className="monitoring-dashboard">
      <header className="dashboard-header">
        <h1>Performance Monitoring Dashboard</h1>
        <div className="time-range-selector">
          <button
            className={timeRange === '1h' ? 'active' : ''}
            onClick={() => setTimeRange('1h')}
          >
            1 Hour
          </button>
          <button
            className={timeRange === '24h' ? 'active' : ''}
            onClick={() => setTimeRange('24h')}
          >
            24 Hours
          </button>
          <button
            className={timeRange === '7d' ? 'active' : ''}
            onClick={() => setTimeRange('7d')}
          >
            7 Days
          </button>
          <button
            className={timeRange === '30d' ? 'active' : ''}
            onClick={() => setTimeRange('30d')}
          >
            30 Days
          </button>
        </div>
      </header>

      <div className="metrics-section">
        <h2>Performance Metrics</h2>
        {data && (
          <div className="metrics-grid">
            <div className="metric-item">
              <span>TTFB:</span>
              <span data-testid="ttfb-value">{data.metrics.ttfb}ms</span>
            </div>
            <div className="metric-item">
              <span>FCP:</span>
              <span data-testid="fcp-value">{data.metrics.fcp}ms</span>
            </div>
            <div className="metric-item">
              <span>LCP:</span>
              <span data-testid="lcp-value">{data.metrics.lcp}ms</span>
            </div>
            <div className="metric-item">
              <span>CLS:</span>
              <span data-testid="cls-value">{data.metrics.cls}</span>
            </div>
            <div className="metric-item">
              <span>FID:</span>
              <span data-testid="fid-value">{data.metrics.fid}ms</span>
            </div>
          </div>
        )}
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data?.metrics ? [data.metrics] : []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="ttfb" stroke="#8884d8" />
            <Line type="monotone" dataKey="fcp" stroke="#82ca9d" />
            <Line type="monotone" dataKey="lcp" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="resource-section">
        <h2>Resource Metrics</h2>
        {data?.resources && (
          <div className="resource-list">
            {data.resources.map((resource, index) => (
              <div key={index} className="resource-item">
                <span data-testid="resource-name">{resource.name}</span>
                <span data-testid="resource-size">{formatBytes(resource.size)}</span>
                <span data-testid="resource-duration">{resource.duration}ms</span>
              </div>
            ))}
          </div>
        )}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data?.resources || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="size" stroke="#8884d8" />
            <Line type="monotone" dataKey="duration" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonitoringDashboard;
