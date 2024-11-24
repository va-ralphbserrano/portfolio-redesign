import { classNames } from '@/shared/utils/helpers';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';

// Types
interface WithChildren {
  children: React.ReactNode;
}

interface WithClassName {
  className?: string;
}

interface BaseCardProps extends WithChildren, WithClassName {
  children: React.ReactNode;
}

interface CardProps extends WithChildren, WithClassName {
  variant?: CardVariant;
  elevation?: CardElevation;
  touchable?: boolean;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  motionProps?: HTMLMotionProps<'div'>;
  style?: React.CSSProperties;
}

interface ImageProps extends WithClassName {
  src: string;
  alt: string;
}

// Constants
const variants = {
  normal: 'bg-white dark:bg-gray-800',
  glass: 'backdrop-blur-lg bg-white/75 dark:bg-gray-900/75',
  gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900'
} as const;

const elevations = {
  none: '',
  sm: 'shadow-sm hover:shadow',
  md: 'shadow-md hover:shadow-lg',
  lg: 'shadow-lg hover:shadow-xl'
} as const;

const cardVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 }
} as const;

type CardVariant = keyof typeof variants;
type CardElevation = keyof typeof elevations;

// Sub-components
const CardHeader: React.FC<BaseCardProps> = ({ children, className }) => (
  <div className={classNames('px-6 py-4 border-b border-gray-200 dark:border-gray-700', className)}>
    {children}
  </div>
);

const CardBody: React.FC<BaseCardProps> = ({ children, className }) => (
  <div className={classNames('px-6 py-4', className)}>{children}</div>
);

const CardFooter: React.FC<BaseCardProps> = ({ children, className }) => (
  <div className={classNames('px-6 py-4 border-t border-gray-200 dark:border-gray-700', className)}>
    {children}
  </div>
);

const CardImage: React.FC<ImageProps> = ({ src, alt, className }) => (
  <div className={classNames('relative aspect-video', className)}>
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>
);

// Main Card component
export const Card: React.FC<CardProps> & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
  Image: typeof CardImage;
} = ({
  children,
  className,
  variant = 'normal',
  elevation = 'md',
  touchable = false,
  href,
  onClick,
  motionProps,
  ...props
}) => {
  const cardContent = (
    <motion.div
      {...(touchable && {
        initial: 'initial',
        whileHover: 'hover',
        whileTap: 'tap',
        variants: cardVariants,
      })}
      {...motionProps}
      className={classNames(
        'overflow-hidden rounded-xl',
        variants[variant],
        elevations[elevation],
        touchable && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <Link to={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

// Attach sub-components
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Image = CardImage;
