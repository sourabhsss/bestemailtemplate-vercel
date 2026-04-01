'use client';

import { FlipWords } from '@/components/ui/flip-words';

interface CategoryHeaderProps {
  title: string;
  description: string;
  templateCount: number;
  flipWords?: string[];
}

const defaultFlipWords = ["Professional", "Stunning", "Responsive", "Customizable"];

export function CategoryHeader({ title, description, templateCount, flipWords = defaultFlipWords }: CategoryHeaderProps) {
  return (
    <section className="py-8 sm:py-12 px-4 bg-muted/30 bg-hatching">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="text-2xl sm:text-3xl md:heading-lg text-foreground mb-4" style={{ fontFamily: "var(--font-staatliches), 'Staatliches', sans-serif", textTransform: 'uppercase', letterSpacing: '0.03em' }}>
          <FlipWords words={flipWords} duration={3000} className="text-primary" />
          {title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {description}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          {templateCount} templates available
        </p>
      </div>
    </section>
  );
}
