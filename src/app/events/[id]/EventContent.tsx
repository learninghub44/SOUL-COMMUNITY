'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Button } from '@/components/ui/button';
import { WhatsAppCTA } from '@/components/shared/WhatsAppCTA';

export default function EventContent() {
  const params = useParams();
  const id = params.id as string;

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
