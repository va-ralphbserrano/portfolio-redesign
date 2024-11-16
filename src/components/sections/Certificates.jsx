import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { certificates } from './portfolio/ProjectData';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Certificates = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Certificates & Achievements</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Professional certifications and achievements showcasing expertise in virtual assistance and digital skills
          </p>
        </motion.div>

        <div className="max-w-[1000px] mx-auto">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards, Pagination, Navigation, Autoplay]}
            pagination={{
              clickable: true,
              dynamicBullets: true
            }}
            navigation={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            className="certificates-swiper"
          >
            {certificates.map((cert) => (
              <SwiperSlide key={cert.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 shadow-lg"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="absolute top-0 left-0 w-full h-full object-contain bg-white/80 dark:bg-gray-900/80 p-4"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary-500/30 text-primary-200 mb-3">
                          {cert.category === 'achievement' ? 'Achievement' : 'Certification'}
                        </span>
                        <h3 className="text-xl font-bold mb-2">
                          {cert.title}
                        </h3>
                        <p className="text-gray-200">
                          {cert.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .certificates-swiper {
          padding: 2rem 0;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
        }
        .swiper-slide {
          background: transparent;
          width: 100%;
          max-width: 900px;
          height: auto;
          aspect-ratio: 4/3;
        }
        .swiper-slide img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: var(--primary-color);
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: white;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px;
        }
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(46, 204, 113, 0.2);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: var(--primary-color);
          transform: scale(1.2);
        }
        .swiper-container {
          padding: 16px;
        }
        .swiper-slide-active {
          z-index: 10;
        }
        .swiper-wrapper {
          align-items: center;
        }
      `}</style>
    </section>
  );
};

export default Certificates;
