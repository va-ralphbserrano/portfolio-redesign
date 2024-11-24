import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/shared/utils/helpers';
import { Modal, ModalHeader, ModalBody } from '@/components/common/Modal';
import { Certificate } from '../certificates';

interface CertificateCardProps {
  certificate: Certificate;
  className?: string;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, className = '' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Function to handle image loading
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Function to handle image error
  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className={classNames('group relative', className)}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="h-full p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
          {/* Certificate Image */}
          <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            
            {/* Loading Spinner */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
              </div>
            )}

            {/* Error State */}
            {hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <span className="text-gray-500 dark:text-gray-400">Failed to load image</span>
              </div>
            )}

            <img
              src={certificate.image}
              alt={`${certificate.title} Certificate`}
              className={classNames(
                'w-full h-full object-cover transition-opacity duration-300',
                isLoading || hasError ? 'opacity-0' : 'opacity-100'
              )}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>

          {/* Certificate Details */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {certificate.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-1">
              {certificate.description}
            </p>
            <div className="mt-auto">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{certificate.issuer}</span>
                <span className="text-gray-500 dark:text-gray-500">{certificate.date}</span>
              </div>
              {certificate.labels && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {certificate.labels.map((label, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Certificate Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalHeader onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-semibold">{certificate.title}</h2>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <img
              src={certificate.image}
              alt={`${certificate.title} Certificate`}
              className="w-full rounded-lg"
            />
            <div className="space-y-2">
              <p className="text-gray-700 dark:text-gray-300">{certificate.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{certificate.issuer}</span>
                <span className="text-gray-500 dark:text-gray-500">{certificate.date}</span>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CertificateCard;
