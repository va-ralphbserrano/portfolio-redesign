import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertingService } from '@/services/AlertingService';
import { ErrorReportingService } from '@/services/ErrorReportingService';
import { MonitoringService } from '@/services/MonitoringService';
import { classNames } from '@/utils/helpers';

interface MonitoringMetrics {
  performance: number;
  accessibility: number;
  seo: number;
  bestPractices: number;
}

interface MonitoringDashboardProps {
  className?: string;
}

const MonitoringDashboard: React.FC<MonitoringDashboardProps> = ({ className }) => {
  const [metrics, setMetrics] = useState<MonitoringMetrics>({
    performance: 0,
    accessibility: 0,
    seo: 0,
    bestPractices: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const monitoringService = new MonitoringService();
        const data = await monitoringService.getMetrics();
        setMetrics(data);
      } catch (error) {
        ErrorReportingService.reportError(error as Error);
        AlertingService.alert('Error fetching metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={classNames('p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg', className)}
    >
      <h2 className="text-2xl font-bold mb-6">Performance Metrics</h2>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(metrics).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-4xl font-bold text-primary-500">{value}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MonitoringDashboard;
