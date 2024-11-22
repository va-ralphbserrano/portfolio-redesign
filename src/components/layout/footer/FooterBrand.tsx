import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { footerLinkVariants } from './types';
import type { FooterSectionProps } from './types';

export const FooterBrand: React.FC<FooterSectionProps> = ({
  className
}) => {
  return (
    <motion.div variants={footerLinkVariants} className={className}>
      <Link to="/" className="inline-block">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
          Ralph.dev
        </h3>
      </Link>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
        Transforming ideas into exceptional digital experiences with modern web technologies and virtual assistance expertise.
      </p>
    </motion.div>
  );
};

FooterBrand.displayName = 'FooterBrand';

export default FooterBrand;
