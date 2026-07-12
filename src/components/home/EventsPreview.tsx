'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { EmptyState } from '@/components/shared/EmptyState';
import { createClient } from '@/lib/supabase/client';
import { listPublishedEvents } from '@/lib/services/events';
import type { Event } from '@/types';

export function EventsPreview() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    listPublishedEvents(supabase)
      .then((data) => {
        if (!active) return;
        const today = new Date().toISOString().slice(0, 10);
        const upcoming = data.filter((e) => !e.date || e.date >= today).slice(0, 3);
        setEvents(upcoming);
      })
      .catch(() => {
        if (active) setEvents([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

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

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-soul-green" />
          </div>
        ) : events.length === 0 ? (
          <EmptyState
            icon={<Calendar className="w-8 h-8" />}
            title="No upcoming events yet"
            description="Check back soon for upcoming events and activities."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <AnimatedSection key={event.id} delay={0.1 + index * 0.1}>
                <Link
                  href={`/events/details?id=${event.id}`}
                  className="block h-full bg-white rounded-xl overflow-hidden soul-shadow-card hover:shadow-lg hover:-translate-y-1 transition-all group"
                >
                  <div className="h-40 bg-soul-cream-dark relative overflow-hidden">
                    {event.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Calendar className="w-10 h-10 text-soul-green/30" />
                      </div>
                    )}
                    {event.is_free && (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-soul-gold text-white text-xs font-semibold">
                        Free
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-soul-green transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4 shrink-0" />
                      {event.date ? format(new Date(event.date), 'MMM d, yyyy') : 'Date TBA'}
                    </div>
                    {event.venue && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span className="line-clamp-1">{event.venue}</span>
                      </div>
                    )}
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        )}

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
