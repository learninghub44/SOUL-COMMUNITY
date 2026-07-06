'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Megaphone, ArrowRight, Pin, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { EmptyState } from '@/components/shared/EmptyState';
import { createClient } from '@/lib/supabase/client';
import { listPublishedAnnouncements } from '@/lib/services/announcements';
import type { Announcement } from '@/types';

export function AnnouncementsPreview() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    listPublishedAnnouncements(supabase)
      .then((data) => {
        if (active) setAnnouncements(data.slice(0, 3));
      })
      .catch(() => {
        if (active) setAnnouncements([]);
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
              Latest Announcements
            </h2>
            <p className="text-lg text-soul-brown max-w-2xl mx-auto">
              Stay informed about what&apos;s happening
            </p>
          </div>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-soul-green" />
          </div>
        ) : announcements.length === 0 ? (
          <EmptyState
            icon={<Megaphone className="w-8 h-8" />}
            title="No announcements yet"
            description="Important updates and news will appear here."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {announcements.map((item, index) => (
              <AnimatedSection key={item.id} delay={0.1 + index * 0.1}>
                <div className="bg-white rounded-xl overflow-hidden soul-shadow-card h-full flex flex-col">
                  {item.image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image_url} alt={item.title} className="w-full h-36 object-cover" />
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {item.is_pinned && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-soul-gold-dark bg-soul-gold/10 px-2 py-0.5 rounded-full">
                          <Pin className="w-3 h-3" /> Pinned
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(item.created_at), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{item.content}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}

        <AnimatedSection delay={0.3}>
          <div className="text-center mt-12">
            <Link
              href="/announcements"
              className="inline-flex items-center px-8 py-4 bg-soul-green-dark text-white rounded-lg font-semibold hover:bg-soul-green transition-colors text-lg"
            >
              View All Announcements
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
