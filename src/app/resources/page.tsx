'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, FileText, ExternalLink, Download, Loader2 } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Input } from '@/components/ui/input';
import { EmptyState } from '@/components/shared/EmptyState';
import { RESOURCE_CATEGORIES } from '@/lib/constants';
import { Briefcase, GraduationCap, BookOpen, Brain, Compass, HeartHandshake } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { listResources } from '@/lib/services/resources';
import type { Resource } from '@/types';

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
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    listResources(supabase)
      .then((data) => {
        if (active) setResources(data);
      })
      .catch(() => {
        if (active) setResources([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      if (activeCategory !== 'all' && r.category !== activeCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!`${r.title} ${r.description ?? ''}`.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [resources, activeCategory, searchQuery]);

  return (
    <>
      <PageHeader
        title="Resources"
        description="Useful resources to help you grow and thrive"
      />

      <section className="py-12 px-4 bg-soul-cream min-h-[60vh]">
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

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-soul-green" />
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<FileText className="w-8 h-8" />}
              title="No resources found"
              description="Useful resources and documents will appear here."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((resource, index) => {
                const catInfo = RESOURCE_CATEGORIES.find((c) => c.value === resource.category);
                const Icon = catInfo ? categoryIconMap[catInfo.icon] || FileText : FileText;
                const href = resource.external_url || resource.file_url || '#';
                return (
                  <AnimatedSection key={resource.id} delay={0.03 * (index % 12)}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full bg-white rounded-xl soul-shadow-card p-6 hover:shadow-lg hover:-translate-y-1 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-soul-green/10 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-soul-green" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-soul-green transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {resource.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-soul-green">
                        {resource.type === 'link' ? (
                          <>
                            Visit link <ExternalLink className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            Download <Download className="w-3.5 h-3.5" />
                          </>
                        )}
                      </div>
                    </a>
                  </AnimatedSection>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
