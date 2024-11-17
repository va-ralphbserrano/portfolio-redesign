import { classNames } from '../../utils/helpers';
import { ContainerProps } from './types';

type ElementType = keyof JSX.IntrinsicElements;

export const Container = <T extends ElementType = 'div'>({
  children,
  className,
  as: Component = 'div' as T
}: ContainerProps<T>) => {
  const props = {
    className: classNames('container mx-auto px-4', className)
  };

  return (
    // @ts-expect-error - polymorphic component type inference
    <Component {...props}>
      {children}
    </Component>
  );
};

Container.displayName = 'Container';

export default Container;
