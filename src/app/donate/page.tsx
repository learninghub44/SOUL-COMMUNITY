import { Heart, Smartphone, Globe, MessageCircle, Repeat, CalendarClock, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { WhatsAppJoinGate } from '@/components/shared/WhatsAppJoinGate';
import { Section } from '@/components/marketing/Section';
import { Card } from '@/components/marketing/Card';
import { buttonVariants } from '@/components/marketing/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CopyTillNumber } from '@/components/donate/CopyTillNumber';
import { cn } from '@/lib/utils';
import { DONATION_CONFIG } from '@/lib/constants';

export const metadata = {
  title: 'Donate | S.O.U.L',
  description:
    'Support the S.O.U.L community with a one-time, monthly, or yearly donation via M-Pesa or PayPal.',
};

const frequencies = [
  {
    value: 'one-time',
    label: 'One-Time',
    icon: Sparkles,
    blurb: 'A single contribution, any amount welcome.',
  },
  {
    value: 'monthly',
    label: 'Monthly',
    icon: Repeat,
    blurb: 'Sustains ongoing programs, hosting, and outreach.',
  },
  {
    value: 'yearly',
    label: 'Yearly',
    icon: CalendarClock,
    blurb: 'Best value — helps us plan long-term impact.',
  },
];

export default function DonatePage() {
  return (
    <>
      <PageHeader
        title="Donate"
        description="Your support helps us keep serving opportunities and uplifting lives across the community."
      />

      <Section background="default">
        <AnimatedSection className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-soul-green/10">
              <Heart className="h-8 w-8 text-soul-green" />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Every gift moves us forward
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
              S.O.U.L runs on the generosity of people who believe in this community. Whether
              it&apos;s a one-time gift or ongoing support, your contribution directly funds our
              mental health sessions, opportunities, and outdoor experiences.
            </p>
          </div>

          <Tabs defaultValue="one-time" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {frequencies.map(({ value, label, icon: Icon }) => (
                <TabsTrigger key={value} value={value} className="gap-2">
                  <Icon className="h-4 w-4" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            {frequencies.map(({ value, blurb }) => (
              <TabsContent key={value} value={value}>
                <p className="text-center text-sm text-muted-foreground mb-8">{blurb}</p>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* M-Pesa */}
                  <Card className="p-6 sm:p-8 flex flex-col">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-soul-green/10">
                        <Smartphone className="h-5 w-5 text-soul-green" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          M-Pesa
                        </h3>
                        <p className="text-xs text-muted-foreground">For donors in Kenya</p>
                      </div>
                    </div>

                    <ol className="mb-5 space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                      <li>Go to M-Pesa on your phone</li>
                      <li>Select <span className="text-foreground font-medium">Lipa na M-Pesa</span></li>
                      <li>Select <span className="text-foreground font-medium">{DONATION_CONFIG.mpesa.method}</span></li>
                      <li>Enter the Till Number below</li>
                      <li>Enter your amount and M-Pesa PIN to confirm</li>
                    </ol>

                    <div className="mt-auto">
                      <CopyTillNumber till={DONATION_CONFIG.mpesa.till} />
                    </div>
                  </Card>

                  {/* PayPal */}
                  <Card className="p-6 sm:p-8 flex flex-col">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-soul-gold/10">
                        <Globe className="h-5 w-5 text-soul-gold" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          PayPal
                        </h3>
                        <p className="text-xs text-muted-foreground">For donors outside Kenya</p>
                      </div>
                    </div>

                    <p className="mb-5 text-sm text-muted-foreground">
                      Give securely through PayPal using a card or PayPal balance.
                      {value !== 'one-time' && (
                        <>
                          {' '}
                          On the PayPal page, toggle{' '}
                          <span className="text-foreground font-medium">&quot;Make this monthly&quot;</span>{' '}
                          to set up recurring support.
                        </>
                      )}
                    </p>

                    <a
                      href={DONATION_CONFIG.paypalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ variant: 'gold', size: 'lg' }), 'mt-auto w-full')}
                    >
                      <Globe className="h-4 w-4" />
                      Donate via PayPal
                    </a>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <Card className="mt-10 p-8 sm:p-10 text-center" hoverable={false}>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
              Thank you for believing in S.O.U.L
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-6">
              Every shilling and every dollar goes toward keeping this community free, safe, and
              growing — from our weekly mental health sessions to the opportunities we share.
              We see you, we appreciate you, and we&apos;re grateful you&apos;re part of this
              journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="/contact" className={cn(buttonVariants({ variant: 'secondary', size: 'md' }))}>
                Contact Us
              </a>
              <WhatsAppJoinGate className={cn(buttonVariants({ variant: 'ghost', size: 'md' }))}>
                <MessageCircle className="h-4 w-4" />
                Message on WhatsApp
              </WhatsAppJoinGate>
            </div>
          </Card>
        </AnimatedSection>
      </Section>
    </>
  );
}
