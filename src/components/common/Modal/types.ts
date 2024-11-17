import { HTMLMotionProps } from 'framer-motion';

export const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4'
} as const;

export type ModalSize = keyof typeof sizes;

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: ModalSize;
  showClose?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

export interface ModalOverlayProps extends HTMLMotionProps<'div'> {
  onClick?: () => void;
}

export interface ModalContentProps extends HTMLMotionProps<'div'> {
  size: ModalSize;
  className?: string;
  children: React.ReactNode;
}

export interface ModalHeaderProps {
  title?: string;
  showClose?: boolean;
  onClose?: () => void;
}

export interface ModalBodyProps {
  children: React.ReactNode;
}
