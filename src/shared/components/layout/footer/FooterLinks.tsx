import React from 'react';
import { HiExternalLink } from 'react-icons/hi';
import { FooterLinkList } from './FooterLinkList';
import type { FooterLink } from './FooterLinkList';
import type { FooterSectionProps } from './types';

const quickLinks: FooterLink[] = [
  { name: 'About Me', path: '/about', icon: HiExternalLink },
  { name: 'Services', path: '/services', icon: HiExternalLink },
  { name: 'Portfolio', path: '/portfolio', icon: HiExternalLink },
  { name: 'Certificates', path: '/certificates', icon: HiExternalLink },
  { name: 'Contact', path: '/contact', icon: HiExternalLink }
];

export const FooterLinks: React.FC<FooterSectionProps> = ({
  className
}) => (
  <FooterLinkList
    title="Quick Links"
    links={quickLinks}
    className={className}
  />
);

FooterLinks.displayName = 'FooterLinks';

export default FooterLinks;
