import { AriaAttributes, DOMAttributes } from 'react';

type CustomElement = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Add custom attributes here
    css?: string | Record<string, string | number>;
  }

  interface SVGProps<T> extends SVGAttributes<T> {
    css?: string | Record<string, string | number>;
  }
}

declare module '*.jsx' {
  import { ReactElement } from 'react';
  const content: (props: React.HTMLAttributes<HTMLElement>) => ReactElement;
  export default content;
}

declare module '*.tsx' {
  import { ReactElement } from 'react';
  const content: (props: React.HTMLAttributes<HTMLElement>) => ReactElement;
  export default content;
}
