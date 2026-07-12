import { Hero } from '@/components/home/Hero';
import { AboutPreview } from '@/components/home/AboutPreview';
import { WeeklyActivitiesPreview } from '@/components/home/WeeklyActivitiesPreview';
import { EventsPreview } from '@/components/home/EventsPreview';
import { GalleryPreview } from '@/components/home/GalleryPreview';
import { AnnouncementsPreview } from '@/components/home/AnnouncementsPreview';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { ImpactStats } from '@/components/home/ImpactStats';
import { ContactSection } from '@/components/home/ContactSection';
import { WhatsAppCTA } from '@/components/shared/WhatsAppCTA';
import { MaintenanceMode } from '@/components/home/MaintenanceMode';
import { MAINTENANCE_MODE } from '@/lib/constants';

export default function HomePage() {
  if (MAINTENANCE_MODE) {
    return <MaintenanceMode />;
  }

  return (
    <>
      <Hero />
      <AboutPreview />
      <WeeklyActivitiesPreview />
      <EventsPreview />
      <GalleryPreview />
      <AnnouncementsPreview />
      <TestimonialsSection />
      <ImpactStats />
      <ContactSection />
      <WhatsAppCTA />
    </>
  );
}
