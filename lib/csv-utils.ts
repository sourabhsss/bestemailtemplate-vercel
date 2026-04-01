import 'server-only';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export interface Category {
  listingName: string;
  urlPath: string;
  collectionId: string;
  localeId: string;
  itemId: string;
  createdOn: string;
  updatedOn: string;
  publishedOn: string;
  h1: string;
  listingDescription: string;
  metaDescription: string;
  relatedSlugs: string[];
}

export interface Template {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string; // Maps to Industry field
  thumbnailUrl: string;
  isPremium: boolean;
  useCase: string;
  industry: string;
  type: string;
  supportedEmailClients: string[];
  supportedESPs: string[];
  figmaLink?: string;
  fullURL?: string;
  relatedTemplates: string[];
}

function readCSV<T>(filePath: string): T[] {
  const fullPath = path.join(process.cwd(), filePath);
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  
  const result = Papa.parse<T>(fileContent, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
    transform: (value) => value.trim(),
  });

  return result.data;
}

function stripHtmlTags(html: string): string {
  // Remove HTML tags
  let text = html.replace(/<[^>]*>/g, '').trim();
  
  // Decode common HTML entities
  const entityMap: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
  };
  
  // Replace HTML entities
  text = text.replace(/&[a-z]+;|&#\d+;/gi, (match) => {
    return entityMap[match.toLowerCase()] || match;
  });
  
  return text;
}

export function getCategories(): Category[] {
  const rawData = readCSV<Record<string, string>>('data/categories.csv');
  
  return rawData.map(row => ({
    listingName: row['Listing Name'] || '',
    urlPath: row['URL Path'] || '',
    collectionId: row['Collection ID'] || '',
    localeId: row['Locale ID'] || '',
    itemId: row['Item ID'] || '',
    createdOn: row['Created On'] || '',
    updatedOn: row['Updated On'] || '',
    publishedOn: row['Published On'] || '',
    h1: row['H1'] || '',
    listingDescription: stripHtmlTags(row['Listing Description'] || ''),
    metaDescription: stripHtmlTags(row['Meta Description'] || ''),
    relatedSlugs: row['Related Slugs'] ? row['Related Slugs'].split('; ').filter(Boolean) : [],
  }));
}

export function getTemplates(): Template[] {
  const rawData = readCSV<Record<string, string>>('data/templates.csv');
  
  return rawData.map(row => ({
    id: row['Item ID'] || row['Slug'] || '',
    title: row['Title'] || '',
    slug: row['Slug'] || '',
    description: stripHtmlTags(row['Description - Template'] || ''),
    category: stripHtmlTags(row['Industry - Template'] || ''), // Primary category
    thumbnailUrl: row['Template Image Path'] ? `/${row['Template Image Path'].replace(/^images\//, 'images/templates/')}` : (row['Template Image'] || row['Image URL - Template'] || ''),
    isPremium: false, // Can be extended based on data
    useCase: stripHtmlTags(row['Use Case - Template'] || ''),
    industry: stripHtmlTags(row['Industry - Template'] || ''),
    type: stripHtmlTags(row['Type - Template'] || ''),
    supportedEmailClients: row['Supported Email Clients - Template'] 
      ? stripHtmlTags(row['Supported Email Clients - Template']).split(',').map((s: string) => s.trim()).filter(Boolean)
      : [],
    supportedESPs: row['Supported ESPs - Template']
      ? stripHtmlTags(row['Supported ESPs - Template']).split(',').map((s: string) => s.trim()).filter(Boolean)
      : [],
    figmaLink: row['Figma Link - Template'] || undefined,
    fullURL: row['Full URL'] || undefined,
    relatedTemplates: row['Related Templates']
      ? row['Related Templates'].split('; ').filter(Boolean)
      : [],
  }));
}

export function getTemplateById(id: string): Template | undefined {
  const templates = getTemplates();
  return templates.find(template => template.id === id || template.slug === id);
}

export function getTemplatesByCategory(category: string): Template[] {
  const templates = getTemplates();
  return templates.filter(template => 
    template.category.toLowerCase() === category.toLowerCase() ||
    template.industry.toLowerCase() === category.toLowerCase()
  );
}

export function getCategoryByName(name: string): Category | undefined {
  const categories = getCategories();
  return categories.find(cat => 
    cat.listingName.toLowerCase() === name.toLowerCase() ||
    cat.urlPath.toLowerCase() === name.toLowerCase()
  );
}

export function getRelatedTemplates(templateSlug: string): Template[] {
  const template = getTemplates().find(t => t.slug === templateSlug);
  if (!template || !template.relatedTemplates.length) return [];
  
  const allTemplates = getTemplates();
  return allTemplates.filter(t => 
    template.relatedTemplates.includes(t.slug)
  );
}