import { Template } from '@/lib/csv-utils';
import { slugify } from '@/lib/slug-utils';

const BASE_URL = 'https://bestemailtemplate.com';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Best Email Template',
    url: BASE_URL,
    logo: `${BASE_URL}/bestemailtemplate.jpg`,
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Best Email Template',
    url: BASE_URL,
  };
}

export function getHomePageSchema(templateCount: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${templateCount} Free HTML Email Templates`,
    description:
      'Mobile responsive, customizable HTML email templates built on Figma for various use cases across industries.',
    url: BASE_URL,
    provider: {
      '@type': 'Organization',
      name: 'Best Email Template',
    },
  };
}

export function getTemplateDetailSchema(template: Template) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: template.title,
    description:
      template.description ||
      `${template.title} - Free HTML email template for ${template.useCase}`,
    url: `${BASE_URL}/email-template/${template.slug || template.id}`,
    image: template.thumbnailUrl || undefined,
    creator: {
      '@type': 'Organization',
      name: 'Best Email Template',
    },
    isAccessibleForFree: true,
    genre: template.useCase,
    keywords: [
      template.useCase,
      template.type,
      template.industry,
    ].filter(Boolean),
  };
}

export function getBreadcrumbSchema(
  items: { name: string; url?: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: `${BASE_URL}${item.url}` } : {}),
    })),
  };
}

export function getCategoryPageSchema(
  title: string,
  description: string,
  slug: string,
  templateCount: number
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: `${BASE_URL}/templates/${slug}`,
    numberOfItems: templateCount,
    provider: {
      '@type': 'Organization',
      name: 'Best Email Template',
    },
  };
}

export function getWebPageSchema(
  title: string,
  description: string,
  path: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${BASE_URL}${path}`,
    publisher: {
      '@type': 'Organization',
      name: 'Best Email Template',
    },
  };
}
