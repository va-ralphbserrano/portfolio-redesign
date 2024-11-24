import { Variants } from 'framer-motion';

export interface FormInputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface FormTextareaProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export interface FormButtonProps {
  isSubmitting: boolean;
}

export interface FormStatusProps {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export const formInputVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};

export const formButtonVariants: Variants = {
  idle: {
    scale: 1
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  },
  loading: {
    scale: 0.98,
    opacity: 0.8
  }
};

export const formStatusVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
    height: 0
  },
  visible: {
    opacity: 1,
    y: 0,
    height: 'auto',
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    y: 10,
    height: 0,
    transition: {
      duration: 0.2
    }
  }
};
