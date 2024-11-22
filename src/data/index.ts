import { metaConfig } from './meta';
import { aboutData } from '@/components/sections/about/data';
import { servicesData } from '@/components/sections/services/serviceData';
import { projects, getPortfolioProjects, getTechnicalProjects } from '@/components/sections/portfolio/data/projects';
import { contactData } from '@/components/sections/contact';
import { heroData } from '@/components/sections/hero/data';

// Export all data
export * from './meta';
export { heroData } from '@/components/sections/hero/data';
export { aboutData } from '@/components/sections/about/data';
export { servicesData } from '@/components/sections/services/serviceData';
export * from '@/components/sections/portfolio/data/projects';
export { contactData } from '@/components/sections/contact';

// Centralized data export
export const siteData = {
  meta: metaConfig,
  hero: heroData,
  about: aboutData,
  services: servicesData,
  projects,
  contact: contactData
} as const;
