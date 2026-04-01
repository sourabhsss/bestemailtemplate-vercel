import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getTemplates, getTemplateById } from '@/lib/templates-data';
import { TemplateCard } from '@/components/TemplateCard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Mail, Tag, Briefcase, Zap, Monitor } from 'lucide-react';
import { slugify } from '@/lib/slug-utils';
import { getTemplateDetailSchema, getBreadcrumbSchema } from '@/lib/structured-data';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const templates = getTemplates();
  
  return templates.map((template) => ({
    slug: template.slug || template.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateById(slug);

  if (!template) {
    return {
      title: 'Template Not Found',
      description: 'The requested email template could not be found.',
    };
  }

  const title = template.title;
  const description = template.description || `${template.title} - Free HTML email template for ${template.useCase}`;

  return {
    title,
    description,
    keywords: [
      template.title,
      template.useCase,
      template.type,
      template.industry,
      'HTML email template',
      'free email template',
      ...template.supportedEmailClients,
      ...template.supportedESPs,
    ].filter(Boolean),
    alternates: {
      canonical: `/email-template/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://bestemailtemplate.com/email-template/${slug}`,
      images: template.thumbnailUrl ? [{ url: template.thumbnailUrl, alt: template.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: template.thumbnailUrl ? [template.thumbnailUrl] : [],
    },
  };
}

export default async function TemplatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const template = getTemplateById(slug);

  if (!template) {
    notFound();
  }

  // Get templates with the same use case tag, limited to 12-15 templates
  const similarTemplates = getTemplates()
    .filter((t) => t.useCase === template.useCase && t.id !== template.id)
    .slice(0, 15);

  return (
    <div className="min-h-screen flex flex-col bg-background bg-topographic">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            getTemplateDetailSchema(template),
            getBreadcrumbSchema([
              { name: 'Email Templates', url: '/' },
              { name: template.useCase, url: `/templates/${slugify(template.useCase)}` },
              { name: template.title },
            ]),
          ]),
        }}
      />
      <Header />
      
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <ol className="flex items-center gap-2 text-sm list-none m-0 p-0">
            <li>
              <Link href="/" className="text-primary hover:underline">
                Email Templates
              </Link>
            </li>
            <li aria-hidden="true" className="text-muted-foreground">&gt;</li>
            <li>
              <Link 
                href={`/templates/${slugify(template.useCase)}`} 
                className="text-primary hover:underline"
              >
                {template.useCase}
              </Link>
            </li>
            <li aria-hidden="true" className="text-muted-foreground">&gt;</li>
            <li aria-current="page" className="text-foreground">{template.title}</li>
          </ol>
        </div>
      </nav>

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-16">
            {/* Left Column - Template Preview */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-full max-w-md">
                <div className="relative aspect-[3/4] rounded-none overflow-y-auto overflow-x-hidden border-l-[3px] border-l-primary border border-primary/20 shadow-lg">
                  <Image
                    src={template.thumbnailUrl}
                    alt={template.title}
                    width={500}
                    height={667}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Template Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-semibold text-foreground mb-6">
                  {template.title}
                </h1>

                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  {template.description}
                </p>

                <Button 
                  size="lg"
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                  asChild
                >
                  <a 
                    href={template.figmaLink || template.fullURL || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Use Free Template
                  </a>
                </Button>
              </div>

              {/* Template Tags */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-sm font-semibold text-foreground">Template Tags</h3>
                
                {/* Use Case */}
                {template.useCase && (
                  <div className="flex items-start gap-3">
                    <Tag className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <span className="text-xs font-medium text-muted-foreground block mb-1">Use Case</span>
                      <Link 
                        href={`/templates/${slugify(template.useCase)}`}
                        className="inline-block"
                      >
                        <Badge variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 cursor-pointer transition-colors">
                          {template.useCase}
                        </Badge>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Type */}
                {template.type && (
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <span className="text-xs font-medium text-muted-foreground block mb-1">Type</span>
                      <Link 
                        href={`/templates/${slugify(template.type)}`}
                        className="inline-block"
                      >
                        <Badge variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 cursor-pointer transition-colors">
                          {template.type}
                        </Badge>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Industry */}
                {template.industry && (
                  <div className="flex items-start gap-3">
                    <Briefcase className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <span className="text-xs font-medium text-muted-foreground block mb-1">Industry</span>
                      <Link 
                        href={`/templates/${slugify(template.industry)}`}
                        className="inline-block"
                      >
                        <Badge variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 cursor-pointer transition-colors">
                          {template.industry}
                        </Badge>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Email Clients */}
                {template.supportedEmailClients && template.supportedEmailClients.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Monitor className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <span className="text-xs font-medium text-muted-foreground block mb-1">Email Clients</span>
                      <div className="flex flex-wrap gap-2">
                        {template.supportedEmailClients.map((client) => (
                          <Link 
                            key={client} 
                            href={`/templates/${slugify(client)}`}
                          >
                            <Badge variant="outline" className="text-xs border-primary/30 text-primary hover:bg-primary/10 transition-colors cursor-pointer">
                              {client}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Integrations */}
                {template.supportedESPs && template.supportedESPs.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Zap className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <span className="text-xs font-medium text-muted-foreground block mb-1">Integrations</span>
                      <div className="flex flex-wrap gap-2">
                        {template.supportedESPs.slice(0, 6).map((esp) => (
                          <Link 
                            key={esp} 
                            href={`/templates/${slugify(esp)}`}
                          >
                            <Badge variant="outline" className="text-xs border-primary/30 text-primary hover:bg-primary/10 transition-colors cursor-pointer">
                              {esp}
                            </Badge>
                          </Link>
                        ))}
                        {template.supportedESPs.length > 6 && (
                          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                            +{template.supportedESPs.length - 6} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Similar Email Templates Section */}
          {similarTemplates.length > 0 && (
            <div className="mt-16">
              <Separator className="mb-8" />
              <h2 className="text-2xl font-semibold text-primary mb-8">
                Similar Email Templates
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarTemplates.map((similarTemplate) => (
                  <TemplateCard
                    key={similarTemplate.id}
                    id={similarTemplate.slug || similarTemplate.id}
                    title={similarTemplate.title}
                    description={similarTemplate.description}
                    category={similarTemplate.category}
                    thumbnailUrl={similarTemplate.thumbnailUrl}
                    isPremium={similarTemplate.isPremium}
                    industry={similarTemplate.industry}
                    useCase={similarTemplate.useCase}
                    showTags={true}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}