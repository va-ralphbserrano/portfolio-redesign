import { motion } from 'framer-motion';
import { HiHeart } from 'react-icons/hi';
import { footerLinkVariants } from './types';
import type { FooterSectionProps } from './types';

export const FooterBottom: React.FC<FooterSectionProps> = ({
  className
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.div variants={footerLinkVariants} className={className}>
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
  );
};

FooterBottom.displayName = 'FooterBottom';

export default FooterBottom;
