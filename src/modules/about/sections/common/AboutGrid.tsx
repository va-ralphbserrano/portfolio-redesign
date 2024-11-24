import { motion } from 'framer-motion';
import { serviceItemVariants } from '../../../services/components/types';
import { AboutGridProps } from '../../types';

export const AboutGrid: React.FC<AboutGridProps> = ({ features }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <motion.div
            key={feature.title}
            variants={serviceItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
            className="group relative"
          >
            <div className="h-full p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Feature Icon with Gradient Background */}
              <div className="relative w-16 h-16 mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center w-full h-full text-primary-500 dark:text-primary-400 text-3xl">
                  <Icon />
                </div>
              </div>

              {/* Feature Title */}
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Feature Description */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

AboutGrid.displayName = 'AboutGrid';

export default AboutGrid;
