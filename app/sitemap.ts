import { MetadataRoute } from 'next';
import { getTemplates, getCategories } from '@/lib/templates-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bestemailtemplate.com';
  
  const templates = getTemplates();
  const categories = getCategories();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Template detail pages
  const templatePages: MetadataRoute.Sitemap = templates.map((template) => ({
    url: `${baseUrl}/email-template/${template.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/templates/${category.urlPath}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...templatePages, ...categoryPages];
}