import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { Modal, ModalHeader, ModalBody } from '@/components/common/Modal';
import { Certificate } from '@/types/certificate';

interface CertificateCardProps {
  certificate: Certificate;
  className?: string;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, className = '' }) => {
  if (!certificate) {
    console.error('Certificate prop is undefined');
    return null;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Combine main image with gallery images
  const allImages = [certificate.image, ...(certificate.gallery || [])];

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
            {hasError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-gray-400 dark:text-gray-500">
                <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-center">Certificate image unavailable</span>
              </div>
            ) : (
              <img
                src={certificate.image}
                alt={certificate.title}
                className={classNames(
                  'w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300',
                  isLoading ? 'opacity-0' : 'opacity-100'
                )}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}
          </div>

          {/* Certificate Title */}
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
            {certificate.title}
          </h3>

          {/* Certificate Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {certificate.description}
          </p>

          {/* Technologies */}
          {certificate.technologies && (
            <div className="flex flex-wrap gap-2 mb-4">
              {certificate.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Spacer to push button to bottom */}
          <div className="flex-grow" />

          {/* View Certificate Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 rounded-lg transition-colors duration-300"
          >
            View Certificate
          </button>
        </div>
      </motion.div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="xl"
      >
        <ModalHeader onClose={() => setIsModalOpen(false)}>
          <h3 className="text-2xl font-bold">{certificate.title}</h3>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            {/* Certificate Images */}
            <div className="relative w-full h-[50vh] rounded-xl overflow-hidden">
              <img
                src={allImages[currentImageIndex]}
                alt={`${certificate.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain bg-gray-100 dark:bg-gray-900"
              />
              
              {/* Image Title Overlay */}
              {certificate.imageLabels && certificate.imageLabels[currentImageIndex] && (
                <div className="absolute top-4 left-4 px-4 py-2 bg-primary-500/80 dark:bg-primary-600/80 backdrop-blur-sm rounded-lg shadow-lg">
                  <span className="text-white font-medium">
                    {certificate.imageLabels[currentImageIndex]}
                  </span>
                </div>
              )}
              
              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Certificate Details */}
            <div className="space-y-3">
              <p className="text-gray-600 dark:text-gray-300">{certificate.description}</p>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Issued by {certificate.issuer}
                </span>
                <span className="text-primary-600 dark:text-primary-400 font-medium">
                  {certificate.date}
                </span>
              </div>

              {certificate.technologies && (
                <div>
                  <h4 className="font-semibold mb-2">Skills & Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {certificate.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {certificate.credentialUrl && (
                <div className="pt-4">
                  <a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    <span>View Credential</span>
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CertificateCard;
