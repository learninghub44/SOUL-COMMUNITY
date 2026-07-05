'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { WEEKLY_ACTIVITIES } from '@/lib/constants';

export function WeeklyActivitiesPreview() {
  return (
    <section className="py-20 px-4 bg-soul-cream-dark">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-soul-green-dark font-[family-name:var(--font-playfair)] mb-4">
              Weekly Activities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every day brings a new opportunity to grow, connect, and thrive together
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 mb-12">
          {WEEKLY_ACTIVITIES.map((activity, index) => (
            <AnimatedSection key={activity.day} delay={0.1 + index * 0.07}>
              <motion.div
                whileHover={{ scale: 1.04, boxShadow: '0 12px 36px -4px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl p-5 soul-shadow-card h-full relative overflow-hidden group cursor-pointer"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
                  style={{ backgroundColor: activity.color }}
                />
                <h3 className="text-sm font-bold text-foreground mb-1.5 leading-tight mt-2">
                  {activity.shortTitle}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {activity.description.split('.')[0]}.
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.6}>
          <div className="text-center">
            <Link
              href="/weekly-activities"
              className="inline-flex items-center gap-2 px-8 py-4 bg-soul-green text-white rounded-full font-semibold transition-all hover:bg-soul-green-dark hover:shadow-lg hover:scale-105"
            >
              View All Activities
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
