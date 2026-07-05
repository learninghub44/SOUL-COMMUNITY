'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  CreditCard,
  Shield,
  CheckCircle,
  Ticket,
  Lock,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const eventsData: Record<string, { title: string; price: string; currency: string; gradient: string }> = {
  '1': { title: 'SOUL Community Meetup', price: 'Free', currency: 'KES', gradient: 'from-soul-green to-soul-green-light' },
  '2': { title: 'Business Networking Night', price: '3,500', currency: 'KES', gradient: 'from-soul-brown to-soul-brown-light' },
  '3': { title: 'Mental Health Workshop', price: '1,500', currency: 'KES', gradient: 'from-soul-green-light to-soul-gold' },
  '4': { title: 'Outdoor Adventure Day', price: '2,000', currency: 'KES', gradient: 'from-soul-green-dark to-soul-green' },
};

type Step = 'details' | 'payment' | 'confirmation';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
}

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const event = eventsData[id];
  const [step, setStep] = useState<Step>('details');
  const [formData, setFormData] = useState<FormData>({ fullName: '', email: '', phone: '' });
  const [ticketRef, setTicketRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!event) {
    return (
      <>
        <PageHeader
          title="Event Not Found"
          description="The event you are looking for does not exist."
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

  const isFree = event.price === 'Free';

  const generateTicketRef = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let ref = 'SOUL-';
    for (let i = 0; i < 8; i++) {
      ref += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return ref;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const ref = generateTicketRef();
    setTicketRef(ref);
    setIsSubmitting(false);
    setStep('confirmation');
  };

  const steps: { key: Step; label: string; num: number }[] = [
    { key: 'details', label: 'Details', num: 1 },
    { key: 'payment', label: 'Payment', num: 2 },
    { key: 'confirmation', label: 'Confirmation', num: 3 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  return (
    <>
      <PageHeader
        title="Checkout"
        description={`Complete your registration for ${event.title}`}
      />

      <section className="py-4 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <Link
            href={`/events/${id}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-soul-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Event
          </Link>
        </div>
      </section>

      <section className="py-12 px-4 bg-soul-cream min-h-[60vh]">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center justify-center mb-10">
              {steps.map((s, i) => (
                <div key={s.key} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                        currentStepIndex >= i
                          ? 'bg-soul-green text-white'
                          : 'bg-soul-cream-dark text-muted-foreground'
                      }`}
                    >
                      {currentStepIndex > i ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        s.num
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium hidden sm:inline ${
                        currentStepIndex >= i ? 'text-soul-green-dark' : 'text-muted-foreground'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`w-12 sm:w-20 h-0.5 mx-2 sm:mx-4 ${
                        currentStepIndex > i ? 'bg-soul-green' : 'bg-soul-cream-dark'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {step === 'details' && (
                <AnimatedSection>
                  <Card className="soul-shadow-card">
                    <CardHeader>
                      <CardTitle className="text-xl text-soul-green-dark font-[family-name:var(--font-playfair)]">
                        Your Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleDetailsSubmit} className="space-y-5">
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1.5">
                            Full Name
                          </label>
                          <Input
                            id="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                            Email Address
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                            Phone Number
                          </label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+254 7XX XXX XXX"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-soul-green hover:bg-soul-green-dark text-white"
                        >
                          Continue to Payment
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              )}

              {step === 'payment' && (
                <AnimatedSection>
                  <Card className="soul-shadow-card">
                    <CardHeader>
                      <CardTitle className="text-xl text-soul-green-dark font-[family-name:var(--font-playfair)] flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Payment Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handlePaymentSubmit} className="space-y-5">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-foreground mb-1.5">
                            Card Number
                          </label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiry" className="block text-sm font-medium text-foreground mb-1.5">
                              Expiry Date
                            </label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-foreground mb-1.5">
                              CVV
                            </label>
                            <Input
                              id="cvv"
                              type="password"
                              placeholder="***"
                              maxLength={4}
                              required
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-3 rounded-lg bg-soul-green/5 border border-soul-green/20">
                          <Shield className="w-4 h-4 text-soul-green shrink-0" />
                          <p className="text-xs text-muted-foreground">
                            Your payment information is encrypted and secure.
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep('details')}
                            className="flex-1"
                          >
                            Back
                          </Button>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-soul-gold hover:bg-soul-gold/90 text-soul-green-dark"
                          >
                            {isSubmitting ? (
                              <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-soul-green-dark/30 border-t-soul-green-dark rounded-full animate-spin" />
                                Processing...
                              </span>
                            ) : (
                              <>
                                <Lock className="w-4 h-4 mr-2" />
                                Complete Purchase
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              )}

              {step === 'confirmation' && (
                <AnimatedSection>
                  <Card className="soul-shadow-card text-center">
                    <CardContent className="pt-8 pb-8">
                      <div className="w-16 h-16 rounded-full bg-soul-green/10 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-soul-green" />
                      </div>
                      <h2 className="text-2xl font-bold text-soul-green-dark font-[family-name:var(--font-playfair)] mb-2">
                        Booking Confirmed!
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        Your ticket has been reserved successfully. A confirmation email has been sent to{' '}
                        <span className="font-medium text-foreground">{formData.email}</span>.
                      </p>

                      <div className="bg-soul-cream rounded-xl p-6 mb-6 inline-block">
                        <p className="text-sm text-muted-foreground mb-1">Ticket Reference</p>
                        <p className="text-2xl font-mono font-bold text-soul-green-dark tracking-wider">
                          {ticketRef}
                        </p>
                      </div>

                      <div className="space-y-3 text-sm text-muted-foreground">
                        <p>
                          <span className="font-medium text-foreground">Event:</span> {event.title}
                        </p>
                        <p>
                          <span className="font-medium text-foreground">Attendee:</span> {formData.fullName}
                        </p>
                        <p>
                          <span className="font-medium text-foreground">Amount:</span>{' '}
                          {isFree ? 'Free' : `${event.currency} ${event.price}`}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 mt-8">
                        <Link href={`/events/${id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            View Event
                          </Button>
                        </Link>
                        <Link href="/events" className="flex-1">
                          <Button className="w-full bg-soul-green hover:bg-soul-green-dark text-white">
                            Browse More Events
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              )}
            </div>

            <div className="space-y-6">
              <AnimatedSection delay={0.1}>
                <Card className="soul-shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg text-soul-green-dark font-[family-name:var(--font-playfair)]">
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div
                      className={`h-24 rounded-xl bg-gradient-to-br ${event.gradient} flex items-center justify-center`}
                    >
                      <Ticket className="w-8 h-8 text-white/40" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">1 x Ticket</p>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium text-foreground">
                          {isFree ? 'Free' : `${event.currency} ${event.price}`}
                        </span>
                      </div>
                      {!isFree && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Service Fee</span>
                          <span className="font-medium text-foreground">{event.currency} 0</span>
                        </div>
                      )}
                    </div>

                    <div className="border-t pt-4 flex justify-between">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="text-xl font-bold text-soul-green-dark">
                        {isFree ? 'Free' : `${event.currency} ${event.price}`}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <Card className="soul-shadow-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Shield className="w-4 h-4 text-soul-green" />
                      <span>Secure checkout powered by SOUL</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="w-4 h-4 text-soul-green" />
                      <span>256-bit SSL encryption</span>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
