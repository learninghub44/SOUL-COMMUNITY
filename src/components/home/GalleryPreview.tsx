'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Expand, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

interface GalleryItem {
  id: string;
  gradient: string;
  height: string;
  title: string;
}

const sampleGallery: GalleryItem[] = [
  {
    id: '1',
    gradient: 'from-soul-green via-soul-green-light to-emerald-400',
    height: 'h-64',
    title: 'Community Gathering',
  },
  {
    id: '2',
    gradient: 'from-soul-brown via-amber-500 to-soul-gold',
    height: 'h-80',
    title: 'Workshop Session',
  },
  {
    id: '3',
    gradient: 'from-soul-gold via-yellow-400 to-amber-300',
    height: 'h-56',
    title: 'Celebration Event',
  },
  {
    id: '4',
    gradient: 'from-emerald-600 via-soul-green to-teal-500',
    height: 'h-72',
    title: 'Outdoor Activity',
  },
  {
    id: '5',
    gradient: 'from-soul-brown-light via-orange-400 to-amber-400',
    height: 'h-64',
    title: 'Team Building',
  },
  {
    id: '6',
    gradient: 'from-teal-500 via-cyan-400 to-sky-400',
    height: 'h-80',
    title: 'Youth Program',
  },
];

export function GalleryPreview() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sampleGallery.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.05}>
              <motion.div
                className={`relative rounded-xl overflow-hidden cursor-pointer group ${item.height}`}
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
                />

                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <Image className="w-20 h-20 text-white" />
                </div>

                <AnimatePresence>
                  {hoveredId === item.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="bg-white rounded-full p-3 mb-3"
                      >
                        <Expand className="w-6 h-6 text-soul-green-dark" />
                      </motion.div>
                      <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white font-semibold text-lg"
                      >
                        {item.title}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

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
