'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const navCategories = [
  { label: 'Festive', href: '/templates/festive' },
  { label: 'Marketing', href: '/templates/marketing' },
  { label: 'Transactional', href: '/templates/transactional' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? 'top-0 shadow-md border-b border-border/50 bg-background/95 backdrop-blur-md'
          : 'top-0 glass border-b border-border/50 bg-noise'
      }`}
    >
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        scrolled ? 'max-w-6xl' : 'max-w-7xl'
      }`}>
        <div className={`flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-14' : 'h-20'
        }`}>
          <Link href="/" className="group transition-smooth hover:scale-105">
            <span className={`text-foreground group-hover:text-primary transition-all duration-300 ${
              scrolled ? 'text-lg font-semibold tracking-wide' : 'heading-sm'
            }`} style={{ fontFamily: "var(--font-staatliches), 'Staatliches', sans-serif", textTransform: 'uppercase' }}>
              best<span className="gradient-text">email</span>template
            </span>
          </Link>

          <nav className="flex items-center gap-3">
            {navCategories.map((cat) => (
              <Link key={cat.href} href={cat.href}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
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
