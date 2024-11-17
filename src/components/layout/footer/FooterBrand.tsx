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
        <h3 className="text-2xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
            Ralph
          </span>
          <span className="text-gray-700 dark:text-gray-300">.dev</span>
        </h3>
      </Link>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        Transforming ideas into exceptional digital experiences with modern web technologies and virtual assistance expertise.
      </p>
    </motion.div>
  );
};

FooterBrand.displayName = 'FooterBrand';

export default FooterBrand;
