import { Suspense } from 'react';
import EditEventContent from './EditEventContent';

export default function EditEventPage() {
  return (
    <Suspense fallback={null}>
      <EditEventContent />
    </Suspense>
  );
}
