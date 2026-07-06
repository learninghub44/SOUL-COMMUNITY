'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Image as ImageIcon, ArrowRight, Loader2 } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { EmptyState } from '@/components/shared/EmptyState';
import { createClient } from '@/lib/supabase/client';
import { listGalleryImages } from '@/lib/services/gallery';
import type { GalleryImage } from '@/types';

export function GalleryPreview() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    listGalleryImages(supabase)
      .then((data) => {
        if (active) setImages(data.slice(0, 6));
      })
      .catch(() => {
        if (active) setImages([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

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

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-soul-green" />
          </div>
        ) : images.length === 0 ? (
          <EmptyState
            icon={<ImageIcon className="w-8 h-8" />}
            title="Gallery coming soon"
            description="Photos from our community events and activities will appear here."
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {images.map((image, index) => (
              <AnimatedSection key={image.id} delay={0.05 + index * 0.05}>
                <Link
                  href="/gallery"
                  className={`block rounded-xl overflow-hidden soul-shadow-card group ${
                    index === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.image_url}
                    alt={image.title || 'SOUL Community'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </AnimatedSection>
            ))}
          </div>
        )}

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
