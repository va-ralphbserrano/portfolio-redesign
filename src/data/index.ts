export * from './meta';
export * from './hero';
export * from './about';
export * from './services';
export * from './portfolio';
export * from './certificates';
export * from './contact';

// Centralized data export
export const siteData = {
  meta: await import('./meta').then(m => m.metaConfig),
  hero: await import('./hero').then(m => m.heroData),
  about: await import('./about').then(m => m.aboutData),
  services: await import('./services').then(m => m.servicesData),
  portfolio: await import('./portfolio').then(m => m.portfolioData),
  certificates: await import('./certificates').then(m => m.certificates),
  contact: await import('./contact').then(m => m.contactData)
} as const;

export type SiteData = typeof siteData;
