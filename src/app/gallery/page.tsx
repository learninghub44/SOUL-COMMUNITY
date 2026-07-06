'use client';

import { useEffect, useMemo, useState } from 'react';
import { Image as ImageIcon, X, Loader2 } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { EmptyState } from '@/components/shared/EmptyState';
import { createClient } from '@/lib/supabase/client';
import { listGalleryImages } from '@/lib/services/gallery';
import { GALLERY_CATEGORIES } from '@/lib/constants';
import type { GalleryImage } from '@/types';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const categories = ['All', ...GALLERY_CATEGORIES];

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    listGalleryImages(supabase)
      .then((data) => {
        if (active) setImages(data);
      })
      .catch((err) => {
        console.error('Failed to load gallery images:', err);
        if (active) {
          setImages([]);
          setLoadError(true);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return images;
    return images.filter((img) => img.category === activeCategory);
  }, [images, activeCategory]);

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

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-soul-green" />
            </div>
          ) : loadError ? (
            <EmptyState
              icon={<ImageIcon className="w-8 h-8" />}
              title="Couldn't load gallery"
              description="Something went wrong reaching the server. Please refresh the page or try again shortly."
            />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<ImageIcon className="w-8 h-8" />}
              title="No photos yet"
              description="Photos from community events and activities will appear here."
            />
          ) : (
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 md:gap-4 [column-fill:_balance]">
              {filtered.map((image, index) => (
                <AnimatedSection key={image.id} delay={0.03 * (index % 12)}>
                  <button
                    onClick={() => setLightboxImage(image)}
                    className="block w-full mb-3 md:mb-4 rounded-xl overflow-hidden soul-shadow-card group break-inside-avoid"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.image_url}
                      alt={image.title || 'SOUL Community'}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </button>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxImage.image_url}
              alt={lightboxImage.title || 'SOUL Community'}
              className="w-full max-h-[80vh] object-contain rounded-lg mx-auto"
            />
            {(lightboxImage.title || lightboxImage.description) && (
              <div className="text-center mt-4">
                {lightboxImage.title && (
                  <h3 className="text-white font-semibold">{lightboxImage.title}</h3>
                )}
                {lightboxImage.description && (
                  <p className="text-white/70 text-sm mt-1">{lightboxImage.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
