import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import { footerLinkVariants } from './types';
import type { FooterSectionProps } from './types';
import type { IconType } from 'react-icons';

interface SocialLink {
  name: string;
  url: string;
  icon: IconType;
}

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

export const FooterSocial: React.FC<FooterSectionProps> = ({
  className
}) => {
  return (
    <motion.div variants={footerLinkVariants} className={className}>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Connect</h4>
      <div className="flex flex-wrap gap-4">
        {socialLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={link.name}
          >
            <link.icon className="w-5 h-5" />
          </motion.a>
        ))}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Follow me on social media for updates and insights.
      </p>
    </motion.div>
  );
};

FooterSocial.displayName = 'FooterSocial';

export default FooterSocial;
