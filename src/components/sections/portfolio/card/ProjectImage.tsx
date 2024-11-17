import { motion, Variants } from 'framer-motion';
import { WithClassName } from '@/types/component';
import { classNames } from '@/utils/helpers';

interface ProjectImageProps extends WithClassName {
  image: {
    src: string;
    alt: string;
  };
}

const variants: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3
    }
  }
};

export const ProjectImage: React.FC<ProjectImageProps> = ({ image, className }) => {
  return (
    <motion.div
      className={classNames('relative aspect-video overflow-hidden', className)}
      whileHover="hover"
      variants={variants}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

ProjectImage.displayName = 'ProjectImage';

export default ProjectImage;
