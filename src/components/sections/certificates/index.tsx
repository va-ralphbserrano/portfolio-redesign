import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { containerVariants, itemVariants } from '@/utils/animations';
import CertificateCard from './CertificateCard';

// Import all certificate images
const certificateImages = import.meta.glob('@/assets/images/certificate/*.png', { eager: true });

// Helper function to get image URL safely
const getImageUrl = (filename: string): string => {
  const key = Object.keys(certificateImages).find(path => path.includes(filename));
  return key ? (certificateImages[key] as { default: string }).default : '';
};

export interface Certificate {
  id: string;
  title: string;
  image: string;
  description: string;
  issuer: string;
  date: string;
  labels?: string[];
}

export const certificates: Certificate[] = [
  {
    id: 'amazon-va',
    title: 'Amazon Virtual Assistant Certification',
    image: getImageUrl('amazon-va.png'),
    description: 'Advanced certification in Amazon marketplace management, product optimization, and seller account operations. Expertise in inventory management, listing optimization, and performance analytics.',
    issuer: 'Surge Freelancing Marketplace',
    date: '2024',
    labels: ['Amazon Marketplace', 'E-commerce', 'Business Operations']
  },
  {
    id: 'apprenticeship',
    title: 'Executive Virtual Assistant Program',
    image: getImageUrl('apprenticeship-certificate.png'),
    description: 'Comprehensive training in high-level executive support, including project management, business communications, and strategic planning. Specialized in remote team collaboration and digital workflow optimization.',
    issuer: 'Surge Freelancing Marketplace',
    date: '2024',
    labels: ['Executive Support', 'Project Management', 'Business Strategy']
  },
  {
    id: 'content-marketing',
    title: 'Digital Content Marketing Specialist',
    image: getImageUrl('content-marketing.png'),
    description: 'Advanced certification in digital content strategy, SEO optimization, and multi-platform content creation. Proficient in analytics-driven content planning and audience engagement strategies.',
    issuer: 'Surge Freelancing Marketplace',
    date: '2024',
    labels: ['Content Strategy', 'Digital Marketing', 'SEO']
  },
  {
    id: 'freelancing-brand',
    title: 'Professional Brand Development',
    image: getImageUrl('freelancing-brand.png'),
    description: 'Recognition for excellence in personal brand development and digital presence optimization. Expertise in professional networking, client relationship management, and service positioning.',
    issuer: 'Surge Freelancing Marketplace',
    date: '2024',
    labels: ['Brand Strategy', 'Professional Development', 'Client Relations']
  },
  {
    id: 'masterclass',
    title: 'Masterclass Virtual Assistant',
    image: getImageUrl('masterclass-certificate.png'),
    description: 'Advanced certification in comprehensive virtual assistance services, including executive support, digital workflow management, and business process optimization. Expertise in remote collaboration and administrative excellence.',
    issuer: 'Surge Freelancing Marketplace',
    date: '2024',
    labels: ['Virtual Assistance', 'Administrative Excellence', 'Digital Operations']
  },
  {
    id: 'website-management',
    title: 'Digital Platform Management',
    image: getImageUrl('website-management.png'),
    description: 'Advanced certification in website administration, content management systems, and digital platform optimization. Expertise in user experience enhancement and technical maintenance protocols.',
    issuer: 'Surge Freelancing Marketplace',
    date: '2024',
    labels: ['Website Administration', 'Technical Management', 'UX Optimization']
  }
].filter(cert => cert.image); // Only show certificates with valid images

const Certificates = () => {
  return (
    <section
      id="certificates"
      className={classNames(
        'relative py-24 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900',
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            Professional Excellence
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Certifications & Achievements
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of professional certifications demonstrating expertise in virtual business management, digital marketing, and technical operations
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              variants={itemVariants}
              custom={{ delay: index * 0.1 }}
            >
              <CertificateCard
                certificate={certificate}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
