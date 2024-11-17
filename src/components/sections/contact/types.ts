import { WithClassName } from '@/types/component';

export interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type FormErrors = {
  [K in keyof FormState]?: string;
};

export interface FormResponse {
  success: boolean;
  message: string;
}

export interface ContactFormProps extends WithClassName {
  onSubmit: (data: FormState) => Promise<FormResponse>;
  isSubmitting?: boolean;
  error?: string | null;
}

export interface FormFieldProps extends WithClassName {
  label: string;
  name: keyof FormState;
  value: string;
  error?: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export interface FormButtonProps extends WithClassName {
  isSubmitting?: boolean;
  children: React.ReactNode;
}

export interface ContactSectionProps extends WithClassName {
  title?: string;
  description?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: keyof typeof import('react-icons/hi');
}

export interface ContactInfo {
  label: string;
  value: string;
  icon: keyof typeof import('react-icons/hi');
}

export interface ContactData {
  title: string;
  description: string;
  info: ContactInfo[];
  social: SocialLink[];
  form: {
    submitEndpoint: string;
    fields: {
      [K in keyof FormState]: {
        label: string;
        placeholder: string;
        required: boolean;
      };
    };
  };
}
