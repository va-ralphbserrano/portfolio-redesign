import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight, HiDownload } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const HeroContent = () => {
  const navigate = useNavigate();
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const handleHireMe = () => {
    navigate('/contact');
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.5,
            staggerChildren: 0.1
          }
        }
      }}
      className="relative z-10"
    >
      <motion.span
        variants={itemVariants}
        className="inline-block px-6 py-3 rounded-full bg-white/5 dark:bg-gray-900/20 backdrop-blur-[2px] border border-white/10 dark:border-gray-700/20 text-gray-800 dark:text-gray-200 text-base font-medium mb-8 tracking-wide shadow-lg"
      >
        Virtual Assistant & Web Developer
      </motion.span>

      <motion.h1
        variants={itemVariants}
        className="text-5xl md:text-7xl font-bold mb-6 font-display leading-tight"
      >
        <span className="text-gray-900 dark:text-white">Hi, I'm </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-400 to-blue-500">
          Ralph
        </span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-lg"
      >
        With over 13 years of expertise in project management and technical support, I specialize in helping businesses streamline their operations and achieve digital excellence. My diverse skill set spans web development, video editing, and virtual assistance, enabling me to deliver comprehensive solutions that drive growth and efficiency.
      </motion.p>

      <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
        <button
          onClick={handleHireMe}
          className="group relative inline-flex items-center px-8 py-3.5 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 text-white overflow-hidden shadow-lg transition-all duration-300 hover:shadow-primary-500/25 hover:scale-[1.02]"
        >
          <span className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300" />
          <span className="relative flex items-center">
            Hire Me
            <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </button>
        <a
          href="/portfolio-redesign/assets/docs/resume.pdf"
          download="Ralph_Bernard_Serrano_CV.pdf"
          className="group relative inline-flex items-center px-8 py-3.5 rounded-full bg-white/5 dark:bg-gray-900/20 backdrop-blur-[2px] border border-white/10 dark:border-gray-700/20 text-gray-800 dark:text-gray-200 overflow-hidden shadow-lg transition-all duration-300 hover:shadow-white/25 hover:scale-[1.02]"
        >
          <span className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300" />
          <span className="relative flex items-center">
            Download CV
            <HiDownload className="ml-2 group-hover:translate-y-0.5 transition-transform duration-300" />
          </span>
        </a>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
