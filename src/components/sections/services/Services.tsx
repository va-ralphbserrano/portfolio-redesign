import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '../../../utils/helpers';
import { ServicesProps, serviceItemVariants } from './types';
import { ServiceCard } from './ServiceCard';
import { services } from './serviceData';

const Services: React.FC<ServicesProps> = ({
  className
}) => {
  return (
    <section
      className={classNames(
        'py-20 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={serviceItemVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">My Services</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Delivering comprehensive digital solutions to help businesses thrive in the modern landscape
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
