'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Megaphone,
  Bell,
  Star,
  Calendar,
  Heart,
  Gift,
  Trophy,
  AlertCircle,
  Pin,
  Search,
  ChevronDown,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { EmptyState } from '@/components/shared/EmptyState';

type IconComponent = React.ComponentType<{ className?: string }>;

interface Announcement {
  id: string;
  icon: IconComponent;
  iconColor: string;
  iconBg: string;
  title: string;
  snippet: string;
  fullContent: string;
  date: string;
  pinned: boolean;
  category: string;
  status: 'latest' | 'past';
}

const sampleAnnouncements: Announcement[] = [
  {
    id: '1',
    icon: Megaphone,
    iconColor: 'text-soul-green',
    iconBg: 'bg-soul-green/10',
    title: 'New Weekly Schedule Starting This Month',
    snippet:
      'Starting this month, our community gatherings will now be held every Saturday at 10 AM.',
    fullContent:
      'Starting this month, our community gatherings will now be held every Saturday at 10 AM. This new schedule allows more members to participate in our growing community events. We encourage everyone to mark their calendars and spread the word. The first session under this new schedule will begin on the first Saturday of February. Light refreshments will be provided. For questions, reach out to the community coordinators.',
    date: 'Jan 10, 2026',
    pinned: true,
    category: 'General',
    status: 'latest',
  },
  {
    id: '2',
    icon: Bell,
    iconColor: 'text-soul-gold',
    iconBg: 'bg-soul-gold/10',
    title: 'Upcoming Leadership Training Program',
    snippet:
      'We are excited to announce a comprehensive leadership training program starting next month.',
    fullContent:
      'We are excited to announce a comprehensive leadership training program. This 6-week course will cover essential skills for community leaders and entrepreneurs, including public speaking, project management, financial literacy, and emotional intelligence. Sessions will be held every Wednesday evening from 6-8 PM. Limited to 30 participants, so register early. Priority given to active community members.',
    date: 'Jan 8, 2026',
    pinned: true,
    category: 'Education',
    status: 'latest',
  },
  {
    id: '3',
    icon: Trophy,
    iconColor: 'text-soul-brown',
    iconBg: 'bg-soul-brown/10',
    title: 'Community Milestone: 500 Active Members',
    snippet:
      'We are thrilled to announce that our community has officially reached 500 active members!',
    fullContent:
      'We are thrilled to announce that our community has officially reached 500 active members! This milestone is a testament to our collective commitment to growth, support, and positive impact. To celebrate, we are hosting a special community gala next month with performances, awards, and networking opportunities. Each member will receive a commemorative gift. Thank you for being part of this incredible journey.',
    date: 'Jan 5, 2026',
    pinned: false,
    category: 'Milestone',
    status: 'latest',
  },
  {
    id: '4',
    icon: Heart,
    iconColor: 'text-red-500',
    iconBg: 'bg-red-50',
    title: 'Community Outreach: Holiday Food Drive',
    snippet:
      'Join us in our annual holiday food drive to support families in need across the city.',
    fullContent:
      'Join us in our annual holiday food drive to support families in need across the city. We are collecting non-perishable food items, warm clothing, and school supplies. Drop-off points will be available at all community centers starting December 1st through December 20th. Last year we served over 200 families, and this year we aim to double that. Volunteers are also needed for sorting and distribution days.',
    date: 'Dec 1, 2025',
    pinned: false,
    category: 'Outreach',
    status: 'past',
  },
  {
    id: '5',
    icon: Star,
    iconColor: 'text-soul-gold',
    iconBg: 'bg-soul-gold/10',
    title: 'Monthly Innovation Spotlight: Nominate a Leader',
    snippet:
      'Submit your nominations for our monthly innovation spotlight recognizing outstanding community leaders.',
    fullContent:
      'Submit your nominations for our monthly innovation spotlight recognizing outstanding community leaders who are making a difference. The selected leader will be featured in our community newsletter, receive a gift package, and present their work at the next community meetup. Nominations are open to all members and can be submitted through the community portal. Deadline for this month is January 25th.',
    date: 'Dec 15, 2025',
    pinned: false,
    category: 'Recognition',
    status: 'past',
  },
  {
    id: '6',
    icon: Gift,
    iconColor: 'text-soul-brown-light',
    iconBg: 'bg-soul-brown/10',
    title: 'Holiday Celebration Gala Details',
    snippet:
      'The annual Holiday Celebration Gala is back! Here are the details you need to know.',
    fullContent:
      'The annual Holiday Celebration Gala is back! Join us on December 20th at the Grand Ballot Hotel for an evening of celebration, live performances, and community bonding. Tickets are $40 per person and include dinner, drinks, and entertainment. Dress code is semi-formal. Early bird pricing available until December 10th. This is a ticketed event, so please RSVP through the events page to secure your spot.',
    date: 'Dec 10, 2025',
    pinned: false,
    category: 'Events',
    status: 'past',
  },
  {
    id: '7',
    icon: Calendar,
    iconColor: 'text-soul-green-light',
    iconBg: 'bg-soul-green/10',
    title: 'Quarterly Planning Meeting — Open to All',
    snippet:
      'All members are invited to our quarterly planning meeting to shape the direction of the community.',
    fullContent:
      'All members are invited to our quarterly planning meeting to shape the direction of the community for the upcoming quarter. We will discuss new initiatives, budget allocation, volunteer opportunities, and event planning. Your input is invaluable in making our community stronger. The meeting will be held on January 3rd at the SOUL Community Center from 2-4 PM. Refreshments will be provided.',
    date: 'Dec 20, 2025',
    pinned: false,
    category: 'Governance',
    status: 'past',
  },
  {
    id: '8',
    icon: AlertCircle,
    iconColor: 'text-red-500',
    iconBg: 'bg-red-50',
    title: 'Important: Updated Community Guidelines',
    snippet:
      'Please review the updated community guidelines effective immediately.',
    fullContent:
      'Please review the updated community guidelines effective immediately. Key changes include updated code of conduct policies, new social media usage guidelines, and revised event participation rules. All members are required to acknowledge the updated guidelines by January 31st. The full document is available on the community portal under the Resources section. If you have questions, please attend the upcoming town hall or contact the governance committee.',
    date: 'Dec 5, 2025',
    pinned: false,
    category: 'Policy',
    status: 'past',
  },
];

