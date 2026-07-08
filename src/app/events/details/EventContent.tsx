'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, MapPin, Users, ArrowLeft, Loader2, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Button, buttonVariants } from '@/components/ui/button';
import { WhatsAppCTA } from '@/components/shared/WhatsAppCTA';
import { WhatsAppJoinGate } from '@/components/shared/WhatsAppJoinGate';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { getEvent } from '@/lib/services/events';
import type { Event } from '@/types';

export default function EventContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (!id) return;
    let active = true;
    const supabase = createClient();

    getEvent(supabase, id)
      .then((data) => {
        if (active) setEvent(data);
      })
      .catch(() => {
        if (active) setEvent(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-soul-green" />
      </div>
    );
  }

  if (!event || event.status !== 'published') {
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
                We could not find that event. It may have been removed.
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

  const spotsLeft = event.capacity ? Math.max(event.capacity - (event.tickets_sold || 0), 0) : null;
  const soldOut = spotsLeft !== null && spotsLeft <= 0;

  return (
    <>
      <PageHeader title={event.title} description={event.venue || undefined} />

      <section className="py-16 px-4 bg-soul-cream">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="bg-white rounded-2xl overflow-hidden soul-shadow-card mb-8">
              {event.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={event.image_url} alt={event.title} className="w-full h-64 object-cover" />
              )}
              <div className="p-8">
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2 text-foreground">
                    <Calendar className="w-5 h-5 text-soul-green" />
                    {event.date ? format(new Date(event.date), 'EEEE, MMMM d, yyyy') : 'Date TBA'}
                    {event.time ? ` · ${event.time}` : ''}
                  </div>
                  {event.venue && (
                    <div className="flex items-center gap-2 text-foreground">
                      <MapPin className="w-5 h-5 text-soul-green" />
                      {event.venue}
                    </div>
                  )}
                  {event.capacity ? (
                    <div className="flex items-center gap-2 text-foreground">
                      <Users className="w-5 h-5 text-soul-green" />
                      {soldOut ? 'Sold out' : `${spotsLeft} spots left`}
                    </div>
                  ) : null}
                </div>

                {event.description && (
                  <p className="text-foreground/80 leading-relaxed whitespace-pre-line mb-8">
                    {event.description}
                  </p>
                )}

                {event.faqs && event.faqs.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-soul-green-dark font-heading mb-4">FAQs</h2>
                    <div className="space-y-4">
                      {event.faqs.map((faq, i) => (
                        <div key={i}>
                          <h3 className="font-semibold text-foreground mb-1">{faq.question}</h3>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  {!soldOut ? (
                    <Link href={`/events/checkout?id=${event.id}`} className="flex-1">
                      <Button className="w-full bg-soul-green hover:bg-soul-green-dark text-white text-lg py-6">
                        {event.is_free ? 'Reserve Your Spot' : `Get Ticket · KES ${event.ticket_price}`}
                      </Button>
                    </Link>
                  ) : (
                    <Button disabled className="flex-1 text-lg py-6">
                      Sold Out
                    </Button>
                  )}
                  {event.whatsapp_link && (
                    <WhatsAppJoinGate
                      className={cn(buttonVariants({ variant: 'outline' }), 'w-full sm:w-auto text-lg py-6')}
                    >
                      WhatsApp Group
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </WhatsAppJoinGate>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-soul-green hover:text-soul-green-dark font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Events
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
