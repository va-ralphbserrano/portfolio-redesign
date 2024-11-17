import { motion } from 'framer-motion';
import { classNames } from '../../../../utils/helpers';
import { AboutHeaderProps, aboutVariants } from './types';

export const AboutHeader: React.FC<AboutHeaderProps> = ({
  className
}) => {
  return (
    <motion.div
      variants={aboutVariants}
      className={classNames('text-center mb-16', className)}
    >
      <motion.h2
        variants={aboutVariants}
        className="text-4xl font-bold mb-6 text-gray-900 dark:text-white"
      >
        About Me
      </motion.h2>
      <motion.p
        variants={aboutVariants}
        className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
      >
        As a versatile professional with over 13 years of experience, I blend technical expertise with creative problem-solving.
        My journey spans AutoCAD design, web development, and virtual assistance, enabling me to deliver comprehensive solutions
        that drive business growth and efficiency.
      </motion.p>
    </motion.div>
  );
};

AboutHeader.displayName = 'AboutHeader';

export default AboutHeader;
