import { motion } from 'framer-motion';
import { classNames } from '../../../../utils/helpers';
import { AboutHeaderProps, aboutVariants } from './types';

export const AboutHeader: React.FC<AboutHeaderProps> = ({
  className
}) => {
  return (
    <motion.div
      variants={aboutVariants}
      className={classNames('text-center mb-20', className)}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-block mb-8"
      >
        <span className="inline-block px-6 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/40 text-primary-600 dark:text-primary-400 transform hover:scale-105 transition-transform duration-300">
          About Me
        </span>
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
      >
        Crafting Digital Experiences
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative max-w-3xl mx-auto"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-2xl opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-500" />
        <p className="relative text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100/80 dark:border-gray-700/50">
          As a versatile professional with over 13 years of experience, I blend technical expertise with creative problem-solving.
          My journey spans AutoCAD design, web development, and virtual assistance, enabling me to deliver comprehensive solutions
          that drive business growth and efficiency.
        </p>
      </motion.div>
    </motion.div>
  );
};

AboutHeader.displayName = 'AboutHeader';

export default AboutHeader;
