'use client';

import { motion } from 'framer-motion';
import { MessageCircle, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { WhatsAppJoinGate } from '@/components/shared/WhatsAppJoinGate';

export function WhatsAppCTA() {
  return (
    <section className="py-20 bg-soul-cream-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--soul-green)_0%,_transparent_50%)]" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-heading mb-4">
            Join SOUL Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Become part of a community that serves, uplifts, and transforms lives.
            Connect with like-minded individuals and make a difference.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <WhatsAppJoinGate
              href={SITE_CONFIG.whatsappCommunityLink}
              className="inline-flex items-center gap-2 px-8 py-4 bg-soul-green text-white font-semibold rounded-full shadow-lg hover:bg-soul-green-dark transition-colors hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              Join WhatsApp Community
              <ExternalLink className="w-4 h-4" />
            </WhatsAppJoinGate>
            <WhatsAppJoinGate
              href={SITE_CONFIG.whatsappChannelLink}
              className="inline-flex items-center gap-2 px-8 py-4 bg-soul-gold text-white font-semibold rounded-full shadow-lg hover:bg-soul-gold-dark transition-colors hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              Follow WhatsApp Channel
            </WhatsAppJoinGate>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
