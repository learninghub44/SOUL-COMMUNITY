import { Clock, MapPin, Phone, Mail } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { SocialLinks } from '@/components/shared/SocialLinks';
import { Section } from '@/components/marketing/Section';
import { Card } from '@/components/marketing/Card';
import { SITE_CONFIG } from '@/lib/constants';

const infoItems = [
  {
    icon: Clock,
    label: '24/7',
    detail: 'Crisis Support available',
  },
  {
    icon: MapPin,
    label: 'Online Community',
    detail: 'Reachable from anywhere in Kenya',
  },
  {
    icon: Phone,
    label: 'Crisis Support Hotline',
    detail: SITE_CONFIG.crisisHotline,
    href: `tel:${SITE_CONFIG.crisisHotline.replace(/\s/g, '')}`,
  },
  {
    icon: Phone,
    label: 'Therapist',
    detail: SITE_CONFIG.therapistContact,
    href: `tel:${SITE_CONFIG.therapistContact.replace(/\s/g, '')}`,
  },
  {
    icon: Mail,
    label: 'Email',
    detail: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
];

export function ContactSection() {
  return (
    <Section background="muted">
      <AnimatedSection>
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-section-heading font-heading font-bold text-soul-green-dark mb-4">
            Crisis Support Hotline
          </h2>
          <p className="text-lg text-muted-foreground">
            Reach out any time — support is always within reach.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <Card hoverable={false} className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {infoItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <div className="w-12 h-12 rounded-xl bg-soul-green/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-soul-green" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </>
              );

              return item.href ? (
                <a key={item.label} href={item.href} className="flex items-center gap-4 group">
                  {content}
                </a>
              ) : (
                <div key={item.label} className="flex items-center gap-4">
                  {content}
                </div>
              );
            })}
          </div>

          <div className="mt-10 border-t border-border pt-8 flex flex-col items-center gap-4">
            <p className="text-sm font-semibold text-foreground">Follow SOUL Community</p>
            <SocialLinks className="flex items-center gap-3" />
          </div>
        </Card>
      </AnimatedSection>
    </Section>
  );
}
