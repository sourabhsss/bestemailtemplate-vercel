'use client';

import { useState, useMemo } from 'react';
import { TemplateFilters } from '@/components/TemplateFilters';
import { TemplateCard } from '@/components/TemplateCard';
import { TemplatePagination } from '@/components/TemplatePagination';
import { Template } from '@/lib/csv-utils';
import { extractFilterOptions } from '@/lib/filter-utils';

interface TemplatesPageClientProps {
  templates: Template[];
}

const ITEMS_PER_PAGE = 20;

export function TemplatesPageClient({ templates }: TemplatesPageClientProps) {
  const filterOptions = useMemo(() => extractFilterOptions(templates), [templates]);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(templates.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedTemplates = templates.slice(startIndex, endIndex);

  return (
    <section className="pt-12 pb-12 px-4 bg-gradient-to-r from-secondary/20 via-background to-secondary/20 bg-dot-grid">
      <div className="mx-auto max-w-7xl">
        <TemplateFilters
          filterOptions={filterOptions}
          resultCount={templates.length}
          totalCount={templates.length}
          showAllOptions={true}
        />
        
        {/* Template Grid */}
        <div className="mt-12">
        <h2 className="sr-only">Browse Email Templates</h2>
        {paginatedTemplates.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {paginatedTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                id={template.slug || template.id}
                title={template.title}
                description={template.description}
                category={template.category}
                thumbnailUrl={template.thumbnailUrl}
                isPremium={template.isPremium}
                industry={template.industry}
                useCase={template.useCase}
                type={template.type}
                showTags={true}
              />
              ))}
            </div>
            
            {totalPages > 1 && (
              <TemplatePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No templates found matching your filters.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your filter criteria.
            </p>
          </div>
        )}
        </div>
      </div>
    </section>
  );
}