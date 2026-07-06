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

export default function DayContent() {
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
  const paragraphs = activity.detailedDescription
    .split('\n\n')
    .filter((p) => p.trim());

  return (
    <>
      <PageHeader
        title={activity.title}
        description={activity.description}
        className="!py-20 lg:!py-28"
      >
        <div className="mt-6 flex items-center justify-center gap-3">
          {Icon && (
            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-white/20">
              <Icon className="w-7 h-7 text-white" />
            </div>
          )}
        </div>
      </PageHeader>

      {/* Detailed Description */}
      <section className="py-20 px-4 bg-soul-cream">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-soul-green-dark font-heading mb-8">
              About {activity.title}
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-2xl p-8 md:p-10 soul-shadow-card">
              <div className="space-y-5">
                {paragraphs.map((paragraph, i) => {
                  const isBullet = paragraph.startsWith('- ');
                  if (isBullet) {
                    const items = paragraph.split('\n').filter((l) => l.trim());
                    return (
                      <ul key={i} className="space-y-2 pl-4">
                        {items.map((item, j) => (
                          <li key={j} className="text-foreground/80 leading-relaxed flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-soul-green shrink-0 mt-2" />
                            {item.replace(/^- /, '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={i} className="text-foreground/80 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Meeting Information */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-soul-green-dark font-heading mb-8">
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
                    <p className="text-sm text-muted-foreground">{activity.meeting.time}</p>
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
                    <p className="text-sm text-muted-foreground">{activity.meeting.format}</p>
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
                    <p className="text-sm text-muted-foreground">{activity.meeting.platform}</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Back Link */}
      <section className="py-12 px-4 bg-soul-cream">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <Link
              href="/weekly-activities"
              className="inline-flex items-center gap-2 px-6 py-3 bg-soul-green text-white rounded-full font-medium hover:bg-soul-green-dark transition-colors"
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
