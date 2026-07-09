'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MessageSquareText, ArrowRight, Loader2 } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { WhatsAppCTA } from '@/components/shared/WhatsAppCTA';
import { EmptyState } from '@/components/shared/EmptyState';
import { createClient } from '@/lib/supabase/client';
import { listTeamMembers } from '@/lib/services/team';
import type { TeamMember } from '@/types';

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-soul-cream rounded-2xl overflow-hidden soul-shadow-card h-full flex flex-col">
      <div className="relative w-full aspect-[4/5]">
        <Image
          src={member.image_url}
          alt={member.name}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 flex flex-col grow">
        <h3 className="text-lg font-semibold text-soul-green-dark">{member.name}</h3>
        <p className="text-sm font-medium text-soul-gold mb-3">{member.role}</p>
        <p className="text-sm text-foreground/80 leading-relaxed grow">{member.bio}</p>
        {(member.phone || member.email) && (
          <div className="mt-4 pt-4 border-t border-soul-brown/10 space-y-2">
            {member.phone && (
              <a
                href={`tel:${member.phone}`}
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-soul-green transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" />
                {member.phone}
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-soul-green transition-colors break-all"
              >
                <Mail className="w-4 h-4 shrink-0" />
                {member.email}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    listTeamMembers(supabase)
      .then((data) => active && setMembers(data))
      .catch(() => active && setMembers([]))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const founder = members.find((m) => m.is_founder) ?? members[0];
  const therapists = members.filter((m) => m.id !== founder?.id);

  return (
    <>
      <PageHeader
        title="Our Team"
        description="The people behind S.O.U.L, working to make mental health support accessible to every young person."
      />

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-6 h-6 animate-spin text-soul-green" />
        </div>
      ) : members.length === 0 ? (
        <div className="py-24 px-4">
          <EmptyState
            icon={<MessageSquareText className="w-8 h-8" />}
            title="Team coming soon"
            description="We're putting together our team page — check back shortly."
          />
        </div>
      ) : (
        <>
          {/* Founder & Director */}
          {founder && (
            <section className="py-20 px-4 bg-soul-cream">
              <div className="max-w-4xl mx-auto">
                <AnimatedSection>
                  <h2 className="text-2xl md:text-3xl font-bold text-soul-green-dark font-heading mb-10 text-center">
                    Founder &amp; Director
                  </h2>
                </AnimatedSection>
                <AnimatedSection delay={0.1}>
                  <div className="max-w-sm mx-auto">
                    <TeamCard member={founder} />
                  </div>
                </AnimatedSection>
              </div>
            </section>
          )}

          {/* Rest of the team */}
          {therapists.length > 0 && (
            <section className="py-20 px-4 bg-white">
              <div className="max-w-6xl mx-auto">
                <AnimatedSection>
                  <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-soul-green-dark font-heading mb-4">
                      Therapists
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                      Licensed professionals providing tailored mental health support for our
                      community.
                    </p>
                  </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {therapists.map((member, index) => (
                    <AnimatedSection key={member.id} delay={0.1 + index * 0.08}>
                      <TeamCard member={member} />
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Suggestion Box */}
      <section className="py-20 px-4 bg-soul-cream">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="bg-white rounded-2xl p-8 md:p-12 soul-shadow-card flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl bg-soul-green/10 flex items-center justify-center shrink-0">
                <MessageSquareText className="w-8 h-8 text-soul-green" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-soul-green-dark font-heading mb-2">
                  Suggestion Box
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-5">
                  Have feedback or an idea for the community? Our team reads every suggestion —
                  let us know what would help you most.
                </p>
                <Link
                  href="/suggestions"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-soul-green text-white text-sm font-medium hover:bg-soul-green-light transition-colors"
                >
                  Share a Suggestion
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <WhatsAppCTA />
    </>
  );
}
