import { classNames } from '../../utils/helpers';
import { SectionProps } from './types';

type ElementType = keyof JSX.IntrinsicElements;

export const Section = <T extends ElementType = 'section'>({
  children,
  className,
  id,
  as: Component = 'section' as T
}: SectionProps<T>) => {
  const props = {
    className: classNames('py-20', className),
    ...(id && { id })
  };

  return (
    // @ts-expect-error - polymorphic component type inference
    <Component {...props}>
      {children}
    </Component>
  );
};

Section.displayName = 'Section';

export default Section;
