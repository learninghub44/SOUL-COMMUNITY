import { Suspense } from 'react';
import EventContent from './EventContent';

export default function EventDetailPage() {
  return (
    <Suspense>
      <EventContent />
    </Suspense>
  );
}
