'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  BookOpen,
  Brain,
  Compass,
  HeartHandshake,
  Search,
  ExternalLink,
  Download,
  FileText,
  Link as LinkIcon,
  File,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EmptyState } from '@/components/shared/EmptyState';
import { RESOURCE_CATEGORIES } from '@/lib/constants';

type IconComponent = React.ComponentType<{ className?: string }>;

interface Resource {
  id: string;
  category: string;
  icon: IconComponent;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  type: 'PDF' | 'Link' | 'Document';
  url: string;
}

const categoryIconMap: Record<string, IconComponent> = {
  Briefcase,
  GraduationCap,
  BookOpen,
  Brain,
  Compass,
  HandHeart: HeartHandshake,
};

const sampleResources: Resource[] = [
  {
    id: '1',
    category: 'jobs',
    icon: Briefcase,
    iconColor: 'text-soul-green',
    iconBg: 'bg-soul-green/10',
    title: 'Remote Job Listings — March 2026',
    description:
      'Curated list of 50+ remote job opportunities in tech, marketing, and customer support for this month.',
    type: 'PDF',
    url: '#',
  },
  {
    id: '2',
    category: 'jobs',
    icon: Briefcase,
    iconColor: 'text-soul-green',
    iconBg: 'bg-soul-green/10',
    title: 'CV & Resume Writing Guide',
    description:
      'Step-by-step guide to crafting a professional CV that stands out to recruiters.',
    type: 'Document',
    url: '#',
  },
  {
    id: '3',
    category: 'scholarships',
    icon: GraduationCap,
    iconColor: 'text-soul-gold',
    iconBg: 'bg-soul-gold/10',
    title: 'International Scholarships 2026 Directory',
    description:
      'Comprehensive directory of fully-funded scholarships for undergraduate and postgraduate students worldwide.',
    type: 'PDF',
    url: '#',
  },
  {
    id: '4',
    category: 'scholarships',
    icon: GraduationCap,
    iconColor: 'text-soul-gold',
    iconBg: 'bg-soul-gold/10',
    title: 'Scholarship Application Checklist',
    description:
      'A printable checklist to ensure your scholarship applications are complete and compelling.',
    type: 'Document',
    url: '#',
  },
  {
    id: '5',
    category: 'learning',
    icon: BookOpen,
    iconColor: 'text-soul-brown',
    iconBg: 'bg-soul-brown/10',
    title: 'Free Online Courses — Top Platforms',
    description:
      'List of the best free learning platforms and courses in technology, business, and personal development.',
    type: 'Link',
    url: '#',
  },
  {
    id: '6',
    category: 'learning',
    icon: BookOpen,
    iconColor: 'text-soul-brown',
    iconBg: 'bg-soul-brown/10',
    title: 'Community Recommended Reads',
    description:
      'Our top 25 book recommendations from community members covering growth, leadership, and wellness.',
    type: 'PDF',
    url: '#',
  },
  {
    id: '7',
    category: 'mental_health',
    icon: Brain,
    iconColor: 'text-soul-green-light',
    iconBg: 'bg-soul-green/10',
    title: 'Mental Health Self-Assessment Toolkit',
    description:
      'Simple self-assessment exercises and journaling prompts to monitor and improve your mental well-being.',
    type: 'PDF',
    url: '#',
  },
  {
    id: '8',
    category: 'mental_health',
    icon: Brain,
    iconColor: 'text-soul-green-light',
    iconBg: 'bg-soul-green/10',
    title: 'Guided Meditation Audio Collection',
    description:
      'Set of 10 guided meditation recordings for stress relief, sleep, and daily mindfulness practice.',
    type: 'Link',
    url: '#',
  },
  {
    id: '9',
    category: 'career',
    icon: Compass,
    iconColor: 'text-soul-brown-light',
    iconBg: 'bg-soul-brown/10',
    title: 'Career Path Planning Workbook',
    description:
      'Interactive workbook to help you map out your career goals, identify skills gaps, and create an action plan.',
    type: 'Document',
    url: '#',
  },
  {
    id: '10',
    category: 'career',
    icon: Compass,
    iconColor: 'text-soul-brown-light',
    iconBg: 'bg-soul-brown/10',
    title: 'Networking Tips & Professional Branding',
    description:
      'Essential networking strategies and personal branding advice to advance your professional growth.',
    type: 'PDF',
    url: '#',
  },
  {
    id: '11',
    category: 'volunteer',
    icon: HeartHandshake,
    iconColor: 'text-soul-green',
    iconBg: 'bg-soul-green/10',
    title: 'Volunteer Opportunities Board',
    description:
      'Active volunteer listings from local and international organizations seeking community-minded individuals.',
    type: 'Link',
    url: '#',
  },
  {
    id: '12',
    category: 'volunteer',
    icon: HeartHandshake,
    iconColor: 'text-soul-green',
    iconBg: 'bg-soul-green/10',
    title: 'Community Service Impact Report 2025',
    description:
      'Annual report highlighting SOUL community volunteer achievements and the impact made throughout 2025.',
    type: 'PDF',
    url: '#',
  },
];

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  PDF: FileText,
  Link: LinkIcon,
  Document: File,
};

const typeColors: Record<string, string> = {
  PDF: 'bg-red-50 text-red-700 border-red-200',
  Link: 'bg-blue-50 text-blue-700 border-blue-200',
  Document: 'bg-soul-green/10 text-soul-green border-soul-green/20',
};

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = useMemo(() => {
    return sampleResources.filter((resource) => {
      const matchesCategory =
        activeCategory === 'all' || resource.category === activeCategory;

      const matchesSearch =
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      <PageHeader
        title="Resources"
        description="Useful resources to help you grow and thrive"
      />

      <section className="py-12 px-4 bg-soul-cream">
        <div className="max-w-6xl mx-auto">
          {/* Search */}
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

          {/* Category Filter Pills */}
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

          {/* Resources Grid */}
          {filteredResources.length === 0 ? (
            <AnimatedSection>
              <EmptyState
                icon={<Search className="w-8 h-8" />}
                title="No resources found"
                description="Try adjusting your search or filter criteria."
              />
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => {
                const TypeIcon = typeIcons[resource.type] || File;
                return (
                  <AnimatedSection key={resource.id} delay={0.05 + index * 0.05}>
                    <motion.div
                      className="bg-white rounded-xl p-6 soul-shadow-card h-full flex flex-col"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-11 h-11 rounded-xl ${resource.iconBg} flex items-center justify-center shrink-0`}
                        >
                          <resource.icon className={`w-5.5 h-5.5 ${resource.iconColor}`} />
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs gap-1 ${typeColors[resource.type]}`}
                        >
                          <TypeIcon className="w-3 h-3" />
                          {resource.type}
                        </Badge>
                      </div>

                      <h3 className="text-base font-semibold text-soul-green-dark mb-2 leading-snug">
                        {resource.title}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                        {resource.description}
                      </p>

                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium border border-soul-green/20 text-soul-green bg-white hover:bg-soul-green/5 rounded-md transition-colors"
                      >
                          {resource.type === 'Link' ? (
                            <>
                              <ExternalLink className="w-4 h-4" />
                              Visit
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              Download
                            </>
                          )}
                      </a>
                    </motion.div>
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
