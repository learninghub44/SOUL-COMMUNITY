'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const testimonials = [
  {
    name: 'Grace Wanjiku',
    role: 'Member since 2023',
    content: 'SOUL has completely changed my perspective on community. The mental health sessions every Monday are therapeutic, and the friendships I\'ve built here are genuine and lasting.',
    rating: 5,
    initials: 'GW',
  },
  {
    name: 'Brian Ochieng',
    role: 'Business Owner',
    content: 'Through Thrive & Promote Thursday, I connected with clients who now form a core part of my business. SOUL doesn\'t just build community — it builds futures.',
    rating: 5,
    initials: 'BO',
  },
  {
    name: 'Faith Muthoni',
    role: 'Volunteer',
    content: 'The outdoor experiences on Saturdays remind me why nature is medicine. SOUL has given me a second family that pushes me to grow and give back.',
    rating: 5,
    initials: 'FM',
  },
  {
    name: 'Daniel Kiprop',
    role: 'Student',
    content: 'Wisdom Wednesday sessions have been invaluable for my personal development. The mentors here genuinely care about helping the younger generation succeed.',
    rating: 5,
    initials: 'DK',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'fill-soul-gold text-soul-gold' : 'text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 px-4 bg-soul-green-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,168,78,0.08),transparent_60%)]" />
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-playfair)] mb-4">
              What Our Community Says
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Real stories from real members whose lives have been touched by SOUL
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="relative">
            {/* Desktop grid */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-6">
              {testimonials.map((t, index) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                >
                  <Quote className="w-8 h-8 text-soul-gold/40 mb-4" />
                  <p className="text-white/85 text-sm leading-relaxed mb-6 min-h-[100px]">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <StarRating rating={t.rating} />
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-10 h-10 rounded-full bg-soul-gold/20 flex items-center justify-center text-soul-gold text-sm font-bold">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{t.name}</p>
                      <p className="text-white/50 text-xs">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile carousel */}
            <div className="lg:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10"
                >
                  <Quote className="w-10 h-10 text-soul-gold/40 mb-4" />
                  <p className="text-white/85 text-base leading-relaxed mb-6">
                    &ldquo;{testimonials[current].content}&rdquo;
                  </p>
                  <StarRating rating={testimonials[current].rating} />
                  <div className="flex items-center gap-3 mt-6">
                    <div className="w-12 h-12 rounded-full bg-soul-gold/20 flex items-center justify-center text-soul-gold font-bold">
                      {testimonials[current].initials}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{testimonials[current].name}</p>
                      <p className="text-white/50 text-sm">{testimonials[current].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === current ? 'bg-soul-gold' : 'bg-white/30'
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
