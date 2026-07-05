'use client';

import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { EmptyState } from '@/components/shared/EmptyState';

export function EventsPreview() {
  return (
    <section className="py-16 md:py-24 bg-soul-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-soul-green-dark mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-soul-brown max-w-2xl mx-auto">
              Don&apos;t miss out on what&apos;s happening in our community
            </p>
          </div>
        </AnimatedSection>

        <EmptyState
          icon={<Calendar className="w-8 h-8" />}
          title="No upcoming events yet"
          description="Check back soon for upcoming events and activities."
        />

        <AnimatedSection delay={0.3}>
          <div className="text-center mt-12">
            <Link
              href="/events"
              className="inline-flex items-center px-8 py-4 bg-soul-green-dark text-white rounded-lg font-semibold hover:bg-soul-green transition-colors text-lg"
            >
              View All Events
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