export default function AnnouncementsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredAnnouncements = useMemo(() => {
    return sampleAnnouncements
      .filter((a) => {
        const matchesTab =
          activeTab === 'all' ||
          (activeTab === 'pinned' && a.pinned) ||
          (activeTab === 'latest' && a.status === 'latest') ||
          (activeTab === 'past' && a.status === 'past');

        const matchesSearch =
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.category.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTab && matchesSearch;
      })
      .sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return 0;
      });
  }, [activeTab, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
                {filteredAnnouncements.length === 0 ? (
                  <AnimatedSection>
                    <EmptyState
                      icon={<Megaphone className="w-8 h-8" />}
                      title="No announcements found"
                      description="Try adjusting your search or filter criteria."
                    />
                  </AnimatedSection>
                ) : (
                  <div className="space-y-4">
                    {filteredAnnouncements.map((announcement, index) => {
                      const Icon = announcement.icon;
                      const isExpanded = expandedId === announcement.id;

                      return (
                        <AnimatedSection
                          key={announcement.id}
                          delay={0.05 + index * 0.06}
                        >
                          <motion.div
                            layout
                            className="bg-white rounded-xl soul-shadow-card overflow-hidden cursor-pointer"
                            onClick={() => toggleExpand(announcement.id)}
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="p-6">
                              <div className="flex items-start gap-4">
                                <div
                                  className={`w-12 h-12 rounded-xl ${announcement.iconBg} flex items-center justify-center shrink-0`}
                                >
                                  <Icon
                                    className={`w-6 h-6 ${announcement.iconColor}`}
                                  />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-3">
                                    <h3 className="text-lg font-semibold text-soul-green-dark leading-snug">
                                      {announcement.title}
                                    </h3>
                                    <div className="flex items-center gap-2 shrink-0">
                                      {announcement.pinned && (
                                        <Badge className="bg-soul-gold/20 text-soul-gold border-0 gap-1">
                                          <Pin className="w-3 h-3" />
                                          Pinned
                                        </Badge>
                                      )}
                                      <motion.div
                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                      </motion.div>
                                    </div>
                                  </div>

                                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                                    {announcement.snippet}
                                  </p>

                                  <div className="flex items-center gap-3 mt-3">
                                    <span className="text-xs text-muted-foreground">
                                      {announcement.date}
                                    </span>
                                    <Badge variant="secondary" className="text-xs">
                                      {announcement.category}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-6 pb-6 pt-2 border-t border-soul-cream-dark">
                                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                                      {announcement.fullContent}
                                    </p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </AnimatedSection>
                      );
                    })}
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
