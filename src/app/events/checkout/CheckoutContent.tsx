'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import { getEvent } from '@/lib/services/events';
import { createTicket } from '@/lib/services/tickets';
import type { Event } from '@/types';

export default function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id') || '';

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [submitting, setSubmitting] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!event) return;
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      toast.error('Please fill in your name, email and phone number');
      return;
    }

    setSubmitting(true);
    try {
      const supabase = createClient();
      const ticket = await createTicket(supabase, {
        event_id: event.id,
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        is_free: event.is_free,
      });
      const params = new URLSearchParams({
        ref: ticket.ticket_reference,
        event: event.title,
        name: fullName.trim(),
        free: event.is_free ? '1' : '0',
        date: event.date || '',
        venue: event.venue || '',
        phone: phone.trim(),
      });
      router.push(`/events/confirmation?${params.toString()}`);
    } catch {
      toast.error('Could not complete your registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

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
          title="Workshop Not Found"
          description="The workshop you are looking for does not exist."
        />
        <section className="py-20 px-4 bg-soul-cream">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/events">
              <Button className="bg-soul-green hover:bg-soul-green-dark text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Events
              </Button>
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader title={event.is_free ? 'Reserve Your Spot' : 'Get Your Ticket'} />

      <section className="py-16 px-4 bg-soul-cream">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection>
            <div className="bg-white rounded-2xl soul-shadow-card p-6 mb-6">
              <h2 className="font-semibold text-lg text-foreground mb-2">{event.title}</h2>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {event.date ? format(new Date(event.date), 'MMM d, yyyy') : 'Date TBA'}
                </span>
                {event.venue && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {event.venue}
                  </span>
                )}
              </div>
              {!event.is_free && (
                <p className="mt-3 text-sm text-soul-brown">
                  Ticket price: <strong>KES {event.ticket_price}</strong>. After you submit your
                  details below, our team will reach out with payment instructions to confirm
                  your spot.
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl soul-shadow-card p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  WhatsApp / Phone Number
                </label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0712 345 678"
                  required
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Your ticket can be sent to this number on WhatsApp.
                </p>
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-soul-green hover:bg-soul-green-dark text-white text-lg py-6"
              >
                {submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : event.is_free ? (
                  'Confirm Reservation'
                ) : (
                  'Submit Registration'
                )}
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
