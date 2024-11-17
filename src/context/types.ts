import { ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}

export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

export interface FormContextType {
  formState: FormState;
  setFormState: (state: FormState) => void;
  resetForm: () => void;
}

export interface FormProviderProps {
  children: ReactNode;
}

export interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export interface LoadingProviderProps {
  children: ReactNode;
}
