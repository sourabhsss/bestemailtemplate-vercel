'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';
import { slugify } from '@/lib/slug-utils';

const categories = ['E-Commerce', 'Fashion', 'Marketing'];

const useCases = [
  'Discounts & Coupons',
  'Product Promotions & Updates',
  'Webinar',
  'Retargeting & Triggers',
  'Abandoned Cart',
  'Welcome',
  'Thank You',
  'Activation & Retention',
  'Survey & Feedback',
  'Invoice',
  'Order Confirmation',
  'Pricing Plans',
  'Product Launch',
  'Events & Invitations',
];

const seasons = [
  'Newsletter',
  'Notifications & Acknowledgement',
  'Reminders',
  'Halloween',
  'Christmas',
  'New Year',
  'Black Friday',
  'Boxing Day',
  'Cyber Monday',
  'Diwali',
  'Summer',
  'Mothers Day',
  'Winter',
  'Fathers Day',
];

const industries = [
  'Restaurants, Food & Beverages',
  'Travel & Leisure',
  'Ecommerce',
  'Fashion',
  'Beauty & Personal Care',
  'Software & Digital Services',
  'Real Estate',
  'Healthcare',
  'Education',
  'Finance',
];

const types = [
  'Marketing',
  'User Lifecycle',
  'Transactional',
  'Announcements / Communications',
  'Festive',
];

const integrations = [
  'MailChimp',
  'Brevo',
  'Zoho Mail',
  'Klaviyo',
  'HubSpot',
  'Constant Contact',
  'Active Campaign',
  'Campaign Monitor',
  'Moosend',
  'Mailjet',
  'GetResponse',
  'Salesforce',
];

const emailClients = [
  'Gmail',
  'Apple Mail',
  'Outlook',
  'Yahoo!',
];

export function FilterBar() {
  const [activeCategory, setActiveCategory] = useState('E-Commerce');
  const [showMoreCollections, setShowMoreCollections] = useState(false);

  return (
    <div className="border-y border-border bg-background">
      <div className="mx-auto max-w-7xl px-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-4 py-4 border-b border-border">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-none transition-colors ${
                activeCategory === category
                  ? 'bg-light-gray text-foreground'
                  : 'text-medium-gray hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
          <Button
            variant="default"
            className="ml-auto bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => setShowMoreCollections(!showMoreCollections)}
          >
            More Collections {showMoreCollections ? '▲' : '▼'}
          </Button>
        </div>

        {/* Filter Columns */}
        {showMoreCollections && (
          <div className="py-6">
            <div className="grid grid-cols-6 gap-6">
              {/* Use Case Column */}
              <div>
                <h3 className="text-xs font-semibold mb-3 pb-1.5 border-b-2 border-primary">
                  Use Case
                </h3>
                <ul className="space-y-1.5">
                  {useCases.map((item) => (
                    <li key={item}>
                      <Link 
                        href={`/templates/${slugify(item)}`}
                        className="text-xs text-foreground hover:text-primary transition-colors block text-left"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Seasons Column */}
              <div>
                <h3 className="text-xs font-semibold mb-3 pb-1.5 border-b-2 border-transparent">
                  {' '}
                </h3>
                <ul className="space-y-1.5">
                  {seasons.map((item) => (
                    <li key={item}>
                      <Link 
                        href={`/templates/${slugify(item)}`}
                        className="text-xs text-foreground hover:text-primary transition-colors block text-left"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Industry Column */}
              <div>
                <h3 className="text-xs font-semibold mb-3 pb-1.5 border-b-2 border-primary">
                  Industry
                </h3>
                <ul className="space-y-1.5">
                  {industries.map((item) => (
                    <li key={item}>
                      <Link 
                        href={`/templates/${slugify(item)}`}
                        className="text-xs text-foreground hover:text-primary transition-colors block text-left"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Type Column */}
              <div>
                <h3 className="text-xs font-semibold mb-3 pb-1.5 border-b-2 border-primary">
                  Type
                </h3>
                <ul className="space-y-1.5">
                  {types.map((item) => (
                    <li key={item}>
                      <Link 
                        href={`/templates/${slugify(item)}`}
                        className="text-xs text-foreground hover:text-primary transition-colors block text-left"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Integrations Column */}
              <div>
                <h3 className="text-xs font-semibold mb-3 pb-1.5 border-b-2 border-primary">
                  Integrations
                </h3>
                <ul className="space-y-1.5">
                  {integrations.map((item) => (
                    <li key={item}>
                      <Link 
                        href={`/templates/${slugify(item)}`}
                        className="text-xs text-foreground hover:text-primary transition-colors block text-left"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Email Clients Column */}
              <div>
                <h3 className="text-xs font-semibold mb-3 pb-1.5 border-b-2 border-primary">
                  Email Clients
                </h3>
                <ul className="space-y-1.5">
                  {emailClients.map((item) => (
                    <li key={item}>
                      <Link 
                        href={`/templates/${slugify(item)}`}
                        className="text-xs text-foreground hover:text-primary transition-colors block text-left"
                      >
                        {item}
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