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
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
}

export interface ServicesData {
  title: string;
  description: string;
  services: Service[];
}

export const serviceItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: delay * 0.2,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};
