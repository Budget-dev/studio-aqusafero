
import { MetadataRoute } from 'next';

/**
 * @fileOverview Enterprise Sitemap Generator
 * Dynamically generates sitemap for Google Search Console indexing.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aquasafero.com';

  const routes = [
    '',
    '/about',
    '/products',
    '/services',
    '/services/installation',
    '/services/amc-maintenance',
    '/services/repair',
    '/trainings',
    '/gallery',
    '/contact',
    '/compact-sewage-treatment-plant',
    '/compact-effluent-treatment-plant',
    '/drinking-water-treatment-plant',
    '/brands',
    '/faqs',
    '/resources'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}
