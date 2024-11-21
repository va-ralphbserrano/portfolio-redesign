import React from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import { FooterLinkList } from './FooterLinkList';
import type { FooterLink } from './FooterLinkList';
import type { FooterSectionProps } from './types';

const socialLinks: FooterLink[] = [
  {
    name: 'GitHub',
    path: 'https://github.com/va-ralphbserrano',
    icon: FaGithub,
    isExternal: true
  },
  {
    name: 'LinkedIn',
    path: 'https://www.linkedin.com/in/ralphbserrano/',
    icon: FaLinkedin,
    isExternal: true
  },
  {
    name: 'Upwork',
    path: 'https://www.upwork.com/freelancers/~01fc7b069d50ef3e6c?viewMode=1',
    icon: SiUpwork,
    isExternal: true
  },
  {
    name: 'Facebook',
    path: 'https://www.facebook.com/va.ralphbserrano/',
    icon: FaFacebook,
    isExternal: true
  },
  {
    name: 'Instagram',
    path: 'https://www.instagram.com/half21dead/',
    icon: FaInstagram,
    isExternal: true
  },
  {
    name: 'YouTube',
    path: 'https://www.youtube.com/@RalphBernardSerrano',
    icon: FaYoutube,
    isExternal: true
  }
];

export const FooterSocial: React.FC<FooterSectionProps> = ({
  className
}) => (
  <FooterLinkList
    title="Connect"
    links={socialLinks}
    className={className}
  />
);

FooterSocial.displayName = 'FooterSocial';

export default FooterSocial;
