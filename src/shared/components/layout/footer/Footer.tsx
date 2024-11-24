import { motion } from 'framer-motion';
import { classNames } from '@/shared/utils/helpers';
import { FooterProps, footerVariants } from './types';
import { FooterBrand } from './FooterBrand';
import { FooterLinks } from './FooterLinks';
import { FooterContact } from './FooterContact';
import { FooterSocial } from './FooterSocial';
import { FooterBottom } from './FooterBottom';

export const Footer: React.FC<FooterProps> = ({
  className
}) => {
  return (
    <footer className={classNames('relative mt-20', className)}>
      {/* Background with gradient and blur effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-gray-50/80 to-white dark:from-gray-900/50 dark:via-gray-800/80 dark:to-gray-900 backdrop-blur-sm -z-10" />

      {/* Main Footer Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={footerVariants}
        className="container mx-auto px-4 pt-16 pb-8"
      >
        {/* Top Section with Brand and Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Brand and Description */}
          <div className="lg:col-span-4">
            <FooterBrand className="space-y-4" />
          </div>

          {/* Navigation and Social Links */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <FooterLinks className="space-y-4" />
            <FooterContact className="space-y-4" />
            <FooterSocial className="space-y-4" />
          </div>
        </div>

        {/* Footer Bottom */}
        <FooterBottom className="pt-8 border-t border-gray-200/10 dark:border-gray-800/50" />
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-primary-500/5 via-transparent to-transparent transform rotate-12 blur-xl" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-l from-blue-500/5 via-transparent to-transparent transform -rotate-12 blur-xl" />
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';

export default Footer;
