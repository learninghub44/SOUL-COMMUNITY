'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Brain,
  Lightbulb,
  BookOpen,
  TrendingUp,
  Heart,
  Mountain,
  Sun,
  ArrowLeft,
  Clock,
  Users,
  ExternalLink,
  Info,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { WhatsAppCTA } from '@/components/shared/WhatsAppCTA';
import { WEEKLY_ACTIVITIES } from '@/lib/constants';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Lightbulb,
  BookOpen,
  TrendingUp,
  Heart,
  Mountain,
  Sun,
};

const meetingDetails: Record<string, { time: string; format: string; platform: string }> = {
  monday: {
    time: '7:00 PM EAT',
    format: 'Group discussion & guided meditation',
    platform: 'WhatsApp Community',
  },
  tuesday: {
    time: '7:00 PM EAT',
    format: 'Open sharing & opportunity alerts',
    platform: 'WhatsApp Community',
  },
  wednesday: {
    time: '7:00 PM EAT',
    format: 'Expert talks & knowledge sharing',
    platform: 'WhatsApp Community',
  },
  thursday: {
    time: '7:00 PM EAT',
    format: 'Business showcases & promotions',
    platform: 'WhatsApp Community',
  },
  friday: {
    time: '7:00 PM EAT',
    format: 'Reflection circle & gratitude sharing',
    platform: 'WhatsApp Community',
  },
  saturday: {
    time: '9:00 AM EAT',
    format: 'Outdoor meetups & adventures',
    platform: 'In-person & WhatsApp',
  },
  sunday: {
    time: '8:00 PM EAT',
    format: 'Self-care tips & weekly preparation',
    platform: 'WhatsApp Community',
  },
};

const detailedDescriptions: Record<string, string[]> = {
  monday: [
    'Mental Health Monday is the cornerstone of our weekly activities. We believe that mental wellness is the foundation of a fulfilling life, and every week we create a safe space for open conversations about mental health.',
    'During these sessions, members engage in guided discussions led by experienced facilitators, practice mindfulness and meditation techniques, and share their personal journeys in a judgment-free environment.',
    'Whether you are navigating stress, anxiety, or simply want to cultivate a healthier mindset, Mental Health Monday offers the support and tools you need to thrive.',
  ],
  tuesday: [
    'Opportunity Tuesday is all about discovery and growth. Every week, we curate and share the latest opportunities in jobs, scholarships, business prospects, and career development.',
    'Members are encouraged to share opportunities they come across, creating a collaborative network where everyone benefits. From internship openings to freelance gigs, from training programs to business partnerships — if it can uplift a life, we discuss it here.',
    'This day has helped numerous members land their dream jobs, secure scholarships, and find business partners within the community.',
  ],
  wednesday: [
    'Wisdom Wednesday is our knowledge-sharing day. We believe that wisdom is most powerful when it is shared, and this day is dedicated to learning from each other and from invited experts.',
    'Activities include expert talks on various topics, book reviews and recommendations, life lesson sharing from experienced community members, and skill-building workshops.',
    'Past sessions have covered financial literacy, career navigation, relationship wisdom, spiritual growth, and practical life skills that empower our members to make informed decisions.',
  ],
  thursday: [
    'Thrive & Promote Thursday is dedicated to celebrating and supporting the entrepreneurial spirit within our community. This is your day to shine and showcase what you do.',
    'Members share their businesses, products, and services with the community. Whether you are a freelancer, a small business owner, or just starting your entrepreneurial journey, this day provides visibility and support.',
    'We also discuss business strategies, marketing tips, and growth opportunities. Many collaborations and partnerships have been formed through Thrive & Promote Thursday.',
  ],
  friday: [
    'Soul Sync Friday is a day of reflection and connection. As the week winds down, we come together to sync our spirits, share our experiences, and express gratitude for the journey.',
    'Activities include gratitude circles where members share what they are thankful for, reflective discussions on the week\'s highlights and lessons, meaningful conversations that go beyond the surface, and spiritual nourishment through shared wisdom.',
    'This day reminds us that true wealth lies in the connections we build and the gratitude we cultivate.',
  ],
  saturday: [
    'Outdoor Experience Saturday is where adventure meets community. We believe that nature has a profound ability to heal, inspire, and bring people together.',
    'Activities include guided hikes and nature walks, adventure trips and exploration, outdoor fitness sessions, nature photography walks, and camping and bonfire gatherings.',
    'These outdoor experiences are not just about physical activity — they are about reconnecting with nature, building bonds through shared adventures, and finding peace away from the noise of daily life.',
  ],
  sunday: [
    'Self Reset Sunday is your dedicated day for rest, recharge, and preparation. We understand that life can be demanding, and this day is designed to help you reset before a new week begins.',
    'Activities include self-care tips and routines, relaxation and mindfulness practices, goal setting for the coming week, and gentle encouragement and accountability.',
    'Think of Self Reset Sunday as your weekly reboot — a chance to let go of the past week\'s stress and step into the new week with clarity, energy, and purpose.',
  ],
};

