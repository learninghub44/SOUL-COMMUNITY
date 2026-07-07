import { Heart, Clock, MessageCircle, Mail } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Section } from '@/components/marketing/Section';
import { Card } from '@/components/marketing/Card';
import { buttonVariants } from '@/components/marketing/Button';
import { cn } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata = {
  title: 'Donate | S.O.U.L',
  description:
    'Support the S.O.U.L community. Online donations are coming soon — reach out to us directly in the meantime.',
};

export default function DonatePage() {
  return (
    <>
      <PageHeader
        title="Donate"
        description="Your support helps us keep serving opportunities and uplifting lives across the community."
      />

      <Section background="default">
        <AnimatedSection className="max-w-2xl mx-auto text-center">
          <Card className="p-10 sm:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-soul-green/10">
              <Heart className="h-8 w-8 text-soul-green" />
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Thank you for your interest in donating
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6">
              We&apos;re truly grateful that you&apos;d like to support S.O.U.L. Online donations
              aren&apos;t open yet, but this feature is coming soon.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full bg-soul-gold/10 px-4 py-2 text-sm font-medium text-soul-gold mb-8">
              <Clock className="h-4 w-4" />
              Feature coming soon
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              In the meantime, you can reach the S.O.U.L team directly and we&apos;ll be happy to
              guide you on how to contribute.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="/contact" className={cn(buttonVariants({ size: 'lg' }))}>
                <Mail className="h-4 w-4" />
                Contact Us
              </a>
              <a
                href={SITE_CONFIG.whatsappCommunityLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}
              >
                <MessageCircle className="h-4 w-4" />
                Message on WhatsApp
              </a>
            </div>
          </Card>
        </AnimatedSection>
      </Section>
    </>
  );
}
