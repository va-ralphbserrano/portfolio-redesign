import { motion } from 'framer-motion';
import { classNames } from '../../../utils/helpers';
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
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900 -z-10" />

      {/* Main Footer Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={footerVariants}
        className="container mx-auto px-4 pt-16 pb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <FooterBrand className="space-y-4" />
          <FooterLinks className="space-y-4" />
          <FooterContact className="space-y-4" />
          <FooterSocial className="space-y-4" />
        </div>

        {/* Footer Bottom */}
        <FooterBottom className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800" />
      </motion.div>
    </footer>
  );
};

Footer.displayName = 'Footer';

export default Footer;
