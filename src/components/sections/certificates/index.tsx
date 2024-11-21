import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '@/components/common/Modal';
import { SectionHeading } from '@/components/common/SectionHeading';
import { CertificateCard } from './CertificateCard';

// Import certificate images
import amazonVA from '@/assets/images/certificate/amazon-va.png';
import apprenticeship from '@/assets/images/certificate/apprenticeship-certificate.png';
import contentMarketing from '@/assets/images/certificate/content-marketing.png';
import freelancingBrand from '@/assets/images/certificate/freelancing-brand.png';
import masterclass from '@/assets/images/certificate/masterclass-certificate.png';
import websiteManagement from '@/assets/images/certificate/website-management.png';

interface Certificate {
  id: string;
  title: string;
  image: string;
  description: string;
  issuer: string;
  date?: string;
  url?: string;
}

const certificates: Certificate[] = [
  {
    id: '1',
    title: 'Amazon Virtual Assistant',
    image: amazonVA,
    description: 'Specialized certification in Amazon Virtual Assistant services, covering product management, customer service, and marketplace operations.',
    issuer: 'Surge Freelancing Marketplace',
    date: '2024',
  },
  {
    id: '2',
    title: 'Executive Assistant Apprenticeship',
    image: apprenticeship,
    description: 'Comprehensive training in executive assistance, project management, and professional communication.',
    issuer: 'Surge Freelancing Marketplace',
    date: '2024',
  },
  {
    id: '3',
    title: 'Content Marketing',
    image: contentMarketing,
    description: 'Advanced certification in content marketing strategies, SEO, and digital content creation.',
    issuer: 'Surge Freelancing Marketplace',
    date: '2024',
  },
  {
    id: '4',
    title: 'Best in Setting a Freelancing Brand',
    image: freelancingBrand,
    description: 'Recognition for excellence in personal branding and freelance business development.',
    issuer: 'Surge Freelancing Marketplace',
    date: '2024',
  },
  {
    id: '5',
    title: 'Virtual Assistant Masterclass',
    image: masterclass,
    description: 'Comprehensive training in virtual assistance, covering productivity tools, time management, and client relations.',
    issuer: 'Surge Freelancing Marketplace',
    date: '2024',
  },
  {
    id: '6',
    title: 'Website Management',
    image: websiteManagement,
    description: 'Professional certification in website management, maintenance, and optimization.',
    issuer: 'Surge Freelancing Marketplace',
    date: '2024',
  }
];

export const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCertificate(null), 200); // Delay clearing the certificate until after animation
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/50" />
      <div className="container relative px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <SectionHeading
            title="Certificates"
            subtitle="Professional certifications and achievements"
            className="mb-6"
          />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse through my professional certifications from Surge Freelancing Marketplace, showcasing expertise in virtual assistance, content creation, and digital marketing. Each certificate represents dedicated learning and practical experience in delivering high-quality freelance services.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <CertificateCard
                key={certificate.id}
                title={certificate.title}
                image={certificate.image}
                description={certificate.description}
                issuer={certificate.issuer}
                date={certificate.date || ''}
                onClick={() => handleOpenModal(certificate)}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          size="xl"
          showClose
          className="p-0"
        >
          {selectedCertificate && (
            <div className="relative w-full h-full">
              <img
                src={selectedCertificate.image}
                alt={selectedCertificate.title}
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default Certificates;
