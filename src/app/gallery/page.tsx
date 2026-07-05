'use client';

import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Badge } from '@/components/ui/badge';
import { GALLERY_CATEGORIES } from '@/lib/constants';
import { EmptyState } from '@/components/shared/EmptyState';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...GALLERY_CATEGORIES];

  return (
    <>
      <PageHeader
        title="Community Gallery"
        description="Moments that capture the spirit of our community — events, adventures, connections, and celebrations."
      />

      <section className="py-12 px-4 bg-soul-cream min-h-[70vh]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-soul-green text-white shadow-md'
                      : 'bg-white text-muted-foreground hover:bg-soul-cream-dark hover:text-foreground border border-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <EmptyState
            icon={<ImageIcon className="w-8 h-8" />}
            title="No photos yet"
            description="Photos from community events and activities will appear here."
          />
        </div>
      </section>
    </>
  );
}
