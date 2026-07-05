'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Expand,
  X,
  ChevronLeft,
  ChevronRight,
  Grid,
  Image as ImageIcon,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GALLERY_CATEGORIES } from '@/lib/constants';

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  gradient: string;
  height: string;
}

const galleryImages: GalleryImage[] = [
  { id: '1', title: 'Community Meetup 2025', category: 'Events', gradient: 'from-soul-green to-soul-green-light', height: 'h-64' },
  { id: '2', title: 'Hiking Adventure', category: 'Outdoor', gradient: 'from-emerald-600 to-teal-500', height: 'h-80' },
  { id: '3', title: 'Volunteer Day', category: 'Community', gradient: 'from-soul-brown to-soul-brown-light', height: 'h-56' },
  { id: '4', title: 'Weekly Meetup Session', category: 'Meetups', gradient: 'from-soul-gold to-soul-gold-light', height: 'h-72' },
  { id: '5', title: 'End of Year Celebration', category: 'Celebrations', gradient: 'from-rose-500 to-pink-400', height: 'h-64' },
  { id: '6', title: 'Mindfulness Workshop', category: 'Mental Health Sessions', gradient: 'from-violet-500 to-purple-400', height: 'h-80' },
  { id: '7', title: 'Business Forum', category: 'Events', gradient: 'from-amber-600 to-yellow-500', height: 'h-60' },
  { id: '8', title: 'Nature Walk', category: 'Outdoor', gradient: 'from-soul-green-dark to-emerald-700', height: 'h-72' },
  { id: '9', title: 'Skills Exchange', category: 'Community', gradient: 'from-sky-500 to-blue-400', height: 'h-56' },
  { id: '10', title: 'Friday Social', category: 'Meetups', gradient: 'from-soul-green-light to-teal-400', height: 'h-80' },
  { id: '11', title: 'Community Party', category: 'Celebrations', gradient: 'from-orange-500 to-amber-400', height: 'h-64' },
  { id: '12', title: 'Therapy Circle', category: 'Mental Health Sessions', gradient: 'from-indigo-500 to-blue-400', height: 'h-72' },
  { id: '13', title: 'Networking Night', category: 'Events', gradient: 'from-soul-brown-light to-amber-600', height: 'h-60' },
  { id: '14', title: 'Camping Trip', category: 'Outdoor', gradient: 'from-green-700 to-emerald-500', height: 'h-80' },
  { id: '15', title: 'Charity Drive', category: 'Community', gradient: 'from-teal-500 to-cyan-400', height: 'h-56' },
  { id: '16', title: 'Leadership Workshop', category: 'Meetups', gradient: 'from-soul-gold-light to-yellow-400', height: 'h-64' },
  { id: '17', title: 'Graduation Celebration', category: 'Celebrations', gradient: 'from-pink-500 to-rose-400', height: 'h-72' },
  { id: '18', title: 'Wellness Retreat', category: 'Mental Health Sessions', gradient: 'from-purple-500 to-indigo-400', height: 'h-64' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', ...GALLERY_CATEGORIES];

  const filteredImages =
    activeCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goToPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev! - 1));
  };

  const goToNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev! + 1));
  };

  const currentImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

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
              <Grid className="w-4 h-4 text-muted-foreground mr-1 hidden sm:inline" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setLightboxIndex(null);
                  }}
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

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filteredImages.map((image, index) => (
              <AnimatedSection key={image.id} delay={Math.min(index * 0.05, 0.4)}>
                <div
                  className={`relative ${image.height} rounded-xl overflow-hidden cursor-pointer group break-inside-avoid`}
                  onClick={() => openLightbox(index)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${image.gradient}`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <ImageIcon className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center">
                      <Expand className="w-8 h-8 text-white mx-auto mb-2" />
                      <p className="text-white font-medium text-sm">{image.title}</p>
                      <Badge className="mt-2 bg-white/20 text-white border-white/30">
                        {image.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <AnimatedSection>
              <div className="text-center py-20">
                <ImageIcon className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">No images found in this category.</p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              key={currentImage.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full aspect-video rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${currentImage.gradient}`}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <ImageIcon className="w-32 h-32 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold">{currentImage.title}</h3>
                <Badge className="mt-2 bg-white/20 text-white border-white/30">
                  {currentImage.category}
                </Badge>
              </div>
            </motion.div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightboxIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
