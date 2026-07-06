'use client';

import { useEffect, useMemo, useState } from 'react';
import { Megaphone, Search, Pin, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { EmptyState } from '@/components/shared/EmptyState';
import { createClient } from '@/lib/supabase/client';
import { listPublishedAnnouncements } from '@/lib/services/announcements';
import type { Announcement } from '@/types';

export default function AnnouncementsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    listPublishedAnnouncements(supabase)
      .then((data) => {
        if (active) setAnnouncements(data);
      })
      .catch((err) => {
        console.error('Failed to load announcements:', err);
        if (active) {
          setAnnouncements([]);
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

  const thirtyDaysAgo = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d;
  }, []);

  const filtered = useMemo(() => {
    return announcements.filter((item) => {
      if (activeTab === 'pinned' && !item.is_pinned) return false;
      if (activeTab === 'latest' && new Date(item.created_at) < thirtyDaysAgo) return false;
      if (activeTab === 'past' && new Date(item.created_at) >= thirtyDaysAgo) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!`${item.title} ${item.content}`.toLowerCase().includes(q)) return false;
      }

      return true;
    });
  }, [announcements, activeTab, searchQuery, thirtyDaysAgo]);

  return (
    <>
      <PageHeader
        title="Announcements"
        description="Stay updated with the latest from our community"
      />

      <section className="py-12 px-4 bg-soul-cream min-h-[60vh]">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search announcements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-white"
                />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-8">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pinned">Pinned</TabsTrigger>
                <TabsTrigger value="latest">Latest</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                {loading ? (
                  <div className="flex justify-center py-16">
                    <Loader2 className="w-6 h-6 animate-spin text-soul-green" />
                  </div>
                ) : loadError ? (
                  <EmptyState
                    icon={<Megaphone className="w-8 h-8" />}
                    title="Couldn't load announcements"
                    description="Something went wrong reaching the server. Please refresh the page or try again shortly."
                  />
                ) : filtered.length === 0 ? (
                  <EmptyState
                    icon={<Megaphone className="w-8 h-8" />}
                    title="No announcements found"
                    description="Important updates and news will appear here."
                  />
                ) : (
                  <div className="space-y-4">
                    {filtered.map((item, index) => (
                      <AnimatedSection key={item.id} delay={0.05 + index * 0.05}>
                        <div className="bg-white rounded-xl soul-shadow-card p-6 flex flex-col sm:flex-row gap-5">
                          {item.image_url && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="w-full sm:w-40 h-32 sm:h-28 object-cover rounded-lg shrink-0"
                            />
                          )}
                          <div className="flex-1">
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
                            <h3 className="font-semibold text-lg text-foreground mb-1.5">{item.title}</h3>
                            <p className="text-sm text-muted-foreground whitespace-pre-line">
                              {item.content}
                            </p>
                          </div>
                        </div>
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
