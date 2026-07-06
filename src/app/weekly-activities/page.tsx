import type { Metadata } from 'next';
import WeeklyActivitiesContent from './WeeklyActivitiesContent';

export const metadata: Metadata = {
  title: 'Weekly Activities – SOUL Community',
  description:
    "Explore SOUL's weekly themed activities — from Mental Health Mondays to Self Reset Sundays. Something meaningful every day of the week.",
  openGraph: {
    title: 'Weekly Activities – SOUL Community',
    description:
      'Discover our daily themed activities focused on mental wellness, learning, growth, and community connection.',
  },
};

export default function WeeklyActivitiesPage() {
  return <WeeklyActivitiesContent />;
}
