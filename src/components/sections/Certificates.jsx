import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import certificate images
import apprenticeship from '@images/certificate/Apprenticeship Certificate.png';
import masterclass from '@images/certificate/Gold Certificate Masterclass virtual assistant.png';
import freelancingBrand from '@images/certificate/Best in Setting a Freelancing Brand.png';
import websiteManagement from '@images/certificate/Best in Website Management.png';
import amazonVA from '@images/certificate/Getting Hired with these amazon virtual assistant task.png';
import contentMarketing from '@images/certificate/Content Marketing Strategy in social media.png';

const Certificates = () => {
  const certificates = [
    {
      id: 1,
      title: "Executive Assistant Apprenticeship",
      description: "Surge Freelancing Marketplace, 2024",
      image: apprenticeship
    },
    {
      id: 2,
      title: "Masterclass in Virtual Assistant",
      description: "Surge Freelancing Marketplace, 2024",
      image: masterclass
    },
    {
      id: 3,
      title: "Best in Setting a Freelancing Brand",
      description: "Surge Freelancing Marketplace, 2024",
      image: freelancingBrand
    },
    {
      id: 4,
      title: "Best in Website Management",
      description: "Surge Freelancing Marketplace, 2024",
      image: websiteManagement
    },
    {
      id: 5,
      title: "Amazon Virtual Assistant Tasks",
      description: "Surge Freelancing Marketplace, 2024",
      image: amazonVA
    },
    {
      id: 6,
      title: "Content Marketing Strategy",
      description: "Surge Freelancing Marketplace, 2024",
      image: contentMarketing
    }
  ];

  return (
    <section id="certificates" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold mb-5 text-gray-800 dark:text-white">Certificates</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professional certifications and achievements from Surge Freelancing Marketplace
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
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            className="certificates-swiper"
          >
            {certificates.map((cert) => (
              <SwiperSlide key={cert.id}>
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                  <div className="relative pt-[75%]">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="absolute top-0 left-0 w-full h-full object-contain bg-white dark:bg-gray-900 p-5"
                    />
                  </div>
                  <div className="p-7 text-center">
                    <h3 className="text-xl font-bold mb-2.5 text-gray-800 dark:text-white">
                      {cert.title}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-300">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .certificates-swiper {
          padding: 2rem 0;
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
        }
        .swiper-slide {
          background: transparent;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #2ecc71;
          width: 44px;
          height: 44px;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
        }
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
        }
        .swiper-pagination-bullet-active {
          background: #2ecc71;
        }
        .swiper-container {
          padding: 16px;
        }
      `}</style>
    </section>
  );
};

export default Certificates;
