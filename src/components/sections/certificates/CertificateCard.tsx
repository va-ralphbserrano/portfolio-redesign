import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { ResponsiveImage } from '@/components/common/ResponsiveImage';

interface CertificateCardProps {
  title: string;
  image: string;
  description: string;
  issuer: string;
  date: string;
  onClick?: () => void;
  className?: string;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  title,
  image,
  description,
  issuer,
  date,
  onClick,
  className
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      className={classNames(
        'bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {/* Certificate Image */}
      <div className="relative aspect-video">
        <ResponsiveImage
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Certificate Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {description}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span>{issuer}</span>
          <span>{date}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateCard;
