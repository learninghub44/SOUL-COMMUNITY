'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Users,
  Search,
  Filter,
  Ticket,
  ArrowRight,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'free' | 'paid';
  price?: string;
  attendees: number;
  maxAttendees: number;
  gradient: string;
  category: string;
  status: 'upcoming' | 'past';
}

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'SOUL Community Meetup',
    date: 'Jan 15, 2026',
    time: '6:00 PM EAT',
    location: 'SOUL Community Center, Nairobi',
    type: 'free',
    attendees: 45,
    maxAttendees: 100,
    gradient: 'from-soul-green to-soul-green-light',
    category: 'Social',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Business Networking Night',
    date: 'Jan 22, 2026',
    time: '7:00 PM EAT',
    location: 'Downtown Conference Hall',
    type: 'paid',
    price: '$25',
    attendees: 80,
    maxAttendees: 120,
    gradient: 'from-soul-brown to-soul-brown-light',
    category: 'Professional',
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Nature Hike Adventure',
    date: 'Jan 29, 2026',
    time: '8:00 AM EAT',
    location: 'Greenwood Trail Park',
    type: 'free',
    attendees: 30,
    maxAttendees: 50,
    gradient: 'from-soul-gold to-soul-gold-light',
    category: 'Outdoor',
    status: 'upcoming',
  },
  {
    id: '4',
    title: 'Mental Wellness Workshop',
    date: 'Dec 10, 2025',
    time: '5:00 PM EAT',
    location: 'Wellness Hub, Westlands',
    type: 'paid',
    price: '$15',
    attendees: 60,
    maxAttendees: 60,
    gradient: 'from-soul-green-dark to-soul-green',
    category: 'Wellness',
    status: 'past',
  },
  {
    id: '5',
    title: 'Holiday Celebration Gala',
    date: 'Dec 20, 2025',
    time: '6:30 PM EAT',
    location: 'Grand Ballot Hotel',
    type: 'paid',
    price: '$40',
    attendees: 150,
    maxAttendees: 150,
    gradient: 'from-soul-gold to-soul-brown-light',
    category: 'Celebration',
    status: 'past',
  },
];

const categories = ['All', 'Social', 'Professional', 'Outdoor', 'Wellness', 'Celebration'];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = useMemo(() => {
    return sampleEvents.filter((event) => {
      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'upcoming' && event.status === 'upcoming') ||
        (activeTab === 'past' && event.status === 'past') ||
        (activeTab === 'free' && event.type === 'free') ||
        (activeTab === 'paid' && event.type === 'paid');

      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || event.category === selectedCategory;

      return matchesTab && matchesSearch && matchesCategory;
    });
  }, [activeTab, searchQuery, selectedCategory]);

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

                {filteredEvents.length === 0 ? (
                  <AnimatedSection>
                    <div className="text-center py-16">
                      <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        No events found
                      </h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search or filter criteria.
                      </p>
                    </div>
                  </AnimatedSection>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredEvents.map((event, index) => (
                      <AnimatedSection key={event.id} delay={0.05 + index * 0.08}>
                        <motion.div
                          className="bg-white rounded-xl overflow-hidden soul-shadow-card h-full flex flex-col"
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div
                            className={`h-48 bg-gradient-to-br ${event.gradient} relative overflow-hidden`}
                          >
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Calendar className="w-16 h-16 text-white/30" />
                            </div>
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-white/90 text-soul-green-dark">
                                {event.category}
                              </Badge>
                            </div>
                            <div className="absolute top-4 right-4">
                              <Badge
                                variant={event.type === 'free' ? 'default' : 'secondary'}
                                className={
                                  event.type === 'free'
                                    ? 'bg-soul-green text-white'
                                    : 'bg-soul-gold text-soul-green-dark'
                                }
                              >
                                <Ticket className="w-3 h-3 mr-1" />
                                {event.type === 'free' ? 'Free' : event.price}
                              </Badge>
                            </div>
                            {event.status === 'past' && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <Badge variant="outline" className="bg-white/90 text-foreground border-white/20">
                                  Past Event
                                </Badge>
                              </div>
                            )}
                          </div>

                          <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-soul-green-dark mb-3">
                              {event.title}
                            </h3>

                            <div className="space-y-2 mb-4 flex-1">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4 mr-2 text-soul-green shrink-0" />
                                {event.date}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Users className="w-4 h-4 mr-2 text-soul-green shrink-0" />
                                {event.time}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4 mr-2 text-soul-green shrink-0" />
                                {event.location}
                              </div>
                            </div>

                            <div className="mb-4">
                              <div className="flex items-center justify-between text-sm mb-1.5">
                                <span className="text-muted-foreground">
                                  {event.attendees} / {event.maxAttendees} attending
                                </span>
                                <span className="font-medium text-soul-green">
                                  {Math.round((event.attendees / event.maxAttendees) * 100)}%
                                </span>
                              </div>
                              <div className="h-2 bg-soul-cream-dark rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-soul-green rounded-full transition-all"
                                  style={{
                                    width: `${(event.attendees / event.maxAttendees) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>

                            <Link href={`/events/${event.id}`}>
                              <Button className="w-full bg-soul-green hover:bg-soul-green-dark text-white">
                                View Details
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </Link>
                          </div>
                        </motion.div>
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
