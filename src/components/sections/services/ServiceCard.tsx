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
    className={classNames('group relative', className)}
  >
    <div className="h-full p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Service Icon with Gradient Background */}
      <div className="relative w-16 h-16 mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
        <div className="relative flex items-center justify-center w-full h-full text-primary-500 dark:text-primary-400 text-3xl">
          {service.icon}
        </div>
      </div>

      {/* Service Title */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
        {service.title}
      </h3>

      {/* Service Description */}
      <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
        {service.description}
      </p>

      {/* Features List */}
      <ul className="space-y-4">
        {service.features.map((feature, featureIndex) => (
          <motion.li
            key={featureIndex}
            variants={serviceItemVariants}
            custom={index + (featureIndex + 1)}
            whileHover={{ x: 4 }}
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
          >
            <span className="w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400 mr-3" />
            <span className="text-sm">{feature}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  </motion.div>
);

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
