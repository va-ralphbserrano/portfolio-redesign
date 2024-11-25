import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/shared/utils/helpers';
import { ServicesProps, serviceItemVariants } from './types';
import { ServiceCard } from './ServiceCard';
import { servicesData } from './serviceData';
import { SEO } from '@/shared/components/SEO';
import { useLocation } from 'react-router-dom';

// SEO metadata configuration
const metaConfig = {
  siteUrl: 'https://ralphserrano.dev',
  title: 'Ralph Serrano - Full Stack Developer',
  description: 'Full Stack Developer specializing in React, TypeScript, and Node.js. Creating modern web applications with a focus on performance and user experience.',
  author: 'Ralph Bernard Serrano',
  socialMedia: {
    github: 'https://github.com/ralphs',
    linkedin: 'https://linkedin.com/in/ralphserrano',
    youtube: 'https://youtube.com/@ralphserrano',
    facebook: 'https://facebook.com/ralphserrano',
    instagram: 'https://instagram.com/ralphserrano',
    upwork: 'https://www.upwork.com/freelancers/ralphserrano'
  }
};

const Services: React.FC<ServicesProps> = ({
  className
}) => {
  const location = useLocation();

  const route = {
    path: location.pathname,
    meta: {
      title: "Services - Technical Design, Web Development & Virtual Solutions | Ralph Serrano",
      description: "Professional services in AutoCAD Technical Design, Modern Web Development, and Virtual Assistance. Get expert solutions for your projects."
    }
  };

  return (
    <section
      className={classNames(
        'relative py-24 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900',
        className
      )}
    >
      <SEO
        title={route.meta.title}
        description={route.meta.description}
        servicesData={servicesData}
        route={route}
        metaConfig={metaConfig}
      />
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={serviceItemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            Professional Services
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {servicesData.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {servicesData.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {servicesData.services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              className={index >= 2 ? 'lg:col-span-1' : ''}
            />
          ))}
        </div>

        {/* Bottom Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
      </div>
    </section>
  );
};

Services.displayName = 'Services';

export default Services;
