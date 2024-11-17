import { motion, MotionStyle, MotionProps } from 'framer-motion';
import { WithChildren, WithClassName } from '@/types/component';
import { classNames } from '@/utils/helpers';

interface CardProps extends WithChildren, WithClassName {
  hoverable?: boolean;
  style?: MotionStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = true,
  style
}) => {
  const motionProps: Partial<MotionProps> = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    ...(hoverable && { whileHover: { y: -5 } }),
    transition: { duration: 0.2 }
  };

  return (
    <motion.div
      className={classNames(
        'rounded-lg bg-white dark:bg-gray-800 shadow-lg',
        className || ''
      )}
      {...motionProps}
      style={style || {}}
    >
      {children}
    </motion.div>
  );
};

Card.displayName = 'Card';

export default Card;
