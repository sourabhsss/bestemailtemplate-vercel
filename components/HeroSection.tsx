'use client';

import { FlipWords } from '@/components/ui/flip-words';

const flipCategories = ["Free", "Responsive", "Customizable", "Beautiful"];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background py-12 sm:py-16 bg-hatching">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-accent/5 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Heading with Flip Words */}
          <h1 className="heading-hero text-foreground mb-6 text-balance max-w-2xl mx-auto" style={{ minHeight: "2.2em" }}>
            575
            <FlipWords words={flipCategories} duration={3000} className="text-primary" />
            HTML Email Templates
          </h1>

          {/* Description */}
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Mobile responsive, customizable HTML email templates built on Figma for various use cases across industries.
          </p>
        </div>
      </div>
    </section>
  );
}
