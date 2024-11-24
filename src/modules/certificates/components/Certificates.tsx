import React from 'react';
import { motion } from 'framer-motion';

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  description: string;
}

interface CertificatesProps {
  certificates: Certificate[];
}

export const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Certifications</h2>
          <p className="text-lg text-gray-600">Professional certifications and achievements</p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{cert.title}</h3>
                <p className="text-gray-600 mb-4">{cert.issuer}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{cert.date}</span>
                  {cert.description && (
                    <p className="text-gray-600">{cert.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
