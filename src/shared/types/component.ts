import { HTMLAttributes, ReactNode } from 'react';

export interface BaseProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
}

export interface WithChildren {
  children: ReactNode;
}

export interface WithOptionalChildren {
  children?: ReactNode;
}

export interface WithClassName {
  className?: string;
}

export type WithRequired<T extends string> = Record<T, string>;

export type WithOptional<T extends string> = Partial<Record<T, string>>;

export interface WithCallback<T = void> {
  onCallback: () => T;
}

export interface WithAsyncCallback<T = void> {
  onCallback: () => Promise<T>;
}

export interface WithLoading {
  isLoading?: boolean;
}

export interface WithError {
  error?: string | null;
}

export interface WithSuccess {
  isSuccess?: boolean;
}

export interface WithDisabled {
  disabled?: boolean;
}

export type WithVariant<T extends string> = {
  variant?: T;
};
