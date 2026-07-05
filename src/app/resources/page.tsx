'use client';

import { useState } from 'react';
import { Search, FileText } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Input } from '@/components/ui/input';
import { EmptyState } from '@/components/shared/EmptyState';
import { RESOURCE_CATEGORIES } from '@/lib/constants';
import { Briefcase, GraduationCap, BookOpen, Brain, Compass, HeartHandshake } from 'lucide-react';

const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Briefcase,
  GraduationCap,
  BookOpen,
  Brain,
  Compass,
  HandHeart: HeartHandshake,
};

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <PageHeader
        title="Resources"
        description="Useful resources to help you grow and thrive"
      />

      <section className="py-12 px-4 bg-soul-cream">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-white"
                />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === 'all'
                    ? 'bg-soul-green text-white shadow-md'
                    : 'bg-white text-muted-foreground hover:text-foreground hover:bg-soul-cream-dark'
                }`}
              >
                All
              </button>
              {RESOURCE_CATEGORIES.map((cat) => {
                const Icon = categoryIconMap[cat.icon] || Briefcase;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat.value
                        ? 'bg-soul-green text-white shadow-md'
                        : 'bg-white text-muted-foreground hover:text-foreground hover:bg-soul-cream-dark'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </AnimatedSection>

          <EmptyState
            icon={<FileText className="w-8 h-8" />}
            title="No resources yet"
            description="Useful resources and documents will appear here."
          />
        </div>
      </section>
    </>
  );
}
