declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      VITE_APP_TITLE: string;
      VITE_APP_DESCRIPTION: string;
      VITE_APP_URL: string;
      [key: string]: string | undefined;
    }
  }

  interface ImportMetaEnv extends Record<string, string | boolean | undefined> {
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_DESCRIPTION: string;
    readonly VITE_APP_URL: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly MODE: string;
    readonly BASE_URL: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
  };

  type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
      ? RecursivePartial<U>[]
      : T[P] extends object
      ? RecursivePartial<T[P]>
      : T[P];
  };

  type Nullable<T> = T | null;

  type ValueOf<T> = T[keyof T];

  type AsyncReturnType<T extends (...args: unknown[]) => Promise<unknown>> = 
    T extends (...args: unknown[]) => Promise<infer R> ? R : never;

  type ErrorWithMessage = {
    message: string;
  };
}

export {};
