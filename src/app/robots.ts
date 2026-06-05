
import { MetadataRoute } from 'next';

/**
 * @fileOverview Search Engine Robots Configuration
 * Controls crawler access to administrative and user private areas.
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/user/', '/cart/', '/checkout/'],
    },
    sitemap: 'https://aquasafero.com/sitemap.xml',
  };
}
