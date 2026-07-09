import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { WhatsAppCTA } from '@/components/shared/WhatsAppCTA';
import { ABOUT_CONTENT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'The Soul Vibe – SOUL',
  description:
    'More than a WhatsApp group — a family built on respect, kindness, growth, and genuine human connection. This is the SOUL vibe.',
  openGraph: {
    title: 'The Soul Vibe – SOUL',
    description:
      'More than a WhatsApp group — a family built on respect, kindness, growth, and genuine human connection.',
  },
};

export default function TheSoulVibePage() {
  const finalVibeParagraphs = ABOUT_CONTENT.finalVibe.split('\n\n').filter((p) => p.trim());

  return (
    <>
      <PageHeader
        title="The Soul Vibe"
        description="More than a WhatsApp group — a family built on respect, kindness, growth, and genuine human connection."
      />

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="bg-soul-cream rounded-2xl p-8 md:p-12 soul-shadow-card space-y-5 text-foreground/80 leading-relaxed">
              {finalVibeParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <WhatsAppCTA />
    </>
  );
}
