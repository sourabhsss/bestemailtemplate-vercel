'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  isPremium: boolean;
  industry?: string;
  useCase?: string;
  type?: string;
  showTags?: boolean;
}

export function TemplateCard({ 
  id, 
  title, 
  description, 
  thumbnailUrl
}: TemplateCardProps) {
  return (
    <Card className="group cursor-pointer overflow-hidden transition-smooth hover-lift bg-card card-shadow-lg hover:card-shadow-xl p-0">
      <CardContent className="p-0 relative">
        {/* Image Container - Full height */}
        <div className="relative h-[500px] bg-muted overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-smooth group-hover:scale-105"
            priority={false}
          />
          
          {/* Permanent Bottom Shadow - Always Visible */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none"></div>
          
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/98 via-foreground/90 to-foreground/70 opacity-0 group-hover:opacity-100 transition-smooth duration-500"></div>
          
          {/* Content Overlay */}
          <div className="absolute inset-0 p-6 flex flex-col justify-start opacity-0 group-hover:opacity-100 transition-smooth duration-300">
            <div className="transform -translate-y-4 group-hover:translate-y-0 transition-smooth duration-300">
              <h3 className="heading-sm text-white mb-2 line-clamp-2">
                {title}
              </h3>
              <p className="body-sm text-white/80 line-clamp-4 mb-6">
                {description}
              </p>
              
              {/* Action Button */}
              <Link href={`/email-template/${id}`} className="block">
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-smooth group/btn"
                  size="sm"
                >
                  View Details
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-smooth" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}