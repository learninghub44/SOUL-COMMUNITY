import type { Metadata } from 'next';
import Link from 'next/link';
import { Brain, Lightbulb, BookOpen, TrendingUp, Heart, Mountain, Sun, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { WhatsAppCTA } from '@/components/shared/WhatsAppCTA';
import { PROGRAMS, WEEKLY_ACTIVITIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Programmes – SOUL',
  description:
    'How S.O.U.L puts its mission into action — our core programs and the weekly activities that bring our community together every day.',
  openGraph: {
    title: 'Our Programmes – SOUL',
    description: 'How S.O.U.L puts its mission into action, every day.',
  },
};

const weekdayIconMap: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  Brain,
  Lightbulb,
  BookOpen,
  TrendingUp,
  Heart,
  Mountain,
  Sun,
};

export default function ProgrammesPage() {
  return (
    <>
      <PageHeader
        title="Our Programmes"
        description="How we put our mission into action, every day."
      />

      {/* Programs */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((program, index) => (
              <AnimatedSection key={program.title} delay={0.1 + index * 0.08}>
                <div className="bg-soul-cream rounded-2xl soul-shadow-card h-full flex flex-col p-6">
                  <h2 className="text-lg font-semibold text-soul-green-dark mb-3">
                    {program.title}
                  </h2>
                  <p className="text-sm text-foreground/80 leading-relaxed grow whitespace-pre-line">
                    {program.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Activities */}
      <section className="py-20 px-4 bg-soul-cream">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-soul-green-dark font-heading mb-4">
                Weekly Activities
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Something meaningful every day of the week.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 mb-10">
            {WEEKLY_ACTIVITIES.map((activity, index) => {
              const Icon = weekdayIconMap[activity.icon];
              return (
                <AnimatedSection key={activity.day} delay={0.05 + index * 0.05}>
                  <Link
                    href={`/weekly-activities/${activity.day}`}
                    className="bg-white rounded-xl p-4 soul-shadow-card h-full flex flex-col items-center text-center gap-2 hover:-translate-y-0.5 transition-transform"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${activity.color}1A` }}
                    >
                      {Icon && <Icon className="w-5 h-5" style={{ color: activity.color }} />}
                    </div>
                    <h3 className="text-xs font-semibold text-soul-green-dark capitalize">
                      {activity.day}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-snug">
                      {activity.shortTitle}
                    </p>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection delay={0.3}>
            <div className="text-center">
              <Link
                href="/weekly-activities"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-soul-green text-white text-sm font-medium hover:bg-soul-green-light transition-colors"
              >
                View Full Schedule
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <WhatsAppCTA />
    </>
  );
}
