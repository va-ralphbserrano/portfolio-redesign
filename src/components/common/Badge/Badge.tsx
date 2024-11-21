import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { classNames } from '@/utils/helpers';
import { BadgeProps, variants, sizes } from './types';
import { badgeAnimationVariants } from './animations';
import { DismissButton } from './DismissButton';

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({
  children,
  className,
  color = 'primary',
  variant = 'solid',
  size = 'md',
  rounded = true,
  animate = true,
  icon: Icon,
  dismissible,
  onDismiss,
  ...props
}, ref) => {
  const content = (
    <>
      {Icon && (
        <Icon
          className={classNames(
            'mr-1',
            size === 'sm' && 'w-3 h-3',
            size === 'md' && 'w-4 h-4',
            size === 'lg' && 'w-5 h-5'
          )}
        />
      )}
      {children}
      {dismissible && onDismiss && (
        <DismissButton size={size} onDismiss={onDismiss} />
      )}
    </>
  );

  const commonClassName = classNames(
    'inline-flex items-center font-medium',
    variants[variant][color],
    sizes[size],
    rounded && 'rounded-full',
    className
  );

  if (!animate) {
    return (
      <span
        ref={ref}
        className={commonClassName}
        {...(props as React.HTMLAttributes<HTMLSpanElement>)}
      >
        {content}
      </span>
    );
  }

  return (
    <motion.span
      ref={ref}
      className={commonClassName}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      whileTap="tap"
      variants={badgeAnimationVariants}
      {...(props as Omit<HTMLMotionProps<'span'>, 'animate'>)}
    >
      {content}
    </motion.span>
  );
});

Badge.displayName = 'Badge';

export default Badge;

