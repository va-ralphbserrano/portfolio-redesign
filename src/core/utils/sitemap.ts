import { routes } from '../config/routes';
import { metaConfig } from '@/data/meta';

export const generateSitemap = () => {
  const baseUrl = metaConfig.siteUrl;
  const lastmod = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes.map(route => `
  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

  return xml;
};
