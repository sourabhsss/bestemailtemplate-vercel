import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getWebPageSchema } from '@/lib/structured-data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Best Email Template',
  description: 'Terms and conditions for using Best Email Template.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getWebPageSchema('Terms & Conditions', 'Terms and conditions for using Best Email Template.', '/terms')
          ),
        }}
      />
      <Header />
      
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms & Conditions</h1>
          
          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Agreement to Terms</h2>
              <p className="leading-relaxed">
                By accessing and using Best Email Template, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Use License</h2>
              <p className="leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials (email templates) on Best Email Template 
                for personal or commercial use. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Modify or copy the materials except for personal or commercial use</li>
                <li>Use the materials for any commercial purpose without proper attribution</li>
                <li>Attempt to decompile or reverse engineer any software contained on Best Email Template</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
              </ul>
              <p className="leading-relaxed mt-4">
                This license shall automatically terminate if you violate any of these restrictions and may be terminated by 
                Best Email Template at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Template Usage Rights</h2>
              <p className="leading-relaxed mb-4">
                All email templates provided on this website are free to use for both personal and commercial projects with the following conditions:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You may use the templates in unlimited projects</li>
                <li>You may modify the templates to suit your needs</li>
                <li>You may not redistribute or resell the templates as your own</li>
                <li>You may not claim the original design as your own work</li>
                <li>Attribution is appreciated but not required</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Disclaimer</h2>
              <p className="leading-relaxed">
                The materials on Best Email Template are provided on an &apos;as is&apos; basis. Best Email Template makes no warranties, 
                expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied 
                warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual 
                property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Limitations</h2>
              <p className="leading-relaxed">
                In no event shall Best Email Template or its suppliers be liable for any damages (including, without limitation, 
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use 
                the materials on Best Email Template, even if Best Email Template or a Best Email Template authorized representative 
                has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Accuracy of Materials</h2>
              <p className="leading-relaxed">
                The materials appearing on Best Email Template could include technical, typographical, or photographic errors. 
                Best Email Template does not warrant that any of the materials on its website are accurate, complete or current. 
                Best Email Template may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Links</h2>
              <p className="leading-relaxed">
                Best Email Template has not reviewed all of the sites linked to its website and is not responsible for the contents 
                of any such linked site. The inclusion of any link does not imply endorsement by Best Email Template of the site. 
                Use of any such linked website is at the user&apos;s own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Modifications</h2>
              <p className="leading-relaxed">
                Best Email Template may revise these terms of service for its website at any time without notice. By using this 
                website you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Governing Law</h2>
              <p className="leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit 
                to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us through our website.
              </p>
            </section>

            <section className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Last updated: December 4, 2025
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}