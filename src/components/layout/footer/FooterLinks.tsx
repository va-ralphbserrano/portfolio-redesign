import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiExternalLink } from 'react-icons/hi';
import { footerLinkVariants } from './types';
import type { FooterSectionProps } from './types';

const quickLinks = [
  { name: 'About Me', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Certificates', path: '/certificates' },
  { name: 'Contact', path: '/contact' }
];

export const FooterLinks: React.FC<FooterSectionProps> = ({
  className
}) => {
  return (
    <motion.div variants={footerLinkVariants} className={className}>
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
  );
};

FooterLinks.displayName = 'FooterLinks';

export default FooterLinks;
