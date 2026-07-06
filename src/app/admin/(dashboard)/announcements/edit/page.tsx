import { Suspense } from 'react';
import EditAnnouncementContent from './EditAnnouncementContent';

export default function EditAnnouncementPage() {
  return (
    <Suspense fallback={null}>
      <EditAnnouncementContent />
    </Suspense>
  );
}
