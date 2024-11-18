import React, { useEffect, useState } from 'react';
import { metricCollectionService } from '../../services/MetricCollectionService';
import { errorReportingService } from '../../services/ErrorReportingService';
import { PerformanceMetric, ErrorContext } from '../../utils/monitoring';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './styles.css';

interface MetricGroup {
  timestamp: number;
  LCP?: number;
  FCP?: number;
  CLS?: number;
  FID?: number;
  TTFB?: number;
  Resource?: number;
  Navigation?: number;
}

interface ErrorGroup {
  timestamp: number;
  javascript: number;
  resource: number;
  network: number;
  performance: number;
  security: number;
}

const MonitoringDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricGroup[]>([]);
  const [errors, setErrors] = useState<ErrorGroup[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('1h');

  useEffect(() => {
    // Subscribe to metric updates
    const unsubscribeMetrics = metricCollectionService.subscribe((newMetrics) => {
      setMetrics(prevMetrics => {
        const now = Date.now();
        const timeLimit = getTimeLimit(selectedTimeRange);
        
        // Group metrics by timestamp (rounded to minutes)
        const metricMap = new Map<number, MetricGroup>();
        
        // Add existing metrics within time range
        prevMetrics
          .filter(m => m.timestamp >= timeLimit)
          .forEach(m => metricMap.set(m.timestamp, m));

        // Add new metrics
        newMetrics.forEach(metric => {
          const timestamp = Math.floor(metric.timestamp / 60000) * 60000;
          const existing = metricMap.get(timestamp) || { timestamp };
          metricMap.set(timestamp, {
            ...existing,
            [metric.name]: metric.value
          });
        });

        return Array.from(metricMap.values())
          .sort((a, b) => a.timestamp - b.timestamp);
      });
    });

    // Initialize error reporting
    errorReportingService.initialize();

    return () => {
      unsubscribeMetrics();
    };
  }, [selectedTimeRange]);

  const getTimeLimit = (range: '1h' | '24h' | '7d' | '30d'): number => {
    const now = Date.now();
    switch (range) {
      case '1h': return now - 3600000;
      case '24h': return now - 86400000;
      case '7d': return now - 604800000;
      case '30d': return now - 2592000000;
    }
  };

  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    switch (selectedTimeRange) {
      case '1h': return date.toLocaleTimeString();
      case '24h': return date.toLocaleTimeString();
      default: return date.toLocaleDateString();
    }
  };

  const getMetricColor = (name: string): string => {
    switch (name) {
      case 'LCP': return '#8884d8';
      case 'FCP': return '#82ca9d';
      case 'CLS': return '#ffc658';
      case 'FID': return '#ff7300';
      case 'TTFB': return '#00C49F';
      case 'Resource': return '#FFBB28';
      case 'Navigation': return '#FF8042';
      default: return '#666';
    }
  };

  return (
    <div className="monitoring-dashboard">
      <header className="dashboard-header">
        <h1>Performance Monitoring Dashboard</h1>
        <div className="time-range-selector">
          <button
            className={selectedTimeRange === '1h' ? 'active' : ''}
            onClick={() => setSelectedTimeRange('1h')}
          >
            1 Hour
          </button>
          <button
            className={selectedTimeRange === '24h' ? 'active' : ''}
            onClick={() => setSelectedTimeRange('24h')}
          >
            24 Hours
          </button>
          <button
            className={selectedTimeRange === '7d' ? 'active' : ''}
            onClick={() => setSelectedTimeRange('7d')}
          >
            7 Days
          </button>
          <button
            className={selectedTimeRange === '30d' ? 'active' : ''}
            onClick={() => setSelectedTimeRange('30d')}
          >
            30 Days
          </button>
        </div>
      </header>

      <div className="metrics-section">
        <h2>Performance Metrics</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={metrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatTimestamp}
              interval="preserveStartEnd"
            />
            <YAxis />
            <Tooltip
              labelFormatter={formatTimestamp}
              formatter={(value: number, name: string) => [
                `${value.toFixed(2)}${name === 'CLS' ? '' : 'ms'}`,
                name
              ]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="LCP"
              stroke={getMetricColor('LCP')}
              dot={false}
              name="Largest Contentful Paint"
            />
            <Line
              type="monotone"
              dataKey="FCP"
              stroke={getMetricColor('FCP')}
              dot={false}
              name="First Contentful Paint"
            />
            <Line
              type="monotone"
              dataKey="CLS"
              stroke={getMetricColor('CLS')}
              dot={false}
              name="Cumulative Layout Shift"
            />
            <Line
              type="monotone"
              dataKey="FID"
              stroke={getMetricColor('FID')}
              dot={false}
              name="First Input Delay"
            />
            <Line
              type="monotone"
              dataKey="TTFB"
              stroke={getMetricColor('TTFB')}
              dot={false}
              name="Time to First Byte"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="resource-section">
        <h2>Resource Metrics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={metrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatTimestamp}
              interval="preserveStartEnd"
            />
            <YAxis />
            <Tooltip
              labelFormatter={formatTimestamp}
              formatter={(value: number) => [`${value.toFixed(2)}ms`]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="Resource"
              stroke={getMetricColor('Resource')}
              dot={false}
              name="Resource Load Time"
            />
            <Line
              type="monotone"
              dataKey="Navigation"
              stroke={getMetricColor('Navigation')}
              dot={false}
              name="Navigation Time"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonitoringDashboard;
