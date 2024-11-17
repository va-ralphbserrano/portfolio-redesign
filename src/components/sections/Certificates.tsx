import React from 'react';
import { motion } from 'framer-motion';
import Image from '../common/Image';
import { certificates } from '@/data/certificates';
import { classNames } from '@/utils/helpers';
import { WithClassName } from '@/types/component';

export interface CertificatesProps extends WithClassName {}

export const Certificates: React.FC<CertificatesProps> = ({ className }) => {
  return (
    <section className={classNames(
      'py-20 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900',
      className
    )}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Certificates & Achievements
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Professional certifications and achievements that showcase my expertise and commitment to continuous learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative aspect-video">
                <Image
                  src={certificate.image}
                  alt={certificate.title}
                  className="object-cover"
                  width={400}
                  height={225}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {certificate.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  {certificate.issuer}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {certificate.date}
                </p>
                {certificate.link && (
                  <a
                    href={certificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    Verify Certificate
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

Certificates.displayName = 'Certificates';

export default Certificates;
