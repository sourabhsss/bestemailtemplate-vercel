'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

const navCategories = [
  { label: 'Festive', href: '/templates/festive' },
  { label: 'Marketing', href: '/templates/marketing' },
  { label: 'Transactional', href: '/templates/transactional' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50 bg-noise">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="group transition-smooth hover:scale-105">
            <span className="heading-sm text-foreground group-hover:text-primary">
              best<span className="gradient-text">email</span>template
            </span>
          </Link>

          <nav className="flex items-center gap-3">
            {navCategories.map((cat) => (
              <Link key={cat.href} href={cat.href}>
                <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-primary hover:text-primary-foreground">
                  {cat.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
