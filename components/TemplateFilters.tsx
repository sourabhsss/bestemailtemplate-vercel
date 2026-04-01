'use client';

import { Button } from '@/components/ui/button';
import { FilterOptions } from '@/lib/filter-utils';
import Link from 'next/link';
import { slugify } from '@/lib/slug-utils';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TemplateFiltersProps {
  filterOptions: FilterOptions;
  resultCount: number;
  totalCount: number;
  showAllOptions?: boolean;
}

const topCategories = ['Ecommerce', 'Fashion', 'Marketing'];

export function TemplateFilters({
  filterOptions,
}: TemplateFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Split use cases into two columns
  const useCases = filterOptions.useCases;
  const midPoint = Math.ceil(useCases.length / 2);
  const useCasesCol1 = useCases.slice(0, midPoint);
  const useCasesCol2 = useCases.slice(midPoint);

  return (
    <div className="bg-background border-b border-border bg-linen" id="templates">
      <div className="mx-auto max-w-7xl px-4">
        {/* Top Category Buttons */}
        <div className={`flex items-center justify-center gap-6 py-4 ${isExpanded ? 'border-b border-border' : ''}`}>
          {topCategories.map((category) => (
            <Link key={category} href={`/templates/${slugify(category)}`}>
              <Button
                variant="outline"
                className="px-6 py-2 text-sm font-medium border-border text-foreground hover:bg-primary hover:text-primary-foreground"
              >
                {category}
              </Button>
            </Link>
          ))}
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-4 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            More Collections
            {isExpanded ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Expanded Filter Menu */}
        {isExpanded && (
          <div className="pb-8 pt-4">
            <div className="grid grid-cols-6 gap-8">
              {/* Use Case Column 1 */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 pb-2 border-b-2 border-primary">
                  Use Case
                </h3>
                <ul className="space-y-2">
                  {useCasesCol1.map((useCase) => (
                    <li key={useCase}>
                      <Link
                        href={`/templates/${slugify(useCase)}`}
                        className="text-sm text-foreground hover:text-primary transition-colors block"
                      >
                        {useCase}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Use Case Column 2 */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 pb-2 border-b-2 border-transparent opacity-0">
                  Use Case
                </h3>
                <ul className="space-y-2">
                  {useCasesCol2.map((useCase) => (
                    <li key={useCase}>
                      <Link
                        href={`/templates/${slugify(useCase)}`}
                        className="text-sm text-foreground hover:text-primary transition-colors block"
                      >
                        {useCase}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Industry Column */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 pb-2 border-b-2 border-primary">
                  Industry
                </h3>
                <ul className="space-y-2">
                  {filterOptions.industries.map((industry) => (
                    <li key={industry}>
                      <Link
                        href={`/templates/${slugify(industry)}`}
                        className="text-sm text-foreground hover:text-primary transition-colors block"
                      >
                        {industry}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Type Column */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 pb-2 border-b-2 border-primary">
                  Type
                </h3>
                <ul className="space-y-2">
                  {filterOptions.types.map((type) => (
                    <li key={type}>
                      <Link
                        href={`/templates/${slugify(type)}`}
                        className="text-sm text-foreground hover:text-primary transition-colors block"
                      >
                        {type}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Integrations Column */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 pb-2 border-b-2 border-primary">
                  Integrations
                </h3>
                <ul className="space-y-2">
                  {filterOptions.esps.map((esp) => (
                    <li key={esp}>
                      <Link
                        href={`/templates/${slugify(esp)}`}
                        className="text-sm text-foreground hover:text-primary transition-colors block"
                      >
                        {esp}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Email Clients Column */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 pb-2 border-b-2 border-primary">
                  Email Clients
                </h3>
                <ul className="space-y-2">
                  {filterOptions.emailClients.map((client) => (
                    <li key={client}>
                      <Link
                        href={`/templates/${slugify(client)}`}
                        className="text-sm text-foreground hover:text-primary transition-colors block"
                      >
                        {client}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}