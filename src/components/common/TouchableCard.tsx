import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Link } from 'react-router-dom';
import { classNames } from '@/utils/helpers';

interface TouchableCardBaseProps {
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

type TouchableCardProps = TouchableCardBaseProps & Omit<HTMLMotionProps<'div'>, keyof TouchableCardBaseProps>;

const cardVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 }
} as const;

export const TouchableCard: React.FC<TouchableCardProps> = ({
  href,
  className,
  children,
  onClick,
  ...props
}) => {
  const motionProps = {
    initial: 'initial',
    whileHover: 'hover',
    whileTap: 'tap',
    variants: cardVariants,
    className: classNames(
      'relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg transition-shadow hover:shadow-xl',
      className
    ),
    onClick,
    ...props
  };

  if (href) {
    return (
      <Link to={href}>
        <motion.div {...motionProps}>
          {children}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.div {...motionProps}>
      {children}
    </motion.div>
  );
};

TouchableCard.displayName = 'TouchableCard';

export default TouchableCard;
