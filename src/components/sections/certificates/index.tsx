import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/common/SectionHeading';
import { certificates } from '@/data/certificates';
import { ResponsiveImage } from '@/components/common/ResponsiveImage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { HiExternalLink } from 'react-icons/hi';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Certificates: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <SectionHeading
            title="Certificates & Achievements"
            subtitle="Professional certifications and recognition"
            className="mb-6"
          />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of my professional certifications, achievements, and recognition from various organizations and institutions.
          </p>
        </motion.div>

        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="certificates-swiper"
        >
          {certificates.map((certificate) => (
            <SwiperSlide key={certificate.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="relative aspect-[4/3]">
                  <ResponsiveImage
                    src={certificate.image}
                    alt={certificate.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {certificate.title}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-600 dark:text-gray-400">
                      {certificate.issuer}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {certificate.date}
                    </p>
                    {certificate.link && (
                      <a
                        href={certificate.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        <span>Verify Certificate</span>
                        <HiExternalLink className="ml-1 w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Certificates;
