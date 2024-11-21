import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { ServiceCardProps, serviceItemVariants } from './types';

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  className
}) => (
  <motion.div
    variants={serviceItemVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={index}
    className={classNames('group', className)}
  >
    <div className="h-full p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="mb-6 text-primary-500 dark:text-primary-400">
        {service.icon}
      </div>
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        {service.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {service.description}
      </p>
      <ul className="space-y-3">
        {service.features.map((feature, featureIndex) => (
          <motion.li
            key={featureIndex}
            variants={serviceItemVariants}
            custom={index + (featureIndex + 1)}
            whileHover={{ x: 4 }}
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-primary-400 mr-3" />
            {feature}
          </motion.li>
        ))}
      </ul>
    </div>
  </motion.div>
);

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
