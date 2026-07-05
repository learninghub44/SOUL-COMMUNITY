'use client';

import { useState } from 'react';
import { Calendar, Search, Filter } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { EmptyState } from '@/components/shared/EmptyState';

const categories = ['All', 'Social', 'Professional', 'Outdoor', 'Wellness', 'Celebration'];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <>
      <PageHeader
        title="Events"
        description="Discover upcoming events, workshops, and experiences. Connect, learn, and grow with the SOUL community."
      />

      <section className="py-12 px-4 bg-soul-cream">
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
                <AnimatedSection>
                  <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                    <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                          selectedCategory === category
                            ? 'bg-soul-green text-white'
                            : 'bg-white text-muted-foreground hover:text-foreground hover:bg-soul-cream-dark'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </AnimatedSection>

                <EmptyState
                  icon={<Calendar className="w-8 h-8" />}
                  title="No events yet"
                  description="Events will appear here once they are created."
                />
              </TabsContent>
            </Tabs>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
