import { ReactNode } from 'react';

// Existing types
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

// New atomic state types
export interface AtomEffect<T> {
  onSet?: (newValue: T, oldValue: T) => void;
  onGet?: (value: T) => void;
  onInit?: (defaultValue: T) => void;
}

export interface Atom<T> {
  key: string;
  default: T;
  effects?: AtomEffect<T>[];
  validate?: (value: T) => boolean;
}

export interface StateConfig {
  enablePersistence?: boolean;
  enableLogging?: boolean;
  enableValidation?: boolean;
  storageKey?: string;
}

export interface StateProviderProps extends StateConfig {
  children: ReactNode;
}

export interface AtomState<T> {
  value: T;
  subscribers: Set<() => void>;
  effects: AtomEffect<T>[];
}

export interface StateContextType {
  getAtom: <T>(atom: Atom<T>) => T;
  setAtom: <T>(atom: Atom<T>, value: T) => void;
  subscribe: <T>(atom: Atom<T>, callback: () => void) => () => void;
}

// UI State types
export interface UIState {
  menuOpen: boolean;
  sidebarOpen: boolean;
  modalOpen: boolean;
  activeModal: string | null;
  toasts: Toast[];
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}
