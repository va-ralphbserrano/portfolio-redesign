import { motion, MotionStyle, MotionProps } from 'framer-motion';
import { classNames } from '../../utils/helpers';

const variants = {
  normal: 'bg-white dark:bg-gray-800',
  glass: 'backdrop-blur-lg bg-white/75 dark:bg-gray-900/75',
  dark: 'bg-gray-900 dark:bg-gray-800',
  transparent: 'bg-transparent'
} as const;

const elevations = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl'
} as const;

type Variant = keyof typeof variants;
type Elevation = keyof typeof elevations;

interface CardProps {
  className?: string;
  variant?: Variant;
  elevation?: Elevation;
  hover?: boolean;
  animate?: boolean;
  style?: MotionStyle;
  children: React.ReactNode;
}

interface CardComposition {
  Header: typeof Header;
  Body: typeof Body;
  Footer: typeof Footer;
  Image: typeof Image;
}

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'className'> {
  className?: string;
}

const Card: React.FC<CardProps> & CardComposition = ({
  children,
  className,
  variant = 'normal',
  elevation = 'md',
  hover = false,
  animate = true,
  style
}) => {
  const animationProps: Partial<MotionProps> = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    ...(hover && { whileHover: { y: -5 } }),
    transition: { duration: 0.3 }
  } : {};

  const commonClassName = classNames(
    'rounded-xl overflow-hidden transition-all duration-300',
    variants[variant],
    elevations[elevation],
    className
  );

  return (
    <motion.div
      className={commonClassName}
      {...animationProps}
      style={style || {}}
    >
      {children}
    </motion.div>
  );
};

const Header: React.FC<SectionProps> = ({ className, children, ...props }) => (
  <div
    className={classNames('px-6 py-4 border-b border-gray-100 dark:border-gray-700', className)}
    {...props}
  >
    {children}
  </div>
);

const Body: React.FC<SectionProps> = ({ className, children, ...props }) => (
  <div className={classNames('px-6 py-4', className)} {...props}>
    {children}
  </div>
);

const Footer: React.FC<SectionProps> = ({ className, children, ...props }) => (
  <div
    className={classNames('px-6 py-4 border-t border-gray-100 dark:border-gray-700', className)}
    {...props}
  >
    {children}
  </div>
);

const Image: React.FC<ImageProps> = ({ className, ...props }) => (
  <img className={classNames('w-full h-auto', className)} {...props} />
);

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;
Card.Image = Image;

Card.displayName = 'Card';
Header.displayName = 'Card.Header';
Body.displayName = 'Card.Body';
Footer.displayName = 'Card.Footer';
Image.displayName = 'Card.Image';

export default Card;
