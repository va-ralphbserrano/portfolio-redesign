import React from 'react';
import { motion } from 'framer-motion';
import { servicesData } from '@/data/services';
import { ServiceCard } from './services/ServiceCard';
import { getTechIcon } from '@/utils/icons';

const Services: React.FC = () => {
  const services = servicesData.services.map(service => ({
    ...service,
    icon: getTechIcon(service.icon)({ className: "w-8 h-8" })
  }));

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {servicesData.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {servicesData.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

Services.displayName = 'Services';

export default Services;
