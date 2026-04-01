import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { getWebPageSchema } from '@/lib/structured-data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Best Email Template. Send us your questions, feedback, or suggestions.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us',
    description: 'Get in touch with Best Email Template. Send us your questions, feedback, or suggestions.',
    url: 'https://bestemailtemplate.com/contact',
  },
  twitter: {
    title: 'Contact Us',
    description: 'Get in touch with Best Email Template.',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background bg-topographic">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getWebPageSchema(
              'Contact Us',
              'Get in touch with Best Email Template. Send us your questions, feedback, or suggestions.',
              '/contact'
            )
          ),
        }}
      />
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="heading-xl text-foreground mb-4">Contact Us</h1>
            <p className="body-lg text-muted-foreground max-w-xl mx-auto">
              Have a question, suggestion, or just want to say hello? We&apos;d love to hear from you.
            </p>
          </div>

          <ContactForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
