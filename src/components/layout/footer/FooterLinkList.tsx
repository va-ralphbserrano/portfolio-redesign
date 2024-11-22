import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { footerLinkVariants } from './types';

export interface FooterLink {
  name: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
  isExternal?: boolean;
}

export interface FooterLinkListProps {
  title: string;
  links: FooterLink[];
  className?: string;
}

export const FooterLinkList: React.FC<FooterLinkListProps> = ({
  title,
  links,
  className
}) => (
  <motion.div variants={footerLinkVariants} className={className}>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      {title}
    </h3>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <motion.li
          key={link.path}
          variants={{
            hidden: { opacity: 0, x: -10 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { delay: 0.1 * index }
            }
          }}
        >
          {link.isExternal ? (
            <a
              href={link.path}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {link.icon && <link.icon className="w-4 h-4" />}
              </span>
              {link.name}
            </a>
          ) : (
            <Link
              to={link.path}
              className="group flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {link.icon && <link.icon className="w-4 h-4" />}
              </span>
              {link.name}
            </Link>
          )}
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

FooterLinkList.displayName = 'FooterLinkList';

export default FooterLinkList;
