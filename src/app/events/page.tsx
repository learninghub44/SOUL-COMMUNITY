'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Calendar, Search, MapPin, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { EmptyState } from '@/components/shared/EmptyState';
import { createClient } from '@/lib/supabase/client';
import { listPublishedEvents } from '@/lib/services/events';
import type { Event } from '@/types';

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    listPublishedEvents(supabase)
      .then((data) => {
        if (active) setEvents(data);
      })
      .catch((err) => {
        console.error('Failed to load events:', err);
        if (active) {
          setEvents([]);
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

  const today = new Date().toISOString().slice(0, 10);

  const filtered = useMemo(() => {
    return events.filter((event) => {
      if (activeTab === 'upcoming' && event.date && event.date < today) return false;
      if (activeTab === 'past' && (!event.date || event.date >= today)) return false;
      if (activeTab === 'free' && !event.is_free) return false;
      if (activeTab === 'paid' && event.is_free) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const haystack = `${event.title} ${event.description ?? ''} ${event.venue ?? ''}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [events, activeTab, searchQuery, today]);

  return (
    <>
      <PageHeader
        title="Events"
        description="Discover upcoming events, workshops, and experiences. Connect, learn, and grow with the SOUL community."
      />

      <section className="py-12 px-4 bg-soul-cream min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                  <TabsTrigger value="free">Free</TabsTrigger>
                  <TabsTrigger value="paid">Paid</TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search events..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 bg-white"
                    />
                  </div>
                </div>
              </div>

              <TabsContent value={activeTab}>
                {loading ? (
                  <div className="flex justify-center py-16">
                    <Loader2 className="w-6 h-6 animate-spin text-soul-green" />
                  </div>
                ) : loadError ? (
                  <EmptyState
                    icon={<Calendar className="w-8 h-8" />}
                    title="Couldn't load events"
                    description="Something went wrong reaching the server. Please refresh the page or try again shortly."
                  />
                ) : filtered.length === 0 ? (
                  <EmptyState
                    icon={<Calendar className="w-8 h-8" />}
                    title="No events found"
                    description="Try a different filter or check back soon for new events."
                  />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((event, index) => (
                      <AnimatedSection key={event.id} delay={0.05 + index * 0.05}>
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
              </TabsContent>
            </Tabs>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
