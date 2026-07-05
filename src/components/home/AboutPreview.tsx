'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, Users, Globe, Sparkles, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const values = [
  {
    icon: Heart,
    title: 'Mental Wellness',
    description: 'Prioritizing mental health through guided sessions, peer support, and wellness activities.',
    color: 'text-soul-green',
    bg: 'bg-soul-green/10',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building meaningful friendships and a supportive network of like-minded individuals.',
    color: 'text-soul-brown',
    bg: 'bg-soul-brown/10',
  },
  {
    icon: Globe,
    title: 'Global Impact',
    description: 'Creating ripples of positive change through service, volunteering, and outreach.',
    color: 'text-soul-gold',
    bg: 'bg-soul-gold/10',
  },
  {
    icon: Sparkles,
    title: 'Growth',
    description: 'Empowering members to discover opportunities, learn new skills, and thrive together.',
    color: 'text-soul-green-light',
    bg: 'bg-soul-green-light/10',
  },
];

export function AboutPreview() {
  return (
    <section className="py-20 px-4 bg-soul-cream">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-soul-green-dark font-[family-name:var(--font-playfair)] mb-4">
              About SOUL
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Serving Opportunities, Uplifting Lives
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="bg-white rounded-2xl p-8 md:p-12 soul-shadow-card mb-12">
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
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {values.map((value, index) => (
            <AnimatedSection key={value.title} delay={0.15 + index * 0.1}>
              <motion.div
                whileHover={{ y: -4, boxShadow: '0 10px 40px -4px rgba(45,90,61,0.12)' }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl p-6 soul-shadow-card h-full"
              >
                <div className={`w-12 h-12 rounded-xl ${value.bg} flex items-center justify-center mb-4`}>
                  <value.icon className={`w-6 h-6 ${value.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5}>
          <div className="text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-soul-green text-white rounded-full font-semibold transition-all hover:bg-soul-green-dark hover:shadow-lg hover:scale-105"
            >
              Read More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
