import { WithClassName } from '@/types/component';

export interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormData extends FormState {}

export interface ContactSectionProps extends WithClassName {
  title?: string;
  description?: string;
}

export interface ContactInfo {
  label: string;
  value: string;
  icon: string;
  url: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactData {
  title: string;
  description: string;
  info: ContactInfo[];
  social: SocialLink[];
  form: {
    submitButton: string;
    placeholders: {
      [K in keyof FormState]: string;
    };
    messages: {
      success: string;
      error: string;
    };
  };
}
