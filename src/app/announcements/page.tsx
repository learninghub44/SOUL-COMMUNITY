'use client';

import { useState } from 'react';
import { Megaphone, Search } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { EmptyState } from '@/components/shared/EmptyState';

export default function AnnouncementsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <PageHeader
        title="Announcements"
        description="Stay updated with the latest from our community"
      />

      <section className="py-12 px-4 bg-soul-cream">
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
                <EmptyState
                  icon={<Megaphone className="w-8 h-8" />}
                  title="No announcements yet"
                  description="Important updates and news will appear here."
                />
              </TabsContent>
            </Tabs>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
