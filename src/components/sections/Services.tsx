import React from 'react';
import { motion } from 'framer-motion';
import { servicesData } from '@/data/services';
import { Section } from '@/components/layout/Section';
import { Grid } from '@/components/layout/Grid';
import { TouchableCard } from '@/components/common/TouchableCard';

export const Services: React.FC = () => {
  return (
    <Section
      id="services"
      className="bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 sm:mb-16"
      >
        <h2 className="text-fluid-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
          {servicesData.title}
        </h2>
        <p className="text-fluid-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {servicesData.description}
        </p>
      </motion.div>

      <Grid
        cols={{ xs: 1, sm: 2, lg: 3 }}
        gap={8}
      >
        {servicesData.services.map((service) => {
          const Icon = service.icon;
          return (
            <TouchableCard
              key={service.id}
              className="group h-full"
              onClick={() => window.location.href = `/services#${service.id}`}
            >
              <div className="p-6 sm:p-8 flex flex-col h-full">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-fluid-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-fluid-base text-gray-700 dark:text-gray-300">
                    {service.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={`${service.id}-feature-${featureIndex}`}
                        className="flex items-center text-gray-700 dark:text-gray-300"
                      >
                        <svg
                          className="w-4 h-4 mr-2 text-primary-600 dark:text-primary-400 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TouchableCard>
          );
        })}
      </Grid>
    </Section>
  );
};

Services.displayName = 'Services';

export default Services;
