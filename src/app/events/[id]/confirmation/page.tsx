import { Suspense } from 'react';
import ConfirmationContent from './ConfirmationContent';

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }];
}

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  return (
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  );
}
