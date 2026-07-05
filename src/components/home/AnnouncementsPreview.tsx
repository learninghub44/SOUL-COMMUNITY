'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Megaphone, Bell, Trophy, ArrowRight, Pin } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

interface Announcement {
  id: string;
  icon: typeof Megaphone;
  iconColor: string;
  iconBg: string;
  title: string;
  snippet: string;
  date: string;
  pinned: boolean;
}

const sampleAnnouncements: Announcement[] = [
  {
    id: '1',
    icon: Megaphone,
    iconColor: 'text-soul-green',
    iconBg: 'bg-soul-green/10',
    title: 'New Weekly Schedule',
    snippet:
      'Starting this month, our community gatherings will now be held every Saturday at 10 AM. This new schedule allows more members to participate in our growing community events.',
    date: 'Jan 10, 2026',
    pinned: true,
  },
  {
    id: '2',
    icon: Bell,
    iconColor: 'text-soul-gold',
    iconBg: 'bg-soul-gold/10',
    title: 'Upcoming Leadership Training',
    snippet:
      'We are excited to announce a comprehensive leadership training program. This 6-week course will cover essential skills for community leaders and entrepreneurs.',
    date: 'Jan 8, 2026',
    pinned: false,
  },
  {
    id: '3',
    icon: Trophy,
    iconColor: 'text-soul-brown',
    iconBg: 'bg-soul-brown/10',
    title: 'Community Milestone Reached',
    snippet:
      'We are thrilled to announce that our community has officially reached 500 active members! This milestone is a testament to our collective commitment to growth.',
    date: 'Jan 5, 2026',
    pinned: false,
  },
];

export function AnnouncementsPreview() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleAnnouncements.map((announcement, index) => (
            <AnimatedSection key={announcement.id} delay={index * 0.1}>
              <motion.div
                className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-xl ${announcement.iconBg} flex items-center justify-center`}
                  >
                    <announcement.icon
                      className={`w-7 h-7 ${announcement.iconColor}`}
                    />
                  </div>
                  {announcement.pinned && (
                    <span className="inline-flex items-center gap-1 bg-soul-gold/20 text-soul-gold text-xs font-semibold px-3 py-1 rounded-full">
                      <Pin className="w-3 h-3" />
                      Pinned
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-soul-green-dark mb-3">
                  {announcement.title}
                </h3>

                <p className="text-soul-brown text-sm leading-relaxed mb-4 flex-1">
                  {announcement.snippet}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-soul-cream-dark">
                  <span className="text-soul-brown/60 text-sm">
                    {announcement.date}
                  </span>
                  <Link
                    href={`/announcements/${announcement.id}`}
                    className="text-soul-green font-semibold text-sm hover:text-soul-green-dark transition-colors inline-flex items-center"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

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
