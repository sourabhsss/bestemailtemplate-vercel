import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { Footer } from '@/components/Footer';
import { getTemplates } from '@/lib/templates-data';
import { TemplatesPageClient } from '@/components/TemplatesPageClient';
import { getHomePageSchema } from '@/lib/structured-data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "575 Free HTML Email Templates",
  description: "Mobile responsive, customizable HTML email templates built on Figma for various use cases across industries. Browse our collection of 575+ free email templates.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "575 Free HTML Email Templates",
    description: "Mobile responsive, customizable HTML email templates built on Figma for various use cases across industries.",
    url: "https://bestemailtemplate.com",
    images: [
      {
        url: '/bestemailtemplate.jpg',
        width: 1200,
        height: 630,
        alt: 'Best Email Template - Free HTML Email Templates',
      },
    ],
  },
  twitter: {
    title: "575 Free HTML Email Templates",
    description: "Mobile responsive, customizable HTML email templates built on Figma for various use cases across industries.",
    images: ['/bestemailtemplate.jpg'],
  },
};

export default function Home() {
  const allTemplates = getTemplates();

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getHomePageSchema(allTemplates.length)),
        }}
      />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TemplatesPageClient templates={allTemplates} />
      </main>
      <Footer />
    </div>
  );
}
