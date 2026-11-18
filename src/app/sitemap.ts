import type { MetadataRoute } from 'next';
import { SERVICES } from '@/data/services';
import { PROJECTS } from '@/data/projects';
import { pageUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: pageUrl('/'), lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: pageUrl('/about'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: pageUrl('/services'), lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: pageUrl('/projects'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: pageUrl('/privacy-policy'), lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: pageUrl('/terms-of-service'), lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: pageUrl(`/services/${service.slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: pageUrl(`/projects/${project.slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
