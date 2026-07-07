import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { Section } from '@/components/marketing/Section';
import { Card } from '@/components/marketing/Card';

const stats = [
  { value: 500, suffix: '+', label: 'Youth engaged in the community' },
  { value: null, display: '24/7', label: 'Crisis Intervention' },
  { value: 50, suffix: '+', label: 'Counselling sessions' },
  { value: 100, suffix: '+', label: 'Peer support group meetings' },
  { value: 100, suffix: '+', label: 'Volunteers' },
] as const;

export function ImpactStats() {
  return (
    <Section background="primary">
      <AnimatedSection>
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-section-heading font-heading font-bold text-white mb-4">
            Our Impact
          </h2>
          <p className="text-lg text-white/80">
            Explore the inspiring journeys of young individuals who have changed their lives with
            the help of our programs and initiatives.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <AnimatedSection key={stat.label} delay={0.1 + index * 0.1}>
            <Card
              hoverable={false}
              className="h-full border-white/15 bg-white/5 text-center backdrop-blur-sm"
            >
              <div className="font-heading text-4xl font-bold text-soul-gold-light sm:text-5xl">
                {stat.value === null ? (
                  stat.display
                ) : (
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                )}
              </div>
              <p className="mt-3 text-sm text-white/75 leading-snug">{stat.label}</p>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );
}
