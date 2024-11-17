import { ReactNode } from 'react';
import { Variants } from 'framer-motion';

export interface ServicesProps {
  className?: string;
}

export interface ServiceCardProps {
  service: Service;
  index: number;
  className?: string;
}

export interface Service {
  icon: ReactNode;
  title: string;
  description: string;
  features: readonly string[];
}

export const serviceItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export const serviceFeatureVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay,
      duration: 0.3
    }
  })
};
