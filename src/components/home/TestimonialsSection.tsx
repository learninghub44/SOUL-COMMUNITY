'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';

const testimonials = [
  {
    name: 'Chris Odhiambo',
    quote:
      'SOUL gave me a place to breathe. The weekly check-ins and the people around me changed how I show up for myself every day.',
    initial: 'C',
  },
  {
    name: 'Bree Flicky',
    quote:
      'I found my closest friends through SOUL. It is rare to find a community that actually shows up for you, not just online.',
    initial: 'B',
  },
  {
    name: 'Valentine Muthoni',
    quote:
      'Between the networking events and the mentorship, SOUL opened doors I did not know existed. Forever grateful for this community.',
    initial: 'V',
  },
  {
    name: 'Imali',
    quote:
      'What stands out about SOUL is how genuine it feels. Every event, every conversation, is rooted in actually uplifting each other.',
    initial: 'I',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-soul-green-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(184,181,240,0.12),transparent_60%)]" />
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.name} delay={0.15 + index * 0.1}>
              <div className="glass-card-dark rounded-2xl p-8 h-full flex flex-col">
                <p className="text-white/85 leading-relaxed mb-6 flex-1">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <span className="text-base font-semibold text-white font-[family-name:var(--font-playfair)]">
                      {testimonial.initial}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-white">{testimonial.name}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
