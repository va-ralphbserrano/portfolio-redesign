import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  HiHeart,
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiExternalLink
} from 'react-icons/hi';
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/va-ralphbserrano',
      icon: FaGithub
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ralphbserrano/',
      icon: FaLinkedin
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@RalphBernardSerrano',
      icon: FaYoutube
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/va.ralphbserrano/',
      icon: FaFacebook
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/half21dead/',
      icon: FaInstagram
    },
    {
      name: 'Upwork',
      url: 'https://www.upwork.com/freelancers/~01fc7b069d50ef3e6c?viewMode=1',
      icon: SiUpwork
    }
  ];

  const quickLinks = [
    { name: 'About Me', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Contact', path: '/contact' }
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
    <footer className="relative mt-20">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900 -z-10" />

      {/* Main Footer Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="container mx-auto px-4 pt-16 pb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Link to="/" className="inline-block">
              <h3 className="text-2xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                  Ralph
                </span>
                <span className="text-gray-700 dark:text-gray-300">.dev</span>
              </h3>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Transforming ideas into exceptional digital experiences with modern web technologies and virtual assistance expertise.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300 flex items-center gap-1"
                  >
                    <HiExternalLink className="w-4 h-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:ralph.b.serrano@gmail.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <HiMail className="w-5 h-5" />
                  ralph.b.serrano@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+639958462469"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <HiPhone className="w-5 h-5" />
                  +63 995 846 2469
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/place/Muntinlupa,+Metro+Manila,+Philippines/@14.4079323,121.0107124,13z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <HiLocationMarker className="w-5 h-5" />
                  Muntinlupa City, Philippines
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Connect</h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Follow me on social media for updates and insights.
            </p>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400 flex items-center">
              Made with{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mx-1"
              >
                <HiHeart className="w-5 h-5 text-red-500" />
              </motion.span>{' '}
              by Ralph Bernard Serrano
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              &copy; {currentYear} All rights reserved.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