const usefulLinks: Record<string, { label: string; url: string }[]> = {
  monday: [
    { label: 'Mental Health Kenya – Resources', url: '#' },
    { label: 'Mindfulness & Meditation Guide', url: '#' },
    { label: 'WHO Mental Health Resources', url: '#' },
  ],
  tuesday: [
    { label: 'LinkedIn Job Board', url: '#' },
    { label: 'Scholarship Opportunities Portal', url: '#' },
    { label: 'Business Networking Tips', url: '#' },
  ],
  wednesday: [
    { label: 'SOUL Book Club', url: '#' },
    { label: 'TED Talks Recommendations', url: '#' },
    { label: 'Free Online Courses', url: '#' },
  ],
  thursday: [
    { label: 'Business Registration Guide', url: '#' },
    { label: 'Marketing Resources', url: '#' },
    { label: 'Entrepreneurship Toolkit', url: '#' },
  ],
  friday: [
    { label: 'Gratitude Journaling Guide', url: '#' },
    { label: 'Spiritual Growth Resources', url: '#' },
    { label: 'Community Reflection Archive', url: '#' },
  ],
  saturday: [
    { label: 'Hiking Trails Near Nairobi', url: '#' },
    { label: 'Outdoor Safety Tips', url: '#' },
    { label: 'Nature Photography Basics', url: '#' },
  ],
  sunday: [
    { label: 'Self-Care Routine Builder', url: '#' },
    { label: 'Weekly Planning Templates', url: '#' },
    { label: 'Relaxation Techniques Guide', url: '#' },
  ],
};

export default function DayActivityPage() {
  const params = useParams();
  const day = params.day as string;

  const activity = WEEKLY_ACTIVITIES.find((a) => a.day === day);

  if (!activity) {
    return (
      <>
        <PageHeader
          title="Activity Not Found"
          description="The activity you are looking for does not exist."
        />
        <section className="py-20 px-4 bg-soul-cream">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <Info className="w-16 h-16 text-soul-brown mx-auto mb-6" />
              <p className="text-lg text-muted-foreground mb-8">
                We could not find an activity for the day &quot;{day}&quot;. Please check the URL
                and try again.
              </p>
              <Link
                href="/weekly-activities"
                className="inline-flex items-center gap-2 px-6 py-3 bg-soul-green text-white rounded-full font-semibold hover:bg-soul-green-dark transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Weekly Activities
              </Link>
            </AnimatedSection>
          </div>
        </section>
        <WhatsAppCTA />
      </>
    );
  }

  const Icon = iconMap[activity.icon];
  const meeting = meetingDetails[day];
  const descriptions = detailedDescriptions[day];
  const links = usefulLinks[day];

  return (
    <>
      <PageHeader
        title={activity.title}
        description={activity.description}
        className="!py-20 lg:!py-28"
      >
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="text-4xl">{activity.emoji}</span>
          {Icon && (
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center bg-white/20"
            >
              <Icon className="w-7 h-7 text-white" />
            </div>
          )}
        </div>
      </PageHeader>

      {/* Detailed Description */}
      <section className="py-20 px-4 bg-soul-cream">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-soul-green-dark font-[family-name:var(--font-playfair)] mb-8">
              About {activity.title}
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-2xl p-8 md:p-10 soul-shadow-card">
              <div className="space-y-5">
                {descriptions.map((paragraph, i) => (
                  <p key={i} className="text-foreground/80 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Meeting Information */}
      {meeting && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-2xl md:text-3xl font-bold text-soul-green-dark font-[family-name:var(--font-playfair)] mb-8">
                Meeting Details
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div
                className="rounded-2xl p-8 md:p-10"
                style={{ backgroundColor: `${activity.color}10` }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${activity.color}20` }}
                    >
                      <span style={{ color: activity.color }}>
                        <Clock className="w-6 h-6" />
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Time</h3>
                      <p className="text-sm text-muted-foreground">{meeting.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${activity.color}20` }}
                    >
                      <span style={{ color: activity.color }}>
                        <Users className="w-6 h-6" />
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Format</h3>
                      <p className="text-sm text-muted-foreground">{meeting.format}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${activity.color}20` }}
                    >
                      <span style={{ color: activity.color }}>
                        <ExternalLink className="w-6 h-6" />
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Platform</h3>
                      <p className="text-sm text-muted-foreground">{meeting.platform}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Useful Links */}
      {links && links.length > 0 && (
        <section className="py-20 px-4 bg-soul-cream">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-2xl md:text-3xl font-bold text-soul-green-dark font-[family-name:var(--font-playfair)] mb-8">
                Useful Links
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-2xl p-8 md:p-10 soul-shadow-card">
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-foreground/80 hover:text-soul-green transition-colors group"
                      >
                        <div
                          className="w-2 h-2 rounded-full shrink-0 group-hover:scale-150 transition-transform"
                          style={{ backgroundColor: activity.color }}
                        />
                        {link.label}
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Back Link */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <Link
              href="/weekly-activities"
              className="inline-flex items-center gap-2 px-6 py-3 bg-soul-cream-dark text-foreground rounded-full font-medium hover:bg-soul-cream transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Weekly Activities
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <WhatsAppCTA />
    </>
  );
}
