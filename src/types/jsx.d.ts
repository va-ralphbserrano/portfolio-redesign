declare module '*.jsx' {
  import { ReactElement } from 'react';
  const content: (props: any) => ReactElement;
  export default content;
}

declare module '*.tsx' {
  import { ReactElement } from 'react';
  const content: (props: any) => ReactElement;
  export default content;
}
