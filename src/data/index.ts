import { metaConfig } from './meta';
import { heroData } from './hero';
import { aboutData } from './about';
import { servicesData } from './services';
import { certificates } from './certificates';
import { contactData } from './contact';
import { projects, getProjectsByCategory } from './projects';

// Export all data
export * from './meta';
export * from './hero';
export * from './about';
export * from './services';
export * from './certificates';
export * from './contact';
export * from './projects';

// Centralized data export
export const siteData = {
  meta: metaConfig,
  hero: heroData,
  about: aboutData,
  services: servicesData,
  projects,
  certificates,
  contact: contactData
} as const;

export type SiteData = typeof siteData;
