// import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MonitoringDashboard from '../components/MonitoringDashboard';

describe('MonitoringDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock fetch response
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        metrics: {
          ttfb: 100,
          fcp: 1000,
          lcp: 2500,
          cls: 0.1,
          fid: 100
        },
        resources: [
          {
            name: 'main.js',
            size: 50000,
            duration: 100
          }
        ]
      })
    });
  });

  it('renders dashboard header', () => {
    render(<MonitoringDashboard />);
    expect(screen.getByText('Performance Monitoring Dashboard')).toBeInTheDocument();
  });

  it('renders time range selector', () => {
    render(<MonitoringDashboard />);
    expect(screen.getByText('1 Hour')).toBeInTheDocument();
    expect(screen.getByText('24 Hours')).toBeInTheDocument();
    expect(screen.getByText('7 Days')).toBeInTheDocument();
    expect(screen.getByText('30 Days')).toBeInTheDocument();
  });

  it('changes time range on button click', () => {
    render(<MonitoringDashboard />);
    const hourButton = screen.getByText('24 Hours');
    fireEvent.click(hourButton);
    expect(hourButton).toHaveClass('active');
  });

  it('renders performance metrics section', () => {
    render(<MonitoringDashboard />);
    expect(screen.getByText('Performance Metrics')).toBeInTheDocument();
  });

  it('renders resource metrics section', () => {
    render(<MonitoringDashboard />);
    expect(screen.getByText('Resource Metrics')).toBeInTheDocument();
  });

  it('updates metrics when new data arrives', async () => {
    render(<MonitoringDashboard />);

    await waitFor(() => {
      expect(screen.getByTestId('ttfb-value')).toHaveTextContent('100ms');
      expect(screen.getByTestId('fcp-value')).toHaveTextContent('1000ms');
      expect(screen.getByTestId('lcp-value')).toHaveTextContent('2500ms');
    });

    expect(screen.getByTestId('resource-name')).toHaveTextContent('main.js');
    expect(screen.getByTestId('resource-size')).toHaveTextContent('49KB');
  });
});
