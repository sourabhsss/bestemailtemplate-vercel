'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-gradient-to-br from-secondary/30 via-background to-secondary/30 bg-crosshatch bg-noise">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group mb-4 transition-smooth hover:scale-105">
              <span className="heading-sm text-foreground group-hover:text-primary">
                best<span className="gradient-text">email</span>template
              </span>
            </Link>
          </div>

          {/* Templates Column */}
          <div>
            <h3 className="heading-sm text-foreground mb-4">Templates</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="body-sm text-muted-foreground hover:text-primary transition-smooth hover:translate-x-1 inline-block">
                  All Templates
                </Link>
              </li>
              <li>
                <Link href="/templates/marketing" className="body-sm text-muted-foreground hover:text-primary transition-smooth hover:translate-x-1 inline-block">
                  Marketing
                </Link>
              </li>
              <li>
                <Link href="/templates/transactional" className="body-sm text-muted-foreground hover:text-primary transition-smooth hover:translate-x-1 inline-block">
                  Transactional
                </Link>
              </li>
              <li>
                <Link href="/templates/newsletter" className="body-sm text-muted-foreground hover:text-primary transition-smooth hover:translate-x-1 inline-block">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="heading-sm text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="body-sm text-muted-foreground hover:text-primary transition-smooth hover:translate-x-1 inline-block">
                  Privacy & Consent
                </Link>
              </li>
              <li>
                <Link href="/terms" className="body-sm text-muted-foreground hover:text-primary transition-smooth hover:translate-x-1 inline-block">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex justify-center">
            <p className="body-sm text-muted-foreground">
              Copyright © {new Date().getFullYear()} bestemailtemplate
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}