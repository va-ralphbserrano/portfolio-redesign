import { classNames } from '@/shared/utils/helpers';
import { ContainerProps } from './types';

const Container: React.FC<ContainerProps> = ({ 
  children, 
  className,
  as: Component = 'div',
  fluid = false,
  gutter = true,
  ...props 
}) => {
  return (
    <Component
      className={classNames(
        'relative w-full',
        !fluid && [
          'mx-auto',
          gutter && [
            'px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-12',
            'mobile-padding'
          ],
          'max-w-[95%] xs:max-w-[90%] sm:max-w-[85%]',
          'sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl'
        ],
        'transition-[padding,max-width] duration-300 ease-out',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

Container.displayName = 'Container';

export default Container;
