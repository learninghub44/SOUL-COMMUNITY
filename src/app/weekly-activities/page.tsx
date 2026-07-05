import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Brain,
  Lightbulb,
  BookOpen,
  TrendingUp,
  Heart,
  Mountain,
  Sun,
  ArrowRight,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { WEEKLY_ACTIVITIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Weekly Activities – SOUL Community',
  description:
    'Explore SOUL\'s weekly themed activities — from Mental Health Mondays to Self Reset Sundays. Something meaningful every day of the week.',
  openGraph: {
    title: 'Weekly Activities – SOUL Community',
    description:
      'Discover our daily themed activities focused on mental wellness, learning, growth, and community connection.',
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Lightbulb,
  BookOpen,
  TrendingUp,
  Heart,
  Mountain,
  Sun,
};

export default function WeeklyActivitiesPage() {
  return (
    <>
      <PageHeader
        title="Weekly Activities"
        description="Every day at SOUL has a purpose. From mental wellness to outdoor adventures, we have something meaningful planned for each day of the week."
      />

      <section className="py-20 px-4 bg-soul-cream">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-soul-green-dark font-[family-name:var(--font-playfair)] mb-4">
                Your Week with SOUL
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Each day is designed to nurture a different aspect of your life.
                Pick a day, join in, and grow with us.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {WEEKLY_ACTIVITIES.map((activity, index) => {
              const Icon = iconMap[activity.icon];
              return (
                <AnimatedSection key={activity.day} delay={0.05 + index * 0.07}>
                  <Link href={`/weekly-activities/${activity.day}`} className="block h-full">
                    <div className="bg-white rounded-xl overflow-hidden soul-shadow-card h-full flex flex-col transition-all hover:shadow-lg hover:-translate-y-1 group">
                      <div
                        className="h-2 w-full"
                        style={{ backgroundColor: activity.color }}
                      />
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          {Icon && (
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${activity.color}15` }}
                            >
                              <span style={{ color: activity.color }}>
                                <Icon className="w-5 h-5" />
                              </span>
                            </div>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-soul-green transition-colors">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground/80 mt-3">
                          {activity.meetingInfo}
                        </p>
                        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-soul-green group-hover:gap-2 transition-all">
                          Learn more
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
