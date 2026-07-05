'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';

export default function CheckoutContent() {
  const params = useParams();
  const id = params.id as string;

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
