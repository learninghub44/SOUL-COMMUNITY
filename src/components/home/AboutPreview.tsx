'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Section } from '@/components/marketing/Section';
import { Card } from '@/components/marketing/Card';
import { buttonVariants } from '@/components/marketing/Button';
import { cn } from '@/lib/utils';

const values = [
  {
    letter: 'M',
    title: 'Mental Wellness',
    description: 'Prioritizing mental health through guided sessions, peer support, and wellness activities.',
  },
  {
    letter: 'C',
    title: 'Community',
    description: 'Building meaningful friendships and a supportive network of like-minded individuals.',
  },
  {
    letter: 'G',
    title: 'Global Impact',
    description: 'Creating ripples of positive change through service, volunteering, and outreach.',
  },
  {
    letter: 'G',
    title: 'Growth',
    description: 'Empowering members to discover opportunities, learn new skills, and thrive together.',
  },
];

export function AboutPreview() {
  return (
    <Section background="muted">
      <AnimatedSection>
        <div className="text-center mb-16">
          <h2 className="text-section-heading font-heading font-bold text-soul-green-dark mb-4">
            About SOUL
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Serving Opportunities, Uplifting Lives
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <Card hoverable={false} className="mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6">
              SOUL is a vibrant community dedicated to mental wellness, networking, opportunities,
              business promotion, outdoor experiences, learning, volunteering, and meaningful friendships.
              We believe in the power of togetherness to transform lives and build a more compassionate world.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Our weekly activities, events, and shared resources create a space where every member
              can grow, connect, and find purpose. Whether you&apos;re seeking support, opportunities,
              or simply a community that cares — SOUL is here for you.
            </p>
          </div>
        </Card>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {values.map((value, index) => (
          <AnimatedSection key={value.title} delay={0.15 + index * 0.1}>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="h-full">
              <Card className="h-full">
                <div className="w-12 h-12 rounded-xl bg-soul-green/10 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-soul-green font-heading">
                    {value.letter}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </Card>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.5}>
        <div className="text-center">
          <Link
            href="/about"
            className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'rounded-full')}
          >
            Read More
          </Link>
        </div>
      </AnimatedSection>
    </Section>
  );
}
