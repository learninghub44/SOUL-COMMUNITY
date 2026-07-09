import type { Metadata } from 'next';
import {
  Users,
  Heart,
  TrendingUp,
  HeartHandshake,
  BookOpen,
  Target,
  Compass,
  Globe,
  Smile,
  ShieldCheck,
  Zap,
  FileText,
  Download,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { WhatsAppCTA } from '@/components/shared/WhatsAppCTA';
import { ABOUT_CONTENT, CONSTITUTION_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About SOUL – Serving Opportunities, Uplifting Lives',
  description:
    'Learn about SOUL, a vibrant community dedicated to mental wellness, networking, opportunities, business promotion, outdoor experiences, learning, and meaningful friendships.',
  openGraph: {
    title: 'About SOUL – Serving Opportunities, Uplifting Lives',
    description:
      'Discover our mission, vision, and values. Learn how SOUL is transforming lives through community, wellness, and purpose.',
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Heart,
  TrendingUp,
  HandHeart: HeartHandshake,
  BookOpen,
  Target,
  Smile,
  ShieldCheck,
  Zap,
};

const colorMap: Record<string, { color: string; bg: string }> = {
  Community: { color: 'text-soul-green', bg: 'bg-soul-green/10' },
  'Mental Wellness': { color: 'text-soul-brown', bg: 'bg-soul-brown/10' },
  Growth: { color: 'text-soul-gold', bg: 'bg-soul-gold/10' },
  Service: { color: 'text-soul-green-light', bg: 'bg-soul-green-light/10' },
  Learning: { color: 'text-soul-brown-light', bg: 'bg-soul-brown-light/10' },
  Purpose: { color: 'text-soul-green-dark', bg: 'bg-soul-green-dark/10' },
  Compassion: { color: 'text-soul-brown-light', bg: 'bg-soul-brown-light/10' },
  Integrity: { color: 'text-soul-green', bg: 'bg-soul-green/10' },
  Empowerment: { color: 'text-soul-gold', bg: 'bg-soul-gold/10' },
};

export default function AboutPage() {
  const descriptionParagraphs = ABOUT_CONTENT.description
    .split('\n\n')
    .filter((p) => p.trim());

  return (
    <>
      <PageHeader
        title="About SOUL"
        description="A safe, inclusive space for mental health awareness, meaningful connections, and personal growth."
      />

      {/* Mission */}
      <section className="py-20 px-4 bg-soul-cream">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-soul-green/10 flex items-center justify-center shrink-0">
                <Compass className="w-7 h-7 text-soul-green" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-soul-green-dark font-heading mb-4">
                  Our Mission
                </h2>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  {ABOUT_CONTENT.mission}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-soul-gold/10 flex items-center justify-center shrink-0">
                <Globe className="w-7 h-7 text-soul-gold" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-soul-green-dark font-heading mb-4">
                  Our Vision
                </h2>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  {ABOUT_CONTENT.vision}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Community Objectives */}
      <section className="py-20 px-4 bg-soul-cream">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-soul-green-dark font-heading mb-10 text-center">
              Our Community Objectives
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-6">
            {ABOUT_CONTENT.missionPillars.map((pillar, index) => (
              <AnimatedSection key={pillar.title} delay={0.1 + index * 0.08}>
                <div className="bg-white rounded-2xl p-6 md:p-8 soul-shadow-card">
                  <h3 className="text-lg font-semibold text-soul-green-dark mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">{pillar.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-soul-green-dark font-heading mb-6 text-center">
              About SOUL
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-soul-cream rounded-2xl p-8 md:p-12 soul-shadow-card space-y-5 text-foreground/80 leading-relaxed">
              {descriptionParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 bg-soul-cream">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-soul-green-dark font-heading mb-4">
                Our Core Values
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                The principles that guide everything we do as a community.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ABOUT_CONTENT.values.map((value, index) => {
              const Icon = iconMap[value.icon];
              const colors = colorMap[value.title] || {
                color: 'text-soul-green',
                bg: 'bg-soul-green/10',
              };
              return (
                <AnimatedSection key={value.title} delay={0.1 + index * 0.08}>
                  <div className="bg-white rounded-xl p-6 soul-shadow-card h-full">
                    <div
                      className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}
                    >
                      {Icon && <Icon className={`w-6 h-6 ${colors.color}`} />}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Constitution */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="bg-soul-cream rounded-2xl p-8 md:p-12 soul-shadow-card flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl bg-soul-green/10 flex items-center justify-center shrink-0">
                <FileText className="w-8 h-8 text-soul-green" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-soul-green-dark font-heading mb-2">
                  Our Constitution
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-5">
                  The governing document behind S.O.U.L — our structure, principles, and
                  commitments to the community, laid out in full.
                </p>
                <a
                  href={CONSTITUTION_URL}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-soul-green text-white text-sm font-medium hover:bg-soul-green-light transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <WhatsAppCTA />
    </>
  );
}
