import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getTemplates, getCategories } from '@/lib/templates-data';
import { CategoryPageClient } from '@/components/CategoryPageClient';
import { CategoryHeader } from '@/components/CategoryHeader';
import { slugify } from '@/lib/slug-utils';
import { getCategoryPageSchema, getBreadcrumbSchema } from '@/lib/structured-data';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const templates = getTemplates();
  const categories = getCategories();
  
  // Get all unique category slugs from templates
  const categorySlugs = new Set<string>();
  
  // Add category URL paths
  categories.forEach(cat => {
    categorySlugs.add(cat.urlPath);
  });
  
  // Add all unique industries, use cases, types, email clients, and ESPs
  templates.forEach(template => {
    categorySlugs.add(slugify(template.industry));
    categorySlugs.add(slugify(template.useCase));
    categorySlugs.add(slugify(template.type));
    template.supportedEmailClients.forEach(client => categorySlugs.add(slugify(client)));
    template.supportedESPs.forEach(esp => categorySlugs.add(slugify(esp)));
  });
  
  return Array.from(categorySlugs).map(slug => ({
    category: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: categoryParam } = await params;
  const categorySlug = decodeURIComponent(categoryParam);
  const categories = getCategories();
  
  const category = categories.find((c) => c.urlPath.toLowerCase() === categorySlug.toLowerCase());
  
  const isEmailClientFilter = categorySlug.toLowerCase() === 'all-email-clients';
  const isESPFilter = categorySlug.toLowerCase() === 'all-integrations';
  
  let title: string;
  let description: string;
  
  if (isEmailClientFilter) {
    title = 'All Email Clients - HTML Email Templates';
    description = 'Browse templates compatible with all email clients including Gmail, Outlook, Yahoo, Apple Mail and more';
  } else if (isESPFilter) {
    title = 'All Integrations - HTML Email Templates';
    description = 'Browse templates compatible with all Email Service Providers (ESPs) and integrations';
  } else if (category) {
    title = category.h1 || category.listingName || categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    description = category.metaDescription || category.listingDescription || `Browse our collection of ${title} email templates`;
  } else {
    title = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    description = `Browse our collection of ${title} HTML email templates`;
  }
  
  return {
    title,
    description,
    alternates: {
      canonical: `/templates/${categorySlug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://bestemailtemplate.com/templates/${categorySlug}`,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryParam } = await params;
  const categorySlug = decodeURIComponent(categoryParam);
  const allTemplates = getTemplates();
  const categories = getCategories();
  
  // Find the category by URL path
  const category = categories.find((c) => c.urlPath.toLowerCase() === categorySlug.toLowerCase());

  // Determine if this is a special filter category (email clients or ESPs)
  const isEmailClientFilter = categorySlug.toLowerCase() === 'all-email-clients';
  const isESPFilter = categorySlug.toLowerCase() === 'all-integrations';
  
  // Filter templates based on category type
  let categoryTemplates = allTemplates;
  
  if (isEmailClientFilter || isESPFilter) {
    // For "All Email Clients" or "All Integrations", show all templates
    categoryTemplates = allTemplates;
  } else {
    // First check if it matches any email client
    const matchesEmailClient = allTemplates.some(t => 
      t.supportedEmailClients.some(client => slugify(client) === categorySlug.toLowerCase())
    );
    
    // Then check if it matches any ESP
    const matchesESP = allTemplates.some(t => 
      t.supportedESPs.some(esp => slugify(esp) === categorySlug.toLowerCase())
    );
    
    if (matchesEmailClient) {
      // Filter by email client
      categoryTemplates = allTemplates.filter(t => 
        t.supportedEmailClients.some(client => slugify(client) === categorySlug.toLowerCase())
      );
    } else if (matchesESP) {
      // Filter by ESP
      categoryTemplates = allTemplates.filter(t => 
        t.supportedESPs.some(esp => slugify(esp) === categorySlug.toLowerCase())
      );
    } else {
      // Filter by industry, useCase, or type using slugified comparison
      categoryTemplates = allTemplates.filter((t) => {
        return (
          slugify(t.industry) === categorySlug.toLowerCase() ||
          slugify(t.useCase) === categorySlug.toLowerCase() ||
          slugify(t.type) === categorySlug.toLowerCase()
        );
      });
    }
  }

  if (categoryTemplates.length === 0) {
    notFound();
  }

  // Determine display title and description
  let displayTitle: string;
  let displayDescription: string;
  
  if (isEmailClientFilter) {
    displayTitle = 'All Email Clients';
    displayDescription = 'Browse templates compatible with all email clients including Gmail, Outlook, Yahoo, Apple Mail and more';
  } else if (isESPFilter) {
    displayTitle = 'All Integrations';
    displayDescription = 'Browse templates compatible with all Email Service Providers (ESPs) and integrations';
  } else {
    // Use H1 from category CSV, fallback to listing name or formatted slug
    displayTitle = category?.h1 || category?.listingName || categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    displayDescription = category?.listingDescription || `Browse our collection of ${displayTitle.replace(' HTML Email Templates', '').replace(' Email Templates', '')} email templates`;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            getCategoryPageSchema(displayTitle, displayDescription, categorySlug, categoryTemplates.length),
            getBreadcrumbSchema([
              { name: 'Email Templates', url: '/' },
              { name: displayTitle },
            ]),
          ]),
        }}
      />
      <Header />
      
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <ol className="flex items-center gap-2 text-sm list-none m-0 p-0">
            <li>
              <Link href="/" className="text-primary hover:underline">
                Email Templates
              </Link>
            </li>
            <li aria-hidden="true" className="text-muted-foreground">&gt;</li>
            <li aria-current="page" className="text-foreground">{displayTitle}</li>
          </ol>
        </div>
      </nav>

      <main className="flex-1">
        {/* Category Header */}
        <CategoryHeader
          title={displayTitle.toLowerCase().includes('email templates') ? displayTitle : `${displayTitle} Email Templates`}
          description={displayDescription}
          templateCount={categoryTemplates.length}
        />

        <CategoryPageClient 
          templates={categoryTemplates} 
          allTemplates={allTemplates}
          currentCategory={categorySlug} 
        />
      </main>
      
      <Footer />
    </div>
  );
}