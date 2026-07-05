import type { Metadata } from 'next';
import {
  Users,
  Heart,
  TrendingUp,
  HeartHandshake,
  BookOpen,
  Target,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Compass,
  Globe,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { WhatsAppCTA } from '@/components/shared/WhatsAppCTA';

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

const values = [
  {
    icon: Users,
    title: 'Community',
    description:
      'Building a supportive network of like-minded individuals who uplift and empower one another through genuine friendships.',
    color: 'text-soul-green',
    bg: 'bg-soul-green/10',
  },
  {
    icon: Heart,
    title: 'Mental Wellness',
    description:
      'Prioritizing mental health through guided discussions, peer support, and regular wellness activities throughout the week.',
    color: 'text-soul-brown',
    bg: 'bg-soul-brown/10',
  },
  {
    icon: TrendingUp,
    title: 'Growth',
    description:
      'Empowering members to discover new opportunities, develop skills, and achieve personal and professional milestones.',
    color: 'text-soul-gold',
    bg: 'bg-soul-gold/10',
  },
  {
    icon: HeartHandshake,
    title: 'Service',
    description:
      'Giving back through volunteering, outreach, and acts of kindness that create meaningful impact in our communities.',
    color: 'text-soul-green-light',
    bg: 'bg-soul-green-light/10',
  },
  {
    icon: BookOpen,
    title: 'Learning',
    description:
      'Fostering continuous growth through shared knowledge, expert talks, book reviews, and collaborative learning experiences.',
    color: 'text-soul-brown-light',
    bg: 'bg-soul-brown-light/10',
  },
  {
    icon: Target,
    title: 'Purpose',
    description:
      'Helping each member discover and pursue their calling through reflection, mentorship, and meaningful conversations.',
    color: 'text-soul-green-dark',
    bg: 'bg-soul-green-dark/10',
  },
];

const communityGoals = [
  {
    icon: Compass,
    title: 'Connect',
    description: 'Foster meaningful relationships that transcend digital interactions and create lasting bonds.',
  },
  {
    icon: Globe,
    title: 'Impact',
    description: 'Create positive change in communities through collective action, volunteering, and outreach.',
  },
  {
    icon: Lightbulb,
    title: 'Inspire',
    description: 'Share stories, opportunities, and knowledge that motivate members to reach their full potential.',
  },
];

const joinBenefits = [
  'Access to weekly themed activities covering wellness, learning, and growth',
  'Networking opportunities with like-minded, supportive individuals',
  'Business promotion and entrepreneurship support',
  'Guided mental health discussions and wellness resources',
  'Outdoor experiences and adventure activities',
  'Scholarship and job opportunity alerts',
  'A welcoming, judgment-free community that genuinely cares',
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About SOUL"
        description="Serving Opportunities, Uplifting Lives since 2020"
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
                <h2 className="text-2xl md:text-3xl font-bold text-soul-green-dark font-[family-name:var(--font-playfair)] mb-4">
                  Our Mission
                </h2>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  To create a vibrant, inclusive community that empowers individuals through mental
                  wellness support, meaningful connections, shared opportunities, and purposeful
                  service — enabling every member to grow, thrive, and live with intention.
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
                <h2 className="text-2xl md:text-3xl font-bold text-soul-green-dark font-[family-name:var(--font-playfair)] mb-4">
                  Our Vision
                </h2>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  To be the leading community where young people find belonging, purpose, and
                  transformative support — building a world where no one faces life&apos;s challenges
                  alone and everyone has the opportunity to flourish.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 bg-soul-cream">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-soul-green-dark font-[family-name:var(--font-playfair)] mb-4">
                Our Core Values
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                The principles that guide everything we do as a community.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={0.1 + index * 0.08}>
                <div className="bg-white rounded-xl p-6 soul-shadow-card h-full">
                  <div
                    className={`w-12 h-12 rounded-xl ${value.bg} flex items-center justify-center mb-4`}
                  >
                    <value.icon className={`w-6 h-6 ${value.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Community Goals */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-soul-green-dark font-[family-name:var(--font-playfair)] mb-4">
                Community Goals
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                What we strive to achieve together, every day.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {communityGoals.map((goal, index) => (
              <AnimatedSection key={goal.title} delay={0.1 + index * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-soul-green/10 flex items-center justify-center mx-auto mb-5">
                    <goal.icon className="w-8 h-8 text-soul-green" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{goal.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{goal.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 px-4 bg-soul-cream">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-soul-green-dark font-[family-name:var(--font-playfair)] mb-6 text-center">
              Our Story
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-2xl p-8 md:p-12 soul-shadow-card space-y-5 text-foreground/80 leading-relaxed">
              <p>
                SOUL began as a simple idea: what if a group of friends could create a space where
                people genuinely support one another? What started as a small WhatsApp group among a
                handful of like-minded individuals quickly grew into something none of us expected.
              </p>
              <p>
                In those early days, we shared job listings, encouraged each other through tough
                weeks, and celebrated every small win together. We realized that so many people were
                searching for the same things — connection, purpose, mental wellness, and growth —
                but had nowhere to find them all in one place.
              </p>
              <p>
                From those humble beginnings, SOUL has evolved into a thriving community with weekly
                themed activities spanning Mental Health Mondays to Self Reset Sundays, regular outdoor
                experiences, business promotion opportunities, and a growing network of members who
                genuinely care about each other&apos;s well-being.
              </p>
              <p>
                Today, SOUL stands for Serving Opportunities, Uplifting Lives — and that mission
                drives every conversation, event, and connection we build. We are proof that when
                people come together with intention and compassion, extraordinary things happen.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-soul-green-dark font-[family-name:var(--font-playfair)] mb-4">
                Why Join SOUL?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Here is what you gain when you become part of our community.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-soul-cream rounded-2xl p-8 md:p-12">
              <ul className="space-y-4">
                {joinBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-soul-green shrink-0 mt-0.5" />
                    <span className="text-foreground/80 leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 text-center">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-soul-green text-white rounded-full font-semibold transition-all hover:bg-soul-green-dark hover:shadow-lg hover:scale-105"
                >
                  Become a Member
                  <ArrowRight className="w-4 h-4" />
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
