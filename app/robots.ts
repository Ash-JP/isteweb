import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/admin-login/'],
    },
    sitemap: 'https://iste.ceal.in/sitemap.xml',
  };
}
