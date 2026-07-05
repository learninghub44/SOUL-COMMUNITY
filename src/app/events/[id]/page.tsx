'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Users,
  Ticket,
  ArrowLeft,
  Clock,
  Share2,
  Heart,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  CheckCircle,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WhatsAppCTA } from '@/components/shared/WhatsAppCTA';
import { SITE_CONFIG } from '@/lib/constants';

interface EventDetail {
  id: string;
  title: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  venueAddress: string;
  mapUrl: string;
  type: 'free' | 'paid';
  price?: string;
  attendees: number;
  maxAttendees: number;
  gradient: string;
  category: string;
  status: 'upcoming' | 'past';
  description: string;
  highlights: string[];
  organizer: {
    name: string;
    role: string;
    avatar: string;
  };
  tickets: {
    remaining: number;
    price: string;
    currency: string;
  };
  faqs: { question: string; answer: string }[];
  gallery: string[];
}

const eventsData: Record<string, EventDetail> = {
  '1': {
    id: '1',
    title: 'SOUL Community Meetup',
    date: 'January 15, 2026',
    time: '6:00 PM',
    endTime: '9:00 PM',
    location: 'SOUL Community Center, Nairobi',
    venueAddress: 'Kenyatta Avenue, Nairobi CBD',
    mapUrl: '#',
    type: 'free',
    attendees: 45,
    maxAttendees: 100,
    gradient: 'from-soul-green to-soul-green-light',
    category: 'Social',
    status: 'upcoming',
    description:
      'Join us for our monthly community meetup where members come together to connect, share experiences, and strengthen the bonds that make SOUL special. This is a great opportunity to meet new faces, reconnect with friends, and engage in meaningful conversations in a warm, welcoming environment.',
    highlights: [
      'Icebreaker activities and networking sessions',
      'Community updates and upcoming events preview',
      'Open mic for sharing stories and experiences',
      'Light refreshments and snacks provided',
      'Photo booth with SOUL branded props',
    ],
    organizer: {
      name: 'Sarah Wanjiku',
      role: 'Events Coordinator',
      avatar: 'SW',
    },
    tickets: {
      remaining: 55,
      price: 'Free',
      currency: 'KES',
    },
    faqs: [
      {
        question: 'Do I need to register to attend?',
        answer:
          'While registration is not mandatory, we recommend signing up so we can plan for refreshments and seating. You can register through our WhatsApp community or at the door.',
      },
      {
        question: 'Is there parking available?',
        answer:
          'Yes, there is parking available at the community center. We also encourage carpooling and using public transport as the venue is easily accessible.',
      },
      {
        question: 'Can I bring a friend?',
        answer:
          'Absolutely! SOUL is open to everyone. Feel free to bring friends who might be interested in joining our community. They are welcome to attend as guests.',
      },
      {
        question: 'What should I wear?',
        answer:
          'Come as you are! Our meetups are casual and relaxed. Wear whatever makes you comfortable.',
      },
    ],
    gallery: [
      '/images/events/meetup-1.jpg',
      '/images/events/meetup-2.jpg',
      '/images/events/meetup-3.jpg',
      '/images/events/meetup-4.jpg',
      '/images/events/meetup-5.jpg',
      '/images/events/meetup-6.jpg',
    ],
  },
  '2': {
    id: '2',
    title: 'Business Networking Night',
    date: 'January 22, 2026',
    time: '7:00 PM',
    endTime: '10:00 PM',
    location: 'Downtown Conference Hall',
    venueAddress: 'Moi Avenue, Nairobi',
    mapUrl: '#',
    type: 'paid',
    price: '$25',
    attendees: 80,
    maxAttendees: 120,
    gradient: 'from-soul-brown to-soul-brown-light',
    category: 'Professional',
    status: 'upcoming',
    description:
      'Elevate your professional network at our exclusive Business Networking Night. Connect with entrepreneurs, professionals, and business leaders in a sophisticated setting designed for meaningful business conversations and collaborations.',
    highlights: [
      'Keynote speaker: Building a Purpose-Driven Business',
      'Structured networking sessions with industry groups',
      'Business card exchange and digital networking',
      'Panel discussion on entrepreneurship in Kenya',
      'Cocktails and canapés included',
    ],
    organizer: {
      name: 'James Kariuki',
      role: 'Professional Events Lead',
      avatar: 'JK',
    },
    tickets: {
      remaining: 40,
      price: '3,500',
      currency: 'KES',
    },
    faqs: [
      {
        question: 'What is included in the ticket price?',
        answer:
          'Your ticket includes access to all networking sessions, keynote speeches, panel discussions, cocktails, canapés, and a welcome drink. Additional drinks can be purchased at the venue.',
      },
      {
        question: 'Is this event suitable for new entrepreneurs?',
        answer:
          'Yes! This event is perfect for entrepreneurs at all stages. You will meet experienced business leaders and fellow newcomers, making it ideal for learning and building connections.',
      },
      {
        question: 'Can I get a refund if I cannot attend?',
        answer:
          'Refunds are available up to 48 hours before the event. After that, you can transfer your ticket to another person by contacting us.',
      },
    ],
    gallery: [
      '/images/events/networking-1.jpg',
      '/images/events/networking-2.jpg',
      '/images/events/networking-3.jpg',
    ],
  },
};

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const event = eventsData[id];

  if (!event) {
    return (
      <>
        <PageHeader
          title="Event Not Found"
          description="The event you are looking for does not exist or has been removed."
        />
        <section className="py-20 px-4 bg-soul-cream">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <p className="text-lg text-muted-foreground mb-8">
                We could not find an event with ID &quot;{id}&quot;.
              </p>
              <Link href="/events">
                <Button className="bg-soul-green hover:bg-soul-green-dark text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Events
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </section>
        <WhatsAppCTA />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={event.title}
        description={`${event.date} • ${event.time} - ${event.endTime}`}
        className="!py-20 lg:!py-28"
      >
        <div className="mt-4 flex items-center justify-center gap-3">
          <Badge
            variant={event.type === 'free' ? 'default' : 'secondary'}
            className={
              event.type === 'free'
                ? 'bg-soul-green text-white'
                : 'bg-soul-gold text-soul-green-dark'
            }
          >
            <Ticket className="w-3 h-3 mr-1" />
            {event.type === 'free' ? 'Free Event' : event.price}
          </Badge>
          <Badge variant="outline" className="bg-white/20 text-white border-white/30">
            {event.category}
          </Badge>
        </div>
      </PageHeader>

      {/* Back Link */}
      <section className="py-4 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-soul-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
        </div>
      </section>

      {/* Event Poster */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div
              className={`h-64 md:h-96 rounded-2xl bg-gradient-to-br ${event.gradient} relative overflow-hidden`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Calendar className="w-24 h-24 text-white/20" />
              </div>
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                  <Share2 className="w-5 h-5 text-white" />
                </button>
                <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                  <Heart className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Event Details Grid */}
      <section className="py-12 px-4 bg-soul-cream">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatedSection>
              <div className="bg-white rounded-2xl p-8 soul-shadow-card">
                <h2 className="text-2xl font-bold text-soul-green-dark font-[family-name:var(--font-playfair)] mb-4">
                  About This Event
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-6">
                  {event.description}
                </p>

                <h3 className="text-lg font-semibold text-foreground mb-4">Event Highlights</h3>
                <ul className="space-y-3">
                  {event.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-soul-green shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Gallery Preview */}
            {event.gallery.length > 0 && (
              <AnimatedSection delay={0.1}>
                <div className="bg-white rounded-2xl p-8 soul-shadow-card">
                  <h2 className="text-2xl font-bold text-soul-green-dark font-[family-name:var(--font-playfair)] mb-6">
                    Gallery Preview
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {event.gallery.slice(0, 6).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-lg bg-gradient-to-br from-soul-cream-dark to-soul-cream flex items-center justify-center"
                      >
                        <Calendar className="w-8 h-8 text-muted-foreground/40" />
                      </div>
                    ))}
                  </div>
                  {event.gallery.length > 6 && (
                    <div className="mt-4 text-center">
                      <Button variant="outline" className="text-soul-green">
                        View All Photos ({event.gallery.length})
                      </Button>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            )}

            {/* FAQs */}
            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-2xl p-8 soul-shadow-card">
                <h2 className="text-2xl font-bold text-soul-green-dark font-[family-name:var(--font-playfair)] mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {event.faqs.map((faq, i) => (
                    <details key={i} className="group">
                      <summary className="flex items-center justify-between cursor-pointer py-4 text-foreground font-medium list-none">
                        {faq.question}
                        <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform shrink-0 ml-4" />
                      </summary>
                      <p className="text-muted-foreground pb-4 leading-relaxed">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Date & Time Card */}
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-2xl p-6 soul-shadow-card">
                <h3 className="font-semibold text-foreground mb-4">Date & Time</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-soul-green/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-soul-green" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium text-foreground">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-soul-green/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-soul-green" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium text-foreground">
                        {event.time} - {event.endTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Location Card */}
            <AnimatedSection delay={0.15}>
              <div className="bg-white rounded-2xl p-6 soul-shadow-card">
                <h3 className="font-semibold text-foreground mb-4">Location</h3>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-soul-green/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-soul-green" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{event.location}</p>
                    <p className="text-sm text-muted-foreground mt-1">{event.venueAddress}</p>
                    <a
                      href={event.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-soul-green font-medium mt-2 hover:underline"
                    >
                      View on map
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Ticket Info Card */}
            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-2xl p-6 soul-shadow-card">
                <h3 className="font-semibold text-foreground mb-4">Tickets</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="text-xl font-bold text-soul-green-dark">
                      {event.type === 'free' ? 'Free' : event.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Remaining</span>
                    <span className="font-medium text-foreground">
                      {event.tickets.remaining} / {event.maxAttendees}
                    </span>
                  </div>
                  <div className="h-2 bg-soul-cream-dark rounded-full overflow-hidden">
                    <div
                      className="h-full bg-soul-green rounded-full"
                      style={{
                        width: `${((event.maxAttendees - event.tickets.remaining) / event.maxAttendees) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {event.tickets.remaining} tickets remaining
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  {event.type === 'free' ? (
                    <a
                      href={SITE_CONFIG.whatsappCommunityLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full bg-soul-green hover:bg-soul-green-dark text-white">
                        Join Event
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  ) : (
                    <Button className="w-full bg-soul-gold hover:bg-soul-gold/90 text-soul-green-dark">
                      <Ticket className="w-4 h-4 mr-2" />
                      Buy Ticket
                    </Button>
                  )}
                </div>
              </div>
            </AnimatedSection>

            {/* Organizer Card */}
            <AnimatedSection delay={0.25}>
              <div className="bg-white rounded-2xl p-6 soul-shadow-card">
                <h3 className="font-semibold text-foreground mb-4">Organizer</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-soul-green/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-soul-green">
                      {event.organizer.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{event.organizer.name}</p>
                    <p className="text-sm text-muted-foreground">{event.organizer.role}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Attendees Card */}
            <AnimatedSection delay={0.3}>
              <div className="bg-white rounded-2xl p-6 soul-shadow-card">
                <h3 className="font-semibold text-foreground mb-4">Attendees</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-soul-green/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-soul-green" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {event.attendees} / {event.maxAttendees}
                    </p>
                    <p className="text-sm text-muted-foreground">people attending</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <WhatsAppCTA />
    </>
  );
}
