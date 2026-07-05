'use client';

import { Quote } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

export function TestimonialsSection() {
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
          <div className="text-center py-12">
            <Quote className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white/80 mb-2">
              Testimonials coming soon
            </h3>
            <p className="text-white/50 max-w-sm mx-auto">
              Stories and feedback from our community members will appear here.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
