/// <reference types="vite/client" />

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    on<T = any>(type: string, callback: (event: CustomEvent<T>) => void): void;
    off<T = any>(type: string, callback: (event: CustomEvent<T>) => void): void;
    emit<T = any>(type: string, detail?: T): void;
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      VITE_APP_URL: string;
      [key: string]: string | undefined;
    }
  }

  interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_DESCRIPTION: string;
    readonly VITE_EMAILJS_SERVICE_ID: string;
    readonly VITE_EMAILJS_TEMPLATE_ID: string;
    readonly VITE_EMAILJS_USER_ID: string;
    readonly VITE_GA_ID: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly MODE: string;
    readonly BASE_URL: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  // Asset modules
  declare module '*.svg' {
    import React from 'react';
    const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
  }

  declare module '*.png' {
    const value: string;
    export default value;
  }

  declare module '*.jpg' {
    const value: string;
    export default value;
  }

  declare module '*.jpeg' {
    const value: string;
    export default value;
  }

  declare module '*.gif' {
    const value: string;
    export default value;
  }

  declare module '*.webp' {
    const value: string;
    export default value;
  }

  declare module '*.ico' {
    const value: string;
    export default value;
  }

  declare module '*.pdf' {
    const value: string;
    export default value;
  }

  type ErrorWithMessage = {
    message: string;
  };

  export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    demoUrl?: string;
    repoUrl?: string;
    image: string;
  }

  export interface Certificate {
    id: string;
    title: string;
    issuer: string;
    date: string;
    url: string;
    image: string;
  }

  export interface Tool {
    name: string;
    icon: React.ComponentType;
    category: string;
    proficiency?: number;
  }

  export interface Service {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType;
  }
}

declare module '@/shared/animations' {
  export const fadeInUp: any;
  export const staggerContainer: any;
}

declare module '@/components/sections/about/data' {
  export const aboutData: any;
  export const toolsData: any;
}

declare module '@/components/sections/services/serviceData' {
  export const servicesData: any;
}

declare module '@/components/sections/portfolio/data/projects' {
  export const getPortfolioProjects: () => Promise<Project[]>;
  export const getTechnicalProjects: () => Promise<Project[]>;
}

declare module '@/components/sections/contact' {
  export const contactData: any;
}

declare module '@/components/common/TechnologyDisplay' {
  export interface TechnologyDisplayProps {
    technologies: string[];
  }
  export const TechnologyDisplay: React.FC<TechnologyDisplayProps>;
}

declare module '@/components/sections/hero/content/HeroActions' {
  export interface HeroActionsProps {
    className?: string;
  }
  export const HeroActions: React.FC<HeroActionsProps>;
}

declare module '@/components/common/ProjectCard' {
  export interface ProjectCardProps {
    title: string;
    description: string;
    technologies: string[];
    demoUrl?: string;
    repoUrl?: string;
    image: string;
  }
  export const ProjectCard: React.FC<ProjectCardProps>;
}

declare module '@/core/context' {
  export interface AppContextType {
    theme: string;
    setTheme: (theme: string) => void;
  }
  export const AppContext: React.Context<AppContextType>;
}

declare module '@/core/middleware/persistence' {
  export const persistState: any;
}

declare module '@/core/middleware/validation' {
  export const validateState: any;
}

declare module '@/core/middleware/logger' {
  export const logState: any;
}

declare module '@/utils/helpers' {
  export const classNames: (...classes: (string | undefined | null | boolean)[]) => string;
  export const formatDate: (date: string | Date) => string;
  export const optimizeImage: (src: string, options?: any) => string;
}

declare module '@/utils/dom' {
  export const getFocusableElements: (element: HTMLElement) => HTMLElement[];
  export const trapFocus: (element: HTMLElement) => void;
}

export {};
