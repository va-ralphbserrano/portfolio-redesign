import { metaConfig } from './meta';
import { heroData } from './hero';
import { aboutData } from './about';
import { servicesData } from './services';
import { portfolioData } from './portfolio';
import { certificates } from './certificates';
import { contactData } from './contact';

// Export all data
export * from './meta';
export * from './hero';
export * from './about';
export * from './services';
export * from './portfolio';
export * from './certificates';
export * from './contact';

// Centralized data export
export const siteData = {
  meta: metaConfig,
  hero: heroData,
  about: aboutData,
  services: servicesData,
  portfolio: portfolioData,
  certificates: certificates,
  contact: contactData
} as const;

export type SiteData = typeof siteData;
