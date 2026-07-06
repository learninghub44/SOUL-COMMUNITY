'use client';

import { useEffect, useState } from 'react';
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
import { createClient } from '@/lib/supabase/client';
import { listWeeklyActivities } from '@/lib/services/weekly-activities';
import type { WeeklyActivity } from '@/types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Lightbulb,
  BookOpen,
  TrendingUp,
  Heart,
  Mountain,
  Sun,
};

export default function WeeklyActivitiesContent() {
  const [dbActivities, setDbActivities] = useState<Record<string, WeeklyActivity>>({});
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    listWeeklyActivities(supabase)
      .then((data) => {
        if (!active) return;
        const byDay: Record<string, WeeklyActivity> = {};
        data.forEach((a) => {
          byDay[a.day] = a;
        });
        setDbActivities(byDay);
      })
      .catch((err) => {
        // Falls back to static content so the page still renders, but the
        // failure is no longer hidden — admin edits won't appear on this
        // page until whatever this logs is fixed (RLS, env vars, network).
        console.error('Failed to load weekly activities from Supabase, falling back to static content:', err);
        if (active) setLoadError(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const activities = WEEKLY_ACTIVITIES.map((activity) => {
    const override = dbActivities[activity.day];
    return {
      ...activity,
      title: override?.title || activity.title,
      description: override?.description || activity.description,
      meetingInfo: override?.meeting_info || activity.meetingInfo,
    };
  });

  return (
    <>
      <PageHeader
        title="Weekly Activities"
        description="Every day at SOUL has a purpose. From mental wellness to outdoor adventures, we have something meaningful planned for each day of the week."
      />

      <section className="py-20 px-4 bg-soul-cream">
        <div className="max-w-6xl mx-auto">
          {loadError && (
            <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Showing default schedule — we couldn&apos;t load the latest updates from the admin dashboard right now.
            </div>
          )}
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-soul-green-dark font-heading mb-4">
                Your Week with SOUL
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Each day is designed to nurture a different aspect of your life.
                Pick a day, join in, and grow with us.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activities.map((activity, index) => {
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
