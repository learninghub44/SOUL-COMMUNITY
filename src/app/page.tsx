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

export default function HomePage() {
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
