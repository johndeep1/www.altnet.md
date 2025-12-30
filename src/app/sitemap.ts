import { MetadataRoute } from 'next';

// Define fallback plans in case defaultPlans can't be imported
const fallbackPlans = [
  { title: 'tv' },
  { title: 'popular' },
  { title: 'premium' }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://altnet.md';

  // Main static pages
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/preturi`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/acoperire`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Package pages - using fallback plans instead of trying to import defaultPlans
  // which might not be available during static build time
  const packageRoutes = fallbackPlans.map((plan) => ({
    url: `${baseUrl}/pachete/${plan.title.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...packageRoutes];
}
