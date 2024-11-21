import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/utils/helpers';

interface CertificateCardProps {
  certificate: {
    id: string;
    title: string;
    image: string;
    description: string;
    issuer: string;
    date?: string;
    url?: string;
  };
  onClick: () => void;
  className?: string;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  onClick,
  className
}) => {
  return (
    <motion.div
      onClick={(e) => {
        if (window.innerWidth >= 1024) {
          onClick();
        }
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={classNames(
        'group relative overflow-hidden rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50',
        'shadow-lg hover:shadow-xl transition-all duration-300',
        'lg:cursor-pointer',
        className
      )}
    >
      <div className="relative h-full">
        {/* Image Container */}
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={certificate.image}
            alt={certificate.title}
            className={classNames(
              'w-full h-full object-contain transition-transform duration-500',
              'lg:group-hover:scale-110'
            )}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/placeholder.jpg';
            }}
          />
        </div>

        {/* Mobile/Tablet content (visible below lg breakpoint) */}
        <div className="p-4 lg:hidden">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
            {certificate.title}
          </h3>
          <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">
            {certificate.issuer}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            View Details
          </button>
        </div>

        {/* Desktop hover overlay (visible from lg breakpoint) */}
        <div className="absolute inset-0 bg-black/80 dark:bg-gray-900/90 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden lg:block">
          <div className="p-6 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                {certificate.title}
              </h3>
              <div className="text-sm text-primary-400 font-medium transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-150">
                {certificate.issuer}
              </div>
              <p className="text-sm text-gray-300 line-clamp-3 transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-200">
                {certificate.description}
              </p>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-300"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateCard;
