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
}) => {
  const renderLink = (link: FooterLink) => {
    const linkContent = (
      <>
        {link.icon && <link.icon className="w-4 h-4" />}
        <span>{link.name}</span>
      </>
    );

    const linkClasses = 
      'text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300 flex items-center gap-1';

    if (link.isExternal) {
      return (
        <a
          href={link.path}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClasses}
        >
          {linkContent}
        </a>
      );
    }

    return (
      <Link to={link.path} className={linkClasses}>
        {linkContent}
      </Link>
    );
  };

  return (
    <motion.div variants={footerLinkVariants} className={className}>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.path}>{renderLink(link)}</li>
        ))}
      </ul>
    </motion.div>
  );
};

FooterLinkList.displayName = 'FooterLinkList';

export default FooterLinkList;
