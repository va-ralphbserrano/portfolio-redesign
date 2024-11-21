import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { classNames } from '@/utils/helpers';
import { CardProps, cardVariants } from './types';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardImage from './CardImage';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  touchable?: boolean;
  href?: string;
  onClick?: () => void;
  motionProps?: object;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
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
        'bg-white dark:bg-gray-800',
        'shadow-lg transition-shadow',
        touchable && 'hover:shadow-xl cursor-pointer',
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
      <Link to={href}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Image = CardImage;

Card.displayName = 'Card';

export default Card;
