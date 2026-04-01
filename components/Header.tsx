'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navCategories = [
  { label: 'Festive', href: '/templates/festive' },
  { label: 'Marketing', href: '/templates/marketing' },
  { label: 'Transactional', href: '/templates/transactional' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          scrolled ? 'h-14' : 'h-16 md:h-20'
        }`}>
          <Link href="/" className="group transition-smooth hover:scale-105">
            <span className={`text-foreground group-hover:text-primary transition-all duration-300 ${
              scrolled ? 'text-base md:text-lg font-semibold tracking-wide' : 'text-lg md:heading-sm'
            }`} style={{ fontFamily: "var(--font-staatliches), 'Staatliches', sans-serif", textTransform: 'uppercase' }}>
              best<span className="gradient-text">email</span>template
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
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

          {/* Mobile Hamburger Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-2 mt-8">
                {navCategories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      {cat.label}
                    </Button>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
