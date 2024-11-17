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
import { classNames } from '../../utils/helpers';
import { FooterProps, footerVariants, footerLinkVariants } from './types';
import type { IconType } from 'react-icons';

interface SocialLink {
  name: string;
  url: string;
  icon: IconType;
}

interface QuickLink {
  name: string;
  path: string;
}

export const Footer: React.FC<FooterProps> = ({
  className
}) => {
  const currentYear = new Date().getFullYear();

  const socialLinks: SocialLink[] = [
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

  const quickLinks: QuickLink[] = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <footer className={classNames(
      'bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800',
      className
    )}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <motion.div
            variants={footerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A passionate Virtual Assistant and Web Developer dedicated to creating exceptional digital experiences.
            </p>
            <div className="flex items-center space-x-4">
              <HiMail className="text-primary-600 dark:text-primary-400" />
              <span className="text-gray-600 dark:text-gray-400">
                ralph.b.serrano@gmail.com
              </span>
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <HiPhone className="text-primary-600 dark:text-primary-400" />
              <span className="text-gray-600 dark:text-gray-400">
                +63 995 846 2469
              </span>
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <HiLocationMarker className="text-primary-600 dark:text-primary-400" />
              <span className="text-gray-600 dark:text-gray-400">
                Muntinlupa City, Philippines
              </span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={footerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="col-span-1"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <motion.li
                  key={link.name}
                  variants={footerLinkVariants}
                >
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={footerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="col-span-1"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Follow Me
            </h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={footerLinkVariants}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  title={link.name}
                >
                  <link.icon className="w-6 h-6" />
                  <span className="sr-only">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-600 dark:text-gray-400">
            &copy; {currentYear} Ralph Bernard Serrano. Made with{' '}
            <HiHeart className="inline-block text-red-500" /> using React &amp; TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';

export default Footer;
