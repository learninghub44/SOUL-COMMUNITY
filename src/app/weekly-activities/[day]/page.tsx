import DayContent from './DayContent';

export function generateStaticParams() {
  return [
    { day: 'monday' },
    { day: 'tuesday' },
    { day: 'wednesday' },
    { day: 'thursday' },
    { day: 'friday' },
    { day: 'saturday' },
    { day: 'sunday' },
  ];
}

export default function DayActivityPage({ params }: { params: { day: string } }) {
  return <DayContent />;
}
