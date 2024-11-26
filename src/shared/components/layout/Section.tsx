import React from 'react';
import { motion, HTMLMotionProps, VariantLabels, TargetAndTransition, Target, Variants, easeOut } from 'framer-motion';
import { classNames } from '@/shared/utils/helpers';

interface SectionProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
  animate?: boolean;
  initial?: boolean | Target | VariantLabels;
  whileInView?: VariantLabels | TargetAndTransition;
  viewport?: { once?: boolean; margin?: string; amount?: number | "some" | "all"; root?: React.RefObject<Element>; };
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut
    }
  }
} as const;

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  containerClassName,
  ...props
}) => {
  return (
    <motion.section
      id={props.id}
      initial={props.animate ? "hidden" as const : false}
      whileInView={props.animate ? "visible" as const : { opacity: 1 }}
      viewport={props.animate ? { once: true, margin: '-100px' } : { once: true }}
      variants={sectionVariants}
      className={classNames(
        'relative',
        !props.noPadding && 'py-6 xs:py-8 sm:py-12 lg:py-16 xl:py-20',
        'transition-[padding] duration-300 ease-out',
        'motion-safe:hover:bg-gray-50/50 dark:motion-safe:hover:bg-gray-900/50',
        'motion-safe:hover:scale-[1.001]',
        className
      )}
      {...props}
    >
      <div className={classNames(
        'relative z-10',
        !props.fullWidth && [
          'container mx-auto',
          'px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-12',
          'max-w-screen-sm sm:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl',
          'transition-[padding,max-width] duration-300 ease-out'
        ],
        containerClassName
      )}>
        {children}
      </div>
    </motion.section>
  );
};

Section.displayName = 'Section';

export default Section;
