import React from 'react';
import { motion } from 'framer-motion';
import { HiHeart } from 'react-icons/hi';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram
} from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: FaGithub
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      icon: FaLinkedin
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/yourusername',
      icon: FaTwitter
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/yourusername',
      icon: FaInstagram
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-900 py-12 mt-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ralph<span className="text-primary-500">.dev</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Creating amazing digital experiences with modern web technologies.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Connect with Me
            </h4>
            <div className="flex justify-center space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300"
                  aria-label={link.name}
                >
                  <link.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Email: hello@yourwebsite.com
              <br />
              Location: Your Location
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center">
            Made with{' '}
            <HiHeart className="w-5 h-5 text-red-500 mx-1" />{' '}
            by Ralph Bernard Serrano
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
