'use client';

import Link from 'next/link';
import { Image, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { EmptyState } from '@/components/shared/EmptyState';

export function GalleryPreview() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-soul-green-dark mb-4">
              Community Gallery
            </h2>
            <p className="text-lg text-soul-brown max-w-2xl mx-auto">
              Moments that define our community
            </p>
          </div>
        </AnimatedSection>

        <EmptyState
          icon={<Image className="w-8 h-8" />}
          title="Gallery coming soon"
          description="Photos from our community events and activities will appear here."
        />

        <AnimatedSection delay={0.3}>
          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="inline-flex items-center px-8 py-4 bg-soul-green-dark text-white rounded-lg font-semibold hover:bg-soul-green transition-colors text-lg"
            >
              View Full Gallery
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
