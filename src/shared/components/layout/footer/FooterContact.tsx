import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { footerLinkVariants } from './types';
import type { FooterSectionProps } from './types';

export const FooterContact: React.FC<FooterSectionProps> = ({
  className
}) => {
  return (
    <motion.div variants={footerLinkVariants} className={className}>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Contact</h4>
      <ul className="space-y-3">
        <li>
          <a
            href="mailto:ralph.b.serrano@gmail.com"
            className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300 flex items-center gap-2"
          >
            <HiMail className="w-6 h-6" />
            ralph.b.serrano@gmail.com
          </a>
        </li>
        <li>
          <a
            href="tel:+639958462469"
            className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300 flex items-center gap-2"
          >
            <HiPhone className="w-6 h-6" />
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
            <HiLocationMarker className="w-6 h-6" />
            Muntinlupa City, Philippines
          </a>
        </li>
      </ul>
    </motion.div>
  );
};

FooterContact.displayName = 'FooterContact';

export default FooterContact;
