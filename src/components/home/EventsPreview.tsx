'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Tag, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'free' | 'paid';
  price?: string;
  attendees: number;
  gradient: string;
  category: string;
}

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Community Meetup',
    date: 'Jan 15, 2026',
    time: '6:00 PM',
    location: 'SOUL Community Center',
    type: 'free',
    attendees: 45,
    gradient: 'from-soul-green to-soul-green-light',
    category: 'Social',
  },
  {
    id: '2',
    title: 'Business Networking Night',
    date: 'Jan 22, 2026',
    time: '7:00 PM',
    location: 'Downtown Conference Hall',
    type: 'paid',
    price: '$25',
    attendees: 80,
    gradient: 'from-soul-brown to-soul-brown-light',
    category: 'Professional',
  },
  {
    id: '3',
    title: 'Nature Hike Adventure',
    date: 'Jan 29, 2026',
    time: '8:00 AM',
    location: 'Greenwood Trail Park',
    type: 'free',
    attendees: 30,
    gradient: 'from-soul-gold to-soul-gold-light',
    category: 'Outdoor',
  },
];

export function EventsPreview() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleEvents.map((event, index) => (
            <AnimatedSection key={event.id} delay={index * 0.1}>
              <motion.div
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                onHoverStart={() => setHoveredId(event.id)}
                onHoverEnd={() => setHoveredId(null)}
                whileHover={{ y: -5 }}
              >
                <div
                  className={`h-48 bg-gradient-to-br ${event.gradient} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Calendar className="w-16 h-16 text-white/30" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-soul-green-dark text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        event.type === 'free'
                          ? 'bg-soul-green text-white'
                          : 'bg-soul-gold text-soul-green-dark'
                      }`}
                    >
                      {event.type === 'free' ? 'Free' : event.price}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-soul-green-dark mb-3">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-4 flex-1">
                    <div className="flex items-center text-soul-brown text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-soul-green" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-soul-brown text-sm">
                      <Clock className="w-4 h-4 mr-2 text-soul-green" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-soul-brown text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-soul-green" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-soul-brown text-sm">
                      <Users className="w-4 h-4 mr-2 text-soul-green" />
                      {event.attendees} attending
                    </div>
                  </div>

                  <Link
                    href={`/events/${event.id}`}
                    className="inline-flex items-center justify-center w-full px-4 py-3 bg-soul-green text-white rounded-lg font-semibold hover:bg-soul-green-dark transition-colors"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

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
