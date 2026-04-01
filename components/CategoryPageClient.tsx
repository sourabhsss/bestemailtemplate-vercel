'use client';

import { useState, useMemo } from 'react';
import { TemplateCard } from '@/components/TemplateCard';
import { TemplateFilters } from '@/components/TemplateFilters';
import { TemplatePagination } from '@/components/TemplatePagination';
import { Template } from '@/lib/csv-utils';
import { extractFilterOptions } from '@/lib/filter-utils';

interface CategoryPageClientProps {
  templates: Template[];
  allTemplates: Template[];
  currentCategory: string;
}

const ITEMS_PER_PAGE = 20;

export function CategoryPageClient({ templates, allTemplates }: CategoryPageClientProps) {
  const filterOptions = useMemo(() => extractFilterOptions(allTemplates), [allTemplates]);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(templates.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedTemplates = templates.slice(startIndex, endIndex);

  return (
    <>
      <TemplateFilters
        filterOptions={filterOptions}
        resultCount={templates.length}
        totalCount={templates.length}
        showAllOptions={true}
      />
      
      {/* Template Grid */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <h2 className="sr-only">Browse Templates</h2>
          {paginatedTemplates.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
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
      </section>
    </>
  );
}